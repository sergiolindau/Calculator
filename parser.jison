/**
 * #### parser.jison ####
 * 
 * MATLAB®/Octave like syntax parser
 *
 * This file defines a parser for a subset of MATLAB®/Octave syntax. 
 * Semantic actions is provided by Evaluator class defined in Evaluator.ts
 * file.
 * 
 * The parser access methods in Evaluator class using EvaluatorPointer global
 * variable (Window.EvaluatorPointer) defined in parser body.
 *
 * This code is build by Jison parser generator:
 * https://gerhobbelt.github.io/jison/
 */

/* lexical scanner */
%lex
%options flex

D       [0-9]
D_      [0-9_]
L       [_$a-zA-ZàáâäãÀÁÂÄÃèéêëÈÉÊËìíîïÌÍÎÏòóôöõÒÓÔÖÕùúûüÙÚÛÜçÇñÑýÝ]
LD      ({L}|{D})
S       [ \t]
NL      ((\n)|(\r)|(\r\n))
CCHAR   [#%]
IDENT   ({L}({LD})*)
FQIDENT ({IDENT}({S}*\.{S}*{IDENT})*)

DECIMAL_DIGITS ({D}{D_}*)
EXPONENT       ([DdEe][\+\-]?{DECIMAL_DIGITS})
REAL_DECIMAL   (({DECIMAL_DIGITS}("."{D_}*)?|"."{DECIMAL_DIGITS}){EXPONENT}?)
IMAG_DECIMAL   ({REAL_DECIMAL}[IiJj])
DECIMAL_NUMBER ({REAL_DECIMAL}[iIjJ]?)

SIZE_SUFFIX        ([su](8|16|32|64))
BINARY_BITS        (0[bB][01][01_]*)
BINARY_NUMBER      ({BINARY_BITS}|{BINARY_BITS}{SIZE_SUFFIX})
HEXADECIMAL_BITS   (0[xX][0-9a-fA-F][0-9a-fA-F_]*)
HEXADECIMAL_NUMBER ({HEXADECIMAL_BITS}|{HEXADECIMAL_BITS}{SIZE_SUFFIX})

ANY_EXCEPT_NL    [^\r\n]
ANY_INCLUDING_NL (.|{NL})

ANY_EXCEPT_S_NL [^\ \r\n]

STRING (\'[^\']*\'|\"[^\"]*\")

%x FQIDENT_AS_STRING
%x BLOCK_COMMENT_SRP_START
%x BLOCK_COMMENT_PRC_START

%%

({S}|{NL})+                                     /* skip whitespace and line break */
{CCHAR}.*$                                      /* skip comment */
{DECIMAL_NUMBER}                                return "NUMBER";
<FQIDENT_AS_STRING>{S}+                         /* skip whitespace */
<FQIDENT_AS_STRING>{CCHAR}.*$                   this.popState(); /* skip comment */
<FQIDENT_AS_STRING>{NL}+                        this.popState();
<FQIDENT_AS_STRING><<EOF>>                      { this.popState(); return "END_OF_INPUT"; }
<FQIDENT_AS_STRING>{ANY_EXCEPT_S_NL}+           return "STRING";
{FQIDENT}       {
        let i = keywordsTable.indexOf(this.match);
	if (i>=0) {
		if (keywordsTable[i].substring(0,3)=='end') {
			return "END";
		}
		else if (keywordsTable[i]=='unwind_protect') {
			return "UNWIND";
		}
		else if (keywordsTable[i]=='unwind_protect_cleanup') {
			return "CLEANUP";
		}
		else {
			return keywordsTable[i].toUpperCase();
		}
	}
	i = commandsTable.indexOf(this.match);
	if (i>=0) {
		this.pushState('FQIDENT_AS_STRING');
	}		
	return "NAME";
}

{STRING}        return "STRING";

^{S}*"#{"{S}*$  {
        this.pushState(BLOCK_COMMENT_SRP_START);
}
^{S}*"#}"{S}*$  {
        this.popState();
}
^{S}*"%{"{S}*$  {
        this.pushState(BLOCK_COMMENT_PRC_START);
}
^{S}*"%}"{S}*$  {
        this.popState();
}
<BLOCK_COMMENT_SRP_START,BLOCK_COMMENT_PRC_START>({S}|{NL})+ /* skip comment */

".+"                                            return ".+";
".-"                                            return ".-";
".*"                                            return ".*";
"./"                                            return "./";
".\\"                                           return ".\\";
".^"                                            return ".^";
".**"                                           return ".**";
"**"                                            return "**";
"'"                                             return "'";
".'"                                            return ".'";
"<="                                            return "<=";
"=="                                            return "==";
"!="                                            return "!=";
"~="                                            return "~=";
">="                                            return ">=";
"&&"                                            return "&&";
"||"                                            return "||";
"++"                                            return "++";
"--"                                            return "--";
"+="                                            return "+=";
"-="                                            return "-=";
"*="                                            return "*=";
"/="                                            return "/=";
"\\="                                           return "\\=";
".+="                                           return ".+=";
".-="                                           return ".-=";
".*="                                           return ".*=";
"./="                                           return "./=";
".\\="                                          return ".\\=";
"^="                                            return "^=";
"**="                                           return "**=";
".^="                                           return ".^=";
".**="                                          return ".**=";
"&="                                            return "&=";
"|="                                            return "|=";
[\+\-\*\/\÷\^\(\)\=\,\;\[\]\:\\\&\|\<\>\~\!]    return this.match;
<<EOF>>                                         return "END_OF_INPUT";
.                                               return "INVALID";

/lex

/* operator associations and precedence */
%right '=' '+=' '.+=' '-=' '.-=' '*=' '/=' '\\=' '^=' '.*=' './=' '.\\=' '.^=' '.**=' '|=' '&='
%left '||'
%left '&&'
%left '|'
%left '&'
%left '<' '<=' '==' '!=' '~=' '>=' '>'
%left ':'
%left '-' '+' '.-' '.+'
%left '*' '/' '\\' '.*' './' '.\\'
%right UNARY '~' '!'
%left POW '^' '**' '.^' '.**' "'" ".'"
%right '++' '--'
%left '('
%token INVALID

%{
// Global var Window.EvaluatorPointer
this.EvaluatorPointer = null;
%}

// Non-terminal start symbol.
%start input

%% /* language grammar */

// ==============================
// Statements and statement lists
// ==============================

input
        : END_OF_INPUT
                {return null;}
        | simple_list END_OF_INPUT
                {return $1;}
        | parse_error
        ;

simple_list
        : opt_sep_no_nl
                {$$ = EvaluatorPointer.nodeListFirst();}
        | simple_list1 opt_sep_no_nl
                {$$ = $1;}
        ;

simple_list1
        : statement
                {$$ = EvaluatorPointer.nodeListFirst($1);}
        | simple_list1 sep_no_nl statement
                {$$ = EvaluatorPointer.nodeList($1,$3);}
        ;

opt_list
        : // empty
                {$$ = EvaluatorPointer.nodeListFirst();}
        | list
                {$$ = $1;}
        ;

list
        : list1 opt_sep
                {$$ = $1;}
        ;

list1
        : statement
                {$$ = EvaluatorPointer.nodeListFirst($1);}
        | list1 sep statement
                {$$ = EvaluatorPointer.nodeList($1,$3);}
        ;


statement
        : expression
        | command
        | word_list_cmd
        ;

// =================
// Word-list command
// =================

// These are not really like expressions since they can't appear on
// the RHS of an assignment.  But they are also not like commands (IF,
// WHILE, etc.

word_list_cmd
        : identifier word_list
                {$$ = EvaluatorPointer.nodeCmdWList($1,$2);}
        ;

word_list
        : string
                {$$ = EvaluatorPointer.nodeListFirst(EvaluatorPointer.removeQuotes($1));}
        | word_list string
                {$$ = EvaluatorPointer.nodeList($1,EvaluatorPointer.removeQuotes($2));}
        ;

// ===========
// Expressions
// ===========

identifier
        : NAME
                {$$ = EvaluatorPointer.nodeName($1);}
        ;

string
        : STRING
                {$$ = EvaluatorPointer.nodeString($1);}
        ;

number
        : NUMBER
                {$$ = EvaluatorPointer.nodeNumber($1);}
        ;

constant
        : number
        | string
        ;

matrix
        : '[' ']'
                {$$ = EvaluatorPointer.tensor0x0();}
        | '[' matrix_rows ']'
                {$$ = $2;}
        ;

matrix_rows
        : matrix_row
                {$$ = EvaluatorPointer.nodeFirstRow($1);}
        | matrix_rows ';' matrix_row
                {$$ = EvaluatorPointer.nodeAppendRow($1,$3);}
        ;

matrix_row
        : // empty
                {$$ = null;}
        | ','
                {$$ = null;}
        | arg_list
                {$$ = $1;}
        | arg_list ','
                {$$ = $1;}
        | ',' arg_list
                {$$ = $2;}
        | ',' arg_list ','
                {$$ = $2;}
        ;

primary_expr
        : identifier
                {$$ = $1;}
        | constant
                {$$ = $1;}
        | matrix
                {$$ = $1;}
        | '(' expression ')'
                {$$ = $2;}
        ;

magic_colon
        : ':'
                {$$ = EvaluatorPointer.nodeReserved($1)}
        ;

magic_tilde
        : '!'
                {$$ = EvaluatorPointer.nodeReserved($1)}
        | '~'
                {$$ = EvaluatorPointer.nodeReserved($1)}
        ;

arg_list
        : expression
                {$$ = EvaluatorPointer.nodeListFirst($1);}
        | magic_colon
                {$$ = EvaluatorPointer.nodeListFirst($1);}
        | magic_tilde
                {$$ = EvaluatorPointer.nodeListFirst($1);}
        | arg_list ',' magic_colon
                {$$ = EvaluatorPointer.nodeList($1,$3);}
        | arg_list ',' magic_tilde
                {$$ = EvaluatorPointer.nodeList($1,$3);}
        | arg_list ',' expression
                {$$ = EvaluatorPointer.nodeList($1,$3);}
        ;

oper_expr
        : primary_expr
                {$$ = $1;}
        | oper_expr '++'
                {$$ = EvaluatorPointer.nodeOp($2,'++_');}
        | oper_expr '--'
                {$$ = EvaluatorPointer.nodeOp($2,'--_');}
        | oper_expr '(' ')'
                {$$ = EvaluatorPointer.nodeArgExpr($1);}
        | oper_expr '(' arg_list ')'
                {$$ = EvaluatorPointer.nodeArgExpr($1,$3);}
        | oper_expr "'"
                {$$ = EvaluatorPointer.nodeOp($2,$1);}
        | oper_expr ".'"
                {$$ = EvaluatorPointer.nodeOp($2,$1);}
        | '++' oper_expr %prec UNARY
                {$$ = EvaluatorPointer.nodeOp('++_',$2);}
        | '--' oper_expr %prec UNARY
                {$$ = EvaluatorPointer.nodeOp('--_',$2);}
        | '!' oper_expr %prec UNARY
                {$$ = EvaluatorPointer.nodeOp($1,$2);}
        | '~' oper_expr %prec UNARY
                {$$ = EvaluatorPointer.nodeOp($1,$2);}
        | '+' oper_expr %prec UNARY
                {$$ = EvaluatorPointer.nodeOp('+_',$2);}
        | '-' oper_expr %prec UNARY
                {$$ = EvaluatorPointer.nodeOp('-_',$2);}
        | oper_expr '^' power_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '**' power_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '.^' power_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '.**' power_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '+' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '.+' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '-' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '.-' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '*' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '.*' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '/' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr './' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '\\' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | oper_expr '.\\' oper_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        ;

power_expr
        : primary_expr
                {$$ = $1;}
        | power_expr '++'
                {$$ = EvaluatorPointer.nodeOp('_++',$1);}
        | power_expr '--'
                {$$ = EvaluatorPointer.nodeOp('_--',$1);}
        | power_expr '(' ')'
                {$$ = EvaluatorPointer.nodeArgExpr($1);}
        | power_expr '(' arg_list ')'
                {$$ = EvaluatorPointer.nodeArgExpr($1,$3);}
        | '++' power_expr %prec POW
                {$$ = EvaluatorPointer.nodeOp('++_',$2);}
        | '--' power_expr %prec POW
                {$$ = EvaluatorPointer.nodeOp('--_',$2);}
        | '!' power_expr %prec POW
                {$$ = EvaluatorPointer.nodeOp($1,$2);}
        | '~' power_expr %prec POW
                {$$ = EvaluatorPointer.nodeOp($1,$2);}
        | '+' power_expr %prec POW
                {$$ = EvaluatorPointer.nodeOp('+_',$2);}
        | '-' power_expr %prec POW
                {$$ = EvaluatorPointer.nodeOp('-_',$2);}
        ;

colon_expr
        : oper_expr ':' oper_expr
                {$$ = EvaluatorPointer.nodeRange($1,$3)}
        | oper_expr ':' oper_expr ':' oper_expr
                {$$ = EvaluatorPointer.nodeRange($1,$2,$3)}
        ;

simple_expr
        : oper_expr
                {$$ = $1;}
        | colon_expr
                {$$ = $1;}
        | simple_expr '<' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '<=' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '==' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '>=' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '>' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '!=' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '~=' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '&' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '|' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '&&' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        | simple_expr '||' simple_expr
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        ;

assign_expr
        : simple_expr '=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '+=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '-=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '*=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '/=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '\\=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '^=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '**=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '.*=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr './=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '.\\=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '.^=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '.**=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '&=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        | simple_expr '|=' expression
                {$$ = EvaluatorPointer.nodeOp($2,EvaluatorPointer.validateAssignment($1),$3);}
        ;

expression
        : simple_expr
        | assign_expr
        ;

// ================================================
// Commands, declarations, and function definitions
// ================================================

command
        : declaration
        | select_command
        | loop_command
        | jump_command
        | except_command
        | function
        | file
        ;

// ======================
// Declaration statements
// ======================

declaration
        : GLOBAL decl_init_list
        | PERSISTENT decl_init_list
        ;

decl_init_list
        : decl_elt
                {$$ = EvaluatorPointer.nodeListFirst($1);}
        | decl_init_list decl_elt
                {$$ = EvaluatorPointer.nodeList($1,$2);}
        ;

decl_elt
        : identifier
                {$$ = $1;}
        | identifier '=' expression
                {$$ = EvaluatorPointer.nodeOp($2,$1,$3);}
        ;

// ====================
// Selection statements
// ====================

select_command
        : if_command
        | switch_command
        ;

// ============
// If statement
// ============

if_command
        : IF stash_comment if_cmd_list END
        ;

if_cmd_list
        : if_cmd_list1
        | if_cmd_list1 else_clause
        ;

if_cmd_list1
        : expression stmt_begin opt_sep opt_list
        | if_cmd_list1 elseif_clause
        ;

elseif_clause
        : ELSEIF stash_comment opt_sep expression stmt_begin opt_sep opt_list
        ;

else_clause
        : ELSE stash_comment opt_sep opt_list
        ;

// ================
// Switch statement
// ================

switch_command
        : SWITCH stash_comment expression opt_sep case_list END
        ;

case_list
        : // empty
        | default_case
        | case_list1
        | case_list1 default_case
        ;

case_list1
        : switch_case
        | case_list1 switch_case
        ;

switch_case
        : CASE stash_comment opt_sep expression stmt_begin opt_sep opt_list
        ;

default_case
        : OTHERWISE stash_comment opt_sep opt_list
        ;

// =======
// Looping
// =======

loop_command
        : WHILE stash_comment expression stmt_begin opt_sep opt_list END
        | DO stash_comment opt_sep opt_list UNTIL expression
        | FOR stash_comment assign_lhs '=' expression stmt_begin opt_sep opt_list END
        | FOR stash_comment '(' assign_lhs '=' expression ')' opt_sep opt_list END
        | PARFOR stash_comment assign_lhs '=' expression stmt_begin opt_sep opt_list END
        | PARFOR stash_comment '(' assign_lhs '=' expression ',' expression ')' opt_sep opt_list END
        ;

// =======
// Jumping
// =======

jump_command
        : BREAK
        | CONTINUE
        | RETURN
        ;

// ==========
// Exceptions
// ==========

except_command
        : UNWIND stash_comment opt_sep opt_list CLEANUP
          stash_comment opt_sep opt_list END
        | TRY stash_comment opt_sep opt_list CATCH stash_comment
          opt_sep opt_list END
        | TRY stash_comment opt_sep opt_list END
        ;

// =============
// Miscellaneous
// =============

stmt_begin
        : // empty
        ;

anon_fcn_begin
        : // empty
        ;

stash_comment
        : // empty
        ;

parse_error
        : INVALID
                {
                        EvaluatorPointer.exitStatus = EvaluatorResponse.LEX_ERROR;
                        throw new Error("invalid syntax")
                }
        | error
                {
                        EvaluatorPointer.exitStatus = EvaluatorResponse.PARSER_ERROR;
                        throw new Error("parse error")
                }
        ;

sep_no_nl
        : ','
        | ';'
        | sep_no_nl ','
        | sep_no_nl ';'
        ;

opt_sep_no_nl
        : // empty
        | sep_no_nl
        ;

opt_nl
        : // empty
        | nl
        ;

nl
        : '\n'
        | nl '\n'
        ;

sep
        : ','
        | ';'
        | '\n'
        | sep ','
        | sep ';'
        | sep '\n'
        ;

opt_sep
        : // empty
        | sep
        ;