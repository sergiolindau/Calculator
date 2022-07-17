const helpTable: {[k: string]: string} = {
	/**
	 * Operators
	 */
    '+':
        " -- +\n" +
        "   Addition operator.\n" +
        "\n" +
        "   See also: plus.",
	'-':
        " -- -\n" +
        "   Subtraction or unary negation operator.\n" +
        "\n" +
        "   See also: minus.",
	'++':
		" -- ++\n" +
		"	Increment operator.\n" +
		"\n" +
		"	Add 1 to existing value of variable.  As in C, may be applied as a\n" +
		"	prefix ('++x') or postfix ('x++') operator.\n" +
		"\n" +
		"	See also: --.",
	'--':
		" -- --\n" +
		"	Decrement operator.\n" +
		"\n" +
		"	Subtract 1 from existing value of variable.  As in C, may be\n" +
		"	applied as a prefix ('--x') or postfix ('x--') operator.\n" +
		"\n" +
		"	See also: ++.",
    '*':
        " -- *\n" +
        "   Multiplication operator.\n" +
        "\n" +
        "   See also: mtimes, .*.",
	'.*':
		" -- .*\n" +
		"	Element-by-element multiplication operator.\n" +
		"\n" +
		"	See also: times, *.",
	'/':
		" -- /\n" +
		"	Right division operator.\n" +
		"\n" +
		"	See also: mrdivide, ./, rdivide, \.",
	'./':
		" -- ./\n" +
		"	Element-by-element right division operator.\n" +
		"\n" +
		"	See also: rdivide, /, mrdivide, .\.",
	'\\':
		" -- \\\n" +
		"	Left division operator.\n" +
		"\n" +
		"	Within double-quoted strings, '\' is the line continuation marker\n" +
		"	used to join the current line with the following line.\n" +
		"\n" +
		"	See also: mldivide, .\, ldivide, /.",
	'.\\':
		" -- .\\\n" +
		"	Element-by-element left division operator.\n" +
		"\n" +
		"	See also: ldivide, \\, mldivide, ./.",
	'^':
		" -- ^\n" +
		"	Power operator.\n" +
		"\n" +
		"	This may return complex results for real inputs.  Use 'realsqrt',\n" +
		"	'cbrt', 'nthroot', or 'realpow' to obtain real results when\n" +
		"	possible.\n" +
		"\n" +	
		"	See also: power, **, .^, .**, realpow, realsqrt, cbrt, nthroot.",
	'.^':
		" -- .^\n" +
		"	Element-by-element power operator.\n" +
		"\n" +
		"	If several complex results are possible, returns the one with\n" +
		"	smallest non-negative argument (angle).  Use 'realpow', 'realsqrt',\n" +
		"	'cbrt', or 'nthroot' if a real result is preferred.\n" +
		"\n" +
		"	See also: power, .**, ^, **, realpow, realsqrt, cbrt, nthroot.",
	'**':
		" -- **\n" +
		"	Power operator.\n" +
		"\n" +
		"	This may return complex results for real inputs.  Use 'realsqrt',\n" +
		"	'cbrt', 'nthroot', or 'realpow' to obtain real results when\n" +
		"	possible.\n" +
		"\n" +
		"	See also: power, ^, .**, .^, realpow, realsqrt, cbrt, nthroot.",
	'.**':
		" -- .**\n" +
		"	Element-by-element power operator.\n" +
		"\n" +
		"	If several complex results are possible, returns the one with\n" +
		"	smallest non-negative argument (angle).  Use 'realpow', 'realsqrt',\n" +
		"	'cbrt', or 'nthroot' if a real result is preferred.\n" +
		"\n" +
		"	See also: power, .^, **, ^, realpow, realsqrt, cbrt, nthroot.",
	'\'':
		" -- '\n" +
		"	Matrix transpose operator or string delimiter.\n" +
		"\n" +
		"	For complex matrices, computes the complex conjugate (Hermitian)\n" +
		"	transpose.\n" +
		"\n" +
		"	The single quote character may also be used to delimit strings.\n" +
		"	Escape sequences within single-quoted strings are not expanded.\n" +
		"	I.e., '\\n' is a 2-character string '\\' and 'n' rather than \"\\n\"\n" +
		"	which is a single character representing a newline.\n" +
		"\n" +
		"	See also: ctranspose, .', \".",
	'.\'':
		" -- .'\n" +
		"	Matrix transpose operator.\n" +
		"\n" +
		"	For complex matrices, computes the transpose, _not_ the complex\n" +
		"	conjugate (Hermitian) transpose.\n" +
		"\n" +
		"	See also: transpose, '.",
	'<':
		" -- <\n" +
		"	'Less than' operator.\n" +
		"\n" +
		"	See also: lt.",
	'<=':
		" -- <=\n" +
		"	'Less than' or 'equals' operator.\n" +
		"\n" +
		"	See also: le.",
	'==':
		" -- ==\n" +
		"	Equality test operator.\n" +
		"\n" +
		"	See also: eq.",
	'>=':
		" -- >=\n" +
		"	'Greater than' or 'equals' operator.\n" +
		"\n" +
		"	See also: ge.",
	'>':
		" -- >\n" +
		"	'Greater than' operator.\n" +
		"\n" +
		"	See also: gt.",
	'!=':
		" -- !=\n" +
		"	Logical 'not equals' operator.\n" +
		"\n" +
		"	See also: ~=, ne.",
	'~=':
		" -- ~=\n" +
		"	Logical 'not equals' operator.\n" +
		"\n" +
		"	See also: !=, ne.",
	'&':
		" -- &\n" +
		"	Element-by-element logical 'and' operator.\n" +
		"\n" +
		"	See also: and, &&.",
	'&&':
		" -- &&\n" +
		"	Logical 'and' operator (with short-circuit evaluation).\n" +
		"\n" +
		"	See also: &.",
	'|':
		" -- |\n" +
		"	Element-by-element logical 'or' operator.\n" +
		"\n" +
		"	See also: or, ||.",
	'||':
		" -- ||\n" +
		"	Logical 'or' (with short-circuit evaluation) operator.\n" +
		"\n" +
		"	See also: |.",
	'!':
		" -- !\n" +
		"	Logical 'not' operator.\n" +
		"\n" +
		"	See also: ~, not.",
	'~':
		" -- ~\n" +
		"	Logical 'not' operator.\n" +
		"\n" +
		"	The symbol may also be used to discard outputs of a function that\n" +
		"	are unwanted without using a temporary variable.\n" +
		"\n" +
		"		[~, IDX_OF_MAX] = max (X)\n" +
		"\n" +
		"	See also: !, not.",
	'=':
		" -- =\n" +
		"	Assignment operator.",
	',':
		" -- ,\n" +
		"	Array index, function argument, or command separator.",
	';':
		" -- ;\n" +
		"	Array row or command separator.\n" +
		"\n" +
		"	See also: ,.",
	'(':
		" -- (\n" +
		"	Array index or function argument delimiter.",
	')':
		" -- (\n" +
		"	Array index or function argument delimiter.",
	'[':
		" -- [\n" +
		"	Return list delimiter.\n" +
		"\n" +
		"	See also: ].",
	']':
		" -- [\n" +
		"	Return list delimiter.\n" +
		"\n" +
		"	See also: [.",
	':':
		" -- :\n" +
		"	Select all elements in the specified dimension when indexing.\n" +
		"\n" +
		"		x(2, :)   # selects 2nd row, all columns",
	'"':
		" -- \"\n" +
		"	String delimiter.\n" +
		"\n" +
		"	Escape sequences within double-quoted strings are expanded.  I.e.,\n" +
		"	\"\\n\" is a 1-character string representing a newline.  See the\n" +
		"	single quote delimiter (') to create strings without escape\n" +
		"	sequence processing.\n" +
		"\n" +
		"	See also: '.",
	'...':
		" -- ...\n" +
		"	Continuation marker.\n" +
		"\n" +
		"	Joins current line with following line before parsing.  This can be\n" +
		"	used to improve the human-readability of code, without affecting\n" +
		"	interpretation.",
	'#':
		" -- #\n" +
		"	Begin comment character.\n" +
		"\n" +
		"	See also: %, #{.",
	'%':
		" -- %\n" +
		"Begin comment character.\n" +
		"\n" +
		"See also: #, %{.",
	'#{':
		" -- #{\n" +
		"	Begin block comment.\n" +
		"\n" +
		"	The sequence '#{' must appear alone on a line with no other\n" +
		"	characters, other than whitespace, before or after it.  It is\n" +
		"	possible to nest block comments.\n" +
		"\n" +
		"	See also: %{, #}, #.",
	'#}':
		" -- #}\n" +
		"	Close block comment.\n" +
		"\n" +
		"	The sequence '#}' must appear alone on a line with no other\n" +
		"	characters, other than whitespace, before or after it.  It is\n" +
		"	possible to nest block comments.\n" +
		"\n" +
		"	See also: %}, #{, #.",
	'%{':
		" -- %{\n" +
		"	Begin block comment.\n" +
		"\n" +
		"	The sequence '%{' must appear alone on a line with no other\n" +
		"	characters, other than whitespace, before or after it.  It is\n" +
		"	possible to nest block comments.\n" +
		"\n" +
		"	See also: #{, %}, %.",
	'%}':
		" -- %}\n" +
		"	Close block comment.\n" +
		"\n" +
		"	The sequence '%}' must appear alone on a line with no other\n" +
		"	characters, other than whitespace, before or after it.  It is\n" +
		"	possible to nest block comments.\n" +
		"\n" +
		"	See also: #}, %{, %.",
	/**
	 * Keywords
	 */
	'__FILE__':
		"",
	'__LINE__':
		"",
	'global':
		" -- global VAR\n" +
		"	Declare variables to have global scope.\n" +
		"\n" +
		"		global X;\n" +
		"		if (isempty (X))\n" +
		"			x = 1;\n" +
		"		endif\n" +
		"\n" +
		"	See also: persistent.",
	'persistent':
		" -- persistent VAR\n" +
		"	Declare variables as persistent.\n" +
		"\n" +
		"	A variable that has been declared persistent within a function will\n" +
		"	retain its contents in memory between subsequent calls to the same\n" +
		"	function.  The difference between persistent variables and global\n" +
		"	variables is that persistent variables are local in scope to a\n" +
		"	particular function and are not visible elsewhere.\n" +
		"\n" +
		"	See also: global.",
	'if':
		" -- if (COND) ... endif\n" +
		" -- if (COND) ... else ... endif\n" +
		" -- if (COND) ... elseif (COND) ... endif\n" +
		" -- if (COND) ... elseif (COND) ... else ... endif\n" +
		"	Begin an if block.\n" +
		"\n" +
		"	The conditional COND is true if it is not empty and if _all_ values\n" +
		"	are nonzero.\n" +
		"\n" +
		"		x = 1;\n" +
		"		if (x == 1)\n" +
		"			disp (\"one\");\n" +
		"		elseif (x == 2)\n" +
		"			disp (\"two\");\n" +
		"		else\n" +
		"			disp (\"not one or two\");\n" +
		"		endif\n" +
		"\n" +
		"	See also: switch.",
	'endif':
		" -- endif\n" +
		"	Mark the end of an if block.\n" +
		"\n" +
		"	See 'if' for an example.\n" +
		"\n" +
		"	See also: if.",
	'end':
		" -- end\n" +
		"	Last element of an array or the end of any 'for', 'parfor', 'if',\n" +
		"	'do', 'while', 'function', 'switch', 'try', or 'unwind_protect'\n" +
		"	block.\n" +
		"\n" +
		"	As an index of an array, the magic index \"end\" refers to the last\n" +
		"	valid entry in an indexing operation.\n" +
		"\n" +
		"	Example:\n" +
		"\n" +
		"	X = [ 1 2 3; 4 5 6 ];\n" +
		"	X(1,end)\n" +
		"		=> 3\n" +
		"	X(end,1)\n" +
		"		=> 4\n" +
		"	X(end,end)\n" +
		"		=> 6\n" +
		"\n" +
		"	See also: for, parfor, if, do, while, function, switch, try,\n" +
		"	unwind_protect.",
	'elseif':
		" -- elseif (COND)\n" +
		"	Alternate conditional test for an if block.\n" +
		"\n" +
		"	The conditional COND is true if it is not empty and if _all_ values\n" +
		"	are nonzero.\n" +
		"\n" +
		"	See 'if' for an example.\n" +
		"\n" +
		"	See also: if.",
	'else':
		" -- else\n" +
		"Alternate action for an if block.\n" +
		"\n" +
		"See 'if' for an example.\n" +
		"\n" +
		"See also: if.",
	'switch':
		" -- switch STATEMENT\n" +
		"	Begin a switch block.\n" +
		"\n" +
		"	yesno = \"yes\";\n" +
		"\n" +
		"	switch (yesno)\n" +
		"		case {\"Yes\" \"yes\" \"YES\" \"y\" \"Y\"}\n" +
		"			value = 1;\n" +
		"		case {\"No\" \"no\" \"NO\" \"n\" \"N\"}\n" +
		"			value = 0;\n" +
		"		otherwise\n" +
		"			error (\"invalid value\");\n" +
		"	endswitch\n" +
		"\n" +
		"	See also: if, case, otherwise.",
	'endswitch':
		" -- endswitch\n" +
		"	Mark the end of a switch block.\n" +
		"\n" +
		"	See 'switch' for an example.\n" +
		"\n" +
		"	See also: switch.",
	'case':
		" -- case VALUE\n" +
		" -- case {VALUE, ...}\n" +
		"	A case statement in a switch block.\n" +
		"\n" +
		"	Cases are exclusive and do not fall-through as do C-language\n" +
		"	cases.  A switch statement must have at least one case.  See\n" +
		"	'switch' for an example.\n" +
		"\n" +
		"	See also: switch.",
	'otherwise':
		" -- otherwise\n" +
		"	The default statement in a switch block which is executed when no\n" +
		"	other case statements match the input.\n" +
		"\n" +
		"	See also: switch, case.",
	'while':
		" -- while (COND)\n" +
		"	Begin a while loop.\n" +
		"\n" +
		"	The conditional COND is true if it is not empty and if _all_ values\n" +
		"	are nonzero.\n" +
		"\n" +
		"	i = 0;\n" +
		"	while (i < 10)\n" +
		"		i++\n" +
		"	endwhile\n" +
		"\n" +
		"	See also: do, endwhile, for, until.",
	'endwhile':
		" -- endwhile\n" +
		"	Mark the end of a while loop.\n" +
		"\n" +
		"	See 'while' for an example.\n" +
		"\n" +
		"	See also: do, while.",
	'do':
		" -- do\n" +
		"	Begin a do-until loop.\n" +
		"\n" +
		"	This differs from a while loop in that the body of the loop is\n" +
		"	executed at least once.\n" +
		"\n" +
		"	i = 0;\n" +
		"	do\n" +
		"		i++\n" +
		"	until (i == 10)\n" +
		"\n" +
		"	See also: for, until, while.",
	'until':
		" -- until (COND)\n" +
		"	End a do-until loop.\n" +
		"\n" +
		"	The conditional COND is true if it is not empty and if _all_ values\n" +
		"	are nonzero.\n" +
		"\n" +
		"	See 'do' for an example.\n" +
		"\n" +
		"	See also: do.",
	'for':
		" -- for I = RANGE\n" +
		"	Begin a for loop.\n" +
		"\n" +
		"	for i = 1:10\n" +
		"		i\n" +
		"	endfor\n" +
		"\n" +
		"	See also: parfor, do, while.",
	'endfor':
		" -- endfor\n" +
		"	Mark the end of a for loop.\n" +
		"\n" +
		"	See 'for' for an example.\n" +
		"\n" +
		"	See also: for.",
	'parfor':
		" -- parfor I = RANGE\n" +
		" -- parfor (I = RANGE, MAXPROC)\n" +
		"	Begin a for loop that may execute in parallel.",
	'endparfor':
		" -- endparfor\n" +
		"	Mark the end of a parfor loop.\n" +
		"\n" +
		"	See 'parfor' for an example.\n" +
		"\n" +
		"	See also: parfor.",
	'break':
		" -- break\n" +
		"	Exit the innermost enclosing do, while, or for loop.\n" +
		"\n" +
		"	See also: do, while, for, parfor, continue.",
	'continue':
		" -- continue\n" +
		"	Jump to the end of the innermost enclosing do, while, or for loop.\n" +
		"\n" +
		"	See also: break, do, while, for, parfor.",
	'return':
		" -- return\n" +
		"	Return from a function.\n" +
		"\n" +
		"	See also: function.",
	'function':
		" -- function OUTPUTS = function_name (INPUT, ...)\n" +
		" -- function function_name (INPUT, ...)\n" +
		" -- function OUTPUTS = function_name\n" +
		"	Begin a function body with name 'function_name', with OUTPUTS as\n" +
		"	results, and with INPUTS as parameters.\n" +
		"\n" +
		"	The function can later be invoked using the syntax\n" +
		"\n" +
		"		[OUTPUT1, OUTPUT2, ...] = function_name (INPUT1, INPUT2, ...)\n" +
		"\n" +
		"	See also: return.",
	'endfunction':
		" -- endfunction\n" +
		"	Mark the end of a function.\n" +
		"\n" +
		"	See also: function.",
	'try':
		" -- try\n" +
		"	Begin a try-catch block.\n" +
		"\n" +
		"	If an error occurs within a try block, then the catch code will be\n" +
		"	run and execution will proceed after the catch block (though it is\n" +
		"	often recommended to use the 'lasterr' function to re-throw the\n" +
		"	error after cleanup is completed).\n" +
		"\n" +
		"	See also: catch, unwind_protect.",
	'catch':
		" -- catch\n" +
		" -- catch VALUE\n" +
		"	Begin the cleanup part of a try-catch block.\n" +
		"\n" +
		"	See also: try.",
	'end_try_catch':
		" -- end_try_catch\n" +
		"	Mark the end of a 'try-catch' block.\n" +
		"\n" +
		"	See also: try, catch.",
	'unwind_protect':
		" -- unwind_protect\n" +
		"	Begin an unwind_protect block.\n" +
		"\n" +
		"	If an error occurs within the first part of an unwind_protect block\n" +
		"	the commands within the unwind_protect_cleanup block are executed\n" +
		"	before the error is thrown.  If an error is not thrown, then the\n" +
		"	unwind_protect_cleanup block is still executed.  In other words,\n" +
		"	the unwind_protect_cleanup code is guaranteed to execute regardless\n" +
		"	of success or failure in the unwind_protect block.\n" +
		"\n" +
		"	See also: unwind_protect_cleanup, try.",
	'unwind_protect_cleanup':
		" -- unwind_protect_cleanup\n" +
		"	Begin the cleanup section of an unwind_protect block.\n" +
		"\n" +
		"	See also: unwind_protect.\n",
	'end_unwind_protect':
		" -- end_unwind_protect\n" +
		"	Mark the end of an unwind_protect block.\n" +
		"\n" +
		"	See also: unwind_protect.",
	'classdef':
		" -- classdef\n" +
		"	Begin a classdef block.\n" +
		"\n" +
		"	See also: properties, methods, events, enumeration.",
	'endclassdef':
		" -- endclassdef\n" +
		"	Mark the end of a classdef definition.\n" +
		"\n" +
		"	See also: classdef.",
	'enumeration':
		" -- enumeration\n" +
		"	Begin an enumeration block in a classdef definition.",
	'endenumeration':
		" -- endenumeration\n" +
		"	Mark the end of an enumeration block in a classdef definition.\n" +
		"\n" +
		"	See also: enumeration.",
	'properties':
		" -- properties\n" +
		"	Begin a properties block in a classdef definition." +
		"\n" +
		"	See also: classdef.",
	'endproperties':
		" -- endproperties\n" +
		"	Mark the end of a properties block in a classdef definition.\n" +
		"\n" +
		"	See also: properties.",
	'events':
		" -- events\n" +
		"	Begin an events block in a classdef definition." +
		"\n" +
		"	See also: classdef.",
	'endevents':
		" -- endevents\n" +
		"	Mark the end of an events block in a classdef definition.\n" +
		"\n" +
		"	See also: events.",
	'methods':
		" -- methods\n" +
		"	Begin a methods block in a classdef definition." +
		"\n" +
		"	See also: classdef.",
	'endmethods':
	" -- endmethods\n" +
	"	Mark the end of a methods block in a classdef definition.\n" +
	"\n" +
	"	See also: methods.",

	'help':
		" -- help NAME\n" +
		" -- help --list\n" +
		" -- help .\n" +
		" -- help\n" +
		"	Display the help text for NAME.\n" +
		"\n" +
		"	For example, the command 'help help' prints a short message\n" +
		"	describing the 'help' command.\n" +
		"\n" +
		"	Given the single argument '--list', list all operators, keywords,\n" +
		"	built-in functions, and loadable functions available in the current\n" +
		"	session.\n" +
		"\n" +
		"	Given the single argument '.', list all operators available in the\n" +
		"	current session.\n" +
		"\n" +
		"	If invoked without any arguments, 'help' displays instructions on\n" +
		"	how to access help from the command line.\n" +
		"\n" +
		"	The help command can provide information about most operators, but\n" +
		"	NAME must be enclosed by single or double quotes to prevent the\n" +
		"	interpreter from acting on NAME.  For example, 'help \"+\"'\n" +
		"	displays help on the addition operator.\n" +
		"\n" +
		"	See also: doc, lookfor, which, info.",
	'doc':
		" -- doc FUNCTION_NAME\n" +
		" -- doc\n" +
		"	Display documentation for the function FUNCTION_NAME directly from\n" +
		"	an online version of the manual.\n" +
		"\n" +
		"	If invoked without an argument, the manual is shown from the\n" +
		"	beginning.\n" +
		"\n" +
		"	See also: help.",

	/**
	 * Functions
	 */

	'uplus':
		" -- uplus (X)\n" +
		"	This function and + X are equivalent.\n" +
		"\n" +
		"	See also: uminus, plus.",
	'uminus':
		" -- uminus (X)\n" +
		"	This function and - X are equivalent.\n" +
		"\n" +
		"	See also: uplus, minus.",
	'transpose':
		" -- transpose (X)\n" +
		"	Return the transpose of X.\n" +
		"\n" +
		"	This function and X.' are equivalent.\n" +
		"\n" +
		"	See also: ctranspose.",
	'ctranspose':
		" -- ctranspose (X)\n" +
		"	Return the complex conjugate transpose of X.\n" +
		"\n" +
		"	This function and X' are equivalent.\n" +
		"\n" +
		"	See also: transpose.",

	'minus':
		" -- minus (X, Y)\n" +
		"	This function and X - Y are equivalent.\n" +
		"\n" +
		"	See also: plus, uminus.",
	'rdivide':
		" -- rdivide (X, Y)\n" +
		"	Return the element-by-element right division of X and Y.\n" +
		"\n" +
		"	This function and X ./ Y are equivalent.\n" +
		"\n" +
		"	See also: ldivide, mrdivide, times, plus.",
	'mrdivide':
		" -- mrdivide (X, Y)\n" +
		"	Return the matrix right division of X and Y.\n" +
		"\n" +
		"	This function and X / Y are equivalent.\n" +
		"\n" +
		"	If the system is not square, or if the coefficient matrix is\n" +
		"	singular, a minimum norm solution is computed.\n" +
		"\n" +
		"	See also: mldivide, rdivide, plus, minus.",
	'ldivide':
		" -- ldivide (X, Y)\n" +
		"	Return the element-by-element left division of X and Y.\n" +
		"\n" +
		"	This function and X .\ Y are equivalent.\n" +
		"\n" +
		"	See also: rdivide, mldivide, times, plus.",
	'mldivide':
		" -- mldivide (X, Y)\n" +
		"	Return the matrix left division of X and Y.\n" +
		"\n" +
		"	This function and X \ Y are equivalent.\n" +
		"\n" +
		"	If the system is not square, or if the coefficient matrix is\n" +
		"	singular, a minimum norm solution is computed.\n" +
		"\n" +
		"	See also: mrdivide, ldivide, rdivide, linsolve.",
	'power':
		" -- power (X, Y)\n" +
		"	Return the element-by-element operation of X raised to the Y power.\n" +
		"\n" +
		"	This function and X .^ Y are equivalent.\n" +
		"\n" +
		"	If several complex results are possible, returns the one with\n" +
		"	smallest non-negative argument (angle).  Use 'realpow', 'realsqrt',\n" +
		"	'cbrt', or 'nthroot' if a real result is preferred.\n" +
		"\n" +
		"	See also: mpower, realpow, realsqrt, cbrt, nthroot.",
	'mpower':
		" -- mpower (X, Y)\n" +
		"	Return the matrix power operation of X raised to the Y power.\n" +
		"\n" +
		"	This function and X ^ Y are equivalent.\n" +
		"\n" +
		"	See also: power, mtimes, plus, minus.",
	'lt':
		" -- lt (X, Y)\n" +
		"	This function is equivalent to 'X < Y'.\n" +
		"\n" +
		"	See also: le, eq, ge, gt, ne.",
	'lte':
		" -- le (X, Y)\n" +
		"	This function is equivalent to 'X <= Y'.\n" +
		"\n" +
		"	See also: eq, ge, gt, ne, lt.",
	'gte':
		" -- ge (X, Y)\n" +
		"	This function is equivalent to 'X >= Y'.\n" +
		"\n" +
		"	See also: le, eq, gt, ne, lt.",
	'gt':
		" -- gt (X, Y)\n" +
		"	This function is equivalent to 'X > Y'.\n" +
		"\n" +
		"	See also: le, eq, ge, ne, lt.",
	'eq':
		" -- eq (X, Y)\n" +
		"	Return true if the two inputs are equal.\n" +
		"\n" +
		"	This function is equivalent to 'X == Y'.\n" +
		"\n" +
		"	See also: ne, isequal, le, ge, gt, ne, lt.",
	'ne':
		" -- ne (X, Y)\n" +
		"	Return true if the two inputs are not equal.\n" +
		"\n" +
		"	This function is equivalent to 'X != Y'.\n" +
		"\n" +
		"	See also: eq, isequal, le, ge, lt.",

	'plus':
		" -- plus (X, Y)\n" +
		"-- plus (X1, X2, ...)\n" +
		"	This function and X + Y are equivalent.\n" +
		"\n" +
		"	If more arguments are given, the summation is applied cumulatively\n" +
		"	from left to right:\n" +
		"\n" +
		"		(...((X1 + X2) + X3) + ...)\n" +
		"\n" +
		"	See also: minus, uplus.",
	'times':
		" -- times (X, Y)\n" +
		"-- times (X1, X2, ...)\n" +
		"	Return the element-by-element multiplication product of inputs.\n" +
		"\n" +
		"	This function and X .* Y are equivalent.  If more arguments are\n" +
		"	given, the multiplication is applied cumulatively from left to\n" +
		"	right:\n" +
		"\n" +
		"		(...((X1 .* X2) .* X3) .* ...)\n" +
		"\n" +
		"	See also: mtimes, rdivide.)",
	'mtimes':
		" -- mtimes (X, Y)\n" +
		" -- mtimes (X1, X2, ...)\n" +
		"	Return the matrix multiplication product of inputs.\n" +
		"\n" +
		"	This function and X * Y are equivalent.  If more arguments are\n" +
		"	given, the multiplication is applied cumulatively from left to\n" +
		"	right:\n" +
		"\n" +
		"		(...((X1 * X2) * X3) * ...)\n" +
		"\n" +
		"	See also: times, plus, minus, rdivide, mrdivide, mldivide, mpower.",

	'abs':
		" -- abs (Z)\n" +
		"	Compute the magnitude of Z.\n" +
		"\n" +
		"	The magnitude is defined as |Z| = 'sqrt (x^2 + y^2)'.\n" +
		"\n" +
		"	For example:\n" +
		"\n" +
		"		abs (3 + 4i)\n" +
		"			=> 5\n" +
		"\n" +
		"	See also: arg.",
    'arg':
		" -- arg (Z)\n" +
		" -- angle (Z)\n" +
		"	Compute the argument, i.e., angle of Z.\n" +
		"\n" +
		"	This is defined as, THETA = 'atan2 (Y, X)', in radians.\n" +
		"\n" +
		"	For example:\n" +
		"\n" +
		"		arg (3 + 4i)\n" +
		"			=> 0.92730\n" +
		"\n" +
		"	See also: abs.",
    'conj':
		" -- conj (Z)\n" +
		"	Return the complex conjugate of Z.\n" +
		"\n" +
		"	The complex conjugate is defined as 'conj (Z)' = X - IY.\n" +
		"\n" +
		"	See also: real, imag.",
    'fix':
		" -- fix (X)\n" +
		"	Truncate fractional portion of X and return the integer portion.\n" +
		"\n" +
		"	This is equivalent to rounding towards zero.  If X is complex,\n" +
		"	return 'fix (real (X)) + fix (imag (X)) * I'.\n" +
		"\n" +
		"	fix ([-2.7, 2.7])\n" +
		"		=> -2    2\n" +
		"\n" +
		"	See also: ceil, floor, round.",
	'ceil':
		" -- ceil (X)\n" +
		"	Return the smallest integer not less than X.\n" +
		"\n" +
		"	This is equivalent to rounding towards positive infinity.\n" +
		"\n" +
		"	If X is complex, return 'ceil (real (X)) + ceil (imag (X)) * I'.\n" +
		"\n" +
		"	ceil ([-2.7, 2.7])\n" +
		"		=> -2    3\n" +
		"\n" +
		"	See also: floor, round, fix.",
    'floor':
		" -- floor (X)\n" +
		"	Return the largest integer not greater than X.\n" +
		"\n" +
		"	This is equivalent to rounding towards negative infinity.  If X is\n" +
		"	complex, return 'floor (real (X)) + floor (imag (X)) * I'.\n" +
		"\n" +
		"	floor ([-2.7, 2.7])\n" +
		"		=> -3    2\n" +
		"\n" +
		"	See also: ceil, round, fix.",
    'round':
		" -- round (X)\n" +
		"	Return the integer nearest to X.\n" +
		"\n" +
		"	If X is complex, return 'round (real (X)) + round (imag (X)) * I'.\n" +
		"	If there are two nearest integers, return the one further away from\n" +
		"	zero.\n" +
		"\n" +
		"	round ([-2.7, 2.7])\n" +
		"		=> -3    3\n" +
		"\n" +
		"	See also: ceil, floor, fix, roundb.",
    'sign':
		" -- sign (X)\n" +
		"	Compute the \"signum\" function.\n" +
		"\n" +
		"	This is defined as\n" +
		"\n" +
		"					-1, x < 0;\n" +
		"		sign (x) =  0, x = 0;\n" +
		"					1, x > 0.\n" +
		"\n" +
		"	For complex arguments, 'sign' returns 'x ./ abs (X)'.\n" +
		"\n" +
		"	Note that 'sign (-0.0)' is 0.  Although IEEE 754 floating point\n" +
		"	allows zero to be signed, 0.0 and -0.0 compare equal.  If you must\n" +
		"	test whether zero is signed, use the 'signbit' function.\n" +
		"\n" +
		"	See also: signbit.",
    'sqrt':
		" -- sqrt (X)\n" +
		"	Compute the square root of each element of X.\n" +
		"\n" +
		"	If X is negative, a complex result is returned.\n" +
		"\n" +
		"	To compute the matrix square root, see Linear Algebra.\n" +
		"\n" +
		"	See also: realsqrt, nthroot.",
    'exp':
		" -- exp (X)\n" +
		"	Compute 'e^x' for each element of X.\n" +
		"\n" +
		"	To compute the matrix exponential, see Linear Algebra.\n" +
		"\n" +
		"	See also: log.",
    'log':
		" -- log (X)\n" +
		"	Compute the natural logarithm, 'ln (X)', for each element of X.\n" +
		"\n" +
		"	To compute the matrix logarithm, see Linear Algebra.\n" +
		"\n" +
		"	See also: exp, log1p, log2, log10, logspace.",
    'log10':
		" -- log10 (X)\n" +
		"	Compute the base-10 logarithm of each element of X.\n" +
		"\n" +
		"	See also: log, log2, logspace, exp.",
    'sin':
		" -- sin (X)\n" +
		"	Compute the sine for each element of X in radians.\n" +
		"\n" +
		"	See also: asin, sind, sinh.",
    'cos':
		" -- cos (X)\n" +
		"	Compute the cosine for each element of X in radians.\n" +
		"\n" +
		"	See also: acos, cosd, cosh.",
    'tan':
		" -- tan (Z)\n" +
		"	Compute the tangent for each element of X in radians.\n" +
		"\n" +
		"	See also: atan, tand, tanh.",
    'csc':
		" -- csc (X)\n" +
		"	Compute the cosecant for each element of X in radians.\n" +
		"\n" +
		"	See also: acsc, cscd, csch.",
    'sec':
		" -- sec (X)\n" +
		"	Compute the secant for each element of X in radians.\n" +
		"\n" +
		"	See also: asec, secd, sech.",
    'cot':
		" -- cot (X)\n" +
		"	Compute the cotangent for each element of X in radians.\n" +
		"\n" +
		"	See also: acot, cotd, coth.",
    'asin':
		" -- asin (X)\n" +
		"	Compute the inverse sine in radians for each element of X.\n" +
		"\n" +
		"	See also: sin, asind.",
    'acos':
		" -- acos (X)\n" +
		"	Compute the inverse cosine in radians for each element of X.\n" +
		"\n" +
		"	See also: cos, acosd.",
    'atan':
		" -- atan (X)\n" +
		"	Compute the inverse tangent in radians for each element of X.\n" +
		"\n" +
		"	See also: tan, atand.",
    'acsc':
		" -- acsc (X)\n" +
		"	Compute the inverse cosecant in radians for each element of X.\n" +
		"\n" +
		"	See also: csc, acscd.",
    'asec':
		" -- asec (X)\n" +
		"	Compute the inverse secant in radians for each element of X.\n" +
		"\n" +
		"	See also: sec, asecd.",
    'acot':
		" -- acot (X)\n" +
		"	Compute the inverse cotangent in radians for each element of X.\n" +
		"\n" +
		"	See also: cot, acotd.",
    'sinh':
		" -- sinh (X)\n" +
		"	Compute the hyperbolic sine for each element of X.\n" +
		"\n" +
		"	See also: asinh, cosh, tanh.",
    'cosh':
		" -- cosh (X)\n" +
		"	Compute the hyperbolic cosine for each element of X.\n" +
		"\n" +
		"	See also: acosh, sinh, tanh.",
    'tanh':
		" -- tanh (X)\n" +
		"	Compute hyperbolic tangent for each element of X.\n" +
		"\n" +
		"	See also: atanh, sinh, cosh.",
    'csch':
		" -- csch (X)\n" +
		"	Compute the hyperbolic cosecant of each element of X.\n" +
		"\n" +
		"	See also: acsch.",
    'sech':
		" -- sech (X)\n" +
		"	Compute the hyperbolic secant of each element of X.\n" +
		"\n" +
		"	See also: asech.",
    'coth':
		" -- coth (X)\n" +
		"	Compute the hyperbolic cotangent of each element of X.\n" +
		"\n" +
		"	See also: acoth.",
    'asinh':
		" -- asinh (X)\n" +
		"Compute the inverse hyperbolic sine for each element of X.\n" +
		"\n" +
		"See also: sinh.",
    'acosh':
		" -- acosh (X)\n" +
		"	Compute the inverse hyperbolic cosine for each element of X.\n" +
		"\n" +
		"	See also: cosh.",
    'atanh':
		" -- atanh (X)\n" +
		"	Compute the inverse hyperbolic tangent for each element of X.\n" +
		"\n" +
		"	See also: tanh.",
    'acsch':
		" -- acsch (X)\n" +
		"	Compute the inverse hyperbolic cosecant of each element of X.\n" +
		"\n" +
		"	See also: csch.",
    'asech':
		" -- asech (X)\n" +
		"	Compute the inverse hyperbolic secant of each element of X.\n" +
		"\n" +
		"	See also: sech.",
    'acoth':
		" -- acoth (X)\n" +
		"	Compute the inverse hyperbolic cotangent of each element of X.\n" +
		"\n" +
		"	See also: coth.",
    'gamma':
		" -- gamma (Z)\n" +
		"	Compute the Gamma function.\n" +
		"\n" +
		"	The Gamma function is defined as\n" +
		"\n" +
		"					infinity\n" +
		"					/\n" +
		"		gamma (z) = | t^(z-1) exp (-t) dt.\n" +
		"					/\n" +
		"				t=0\n" +
		"\n" +
		"	Programming Note: The gamma function can grow quite large even for\n" +
		"	small input values.  In many cases it may be preferable to use the\n" +
		"	natural logarithm of the gamma function ('gammaln') in calculations\n" +
		"	to minimize loss of precision.  The final result is then 'exp\n" +
		"	(RESULT_USING_GAMMALN).'\n" +
		"\n" +
		"	See also: gammainc, gammaln, factorial.",
    'factorial':
		" -- factorial (N)\n" +
		"	Return the factorial of N where N is a real non-negative integer.\n" +
		"\n" +
		"	If N is a scalar, this is equivalent to 'prod (1:N)'.  For vector\n" +
		"	or matrix arguments, return the factorial of each element in the\n" +
		"	array.\n" +
		"\n" +
		"	For non-integers see the generalized factorial function 'gamma'.\n" +
		"	Note that the factorial function grows large quite quickly, and\n" +
		"	even with double precision values overflow will occur if N > 171.\n" +
		"	For such cases consider 'gammaln'.\n" +
		"\n" +
		"	See also: prod, gamma, gammaln.",

	'root':
		"Compute the root of each element of X."+
		"If X is negative, a complex result is returned.",
    'pow':
		"",
    'logbl':
		"",

	'size':
		"-- SZ = size (A)\n"+
		"-- DIM_SZ = size (A, DIM)\n"+
		"Return a row vector with the size (number of elements) of each\n"+
		"dimension for the object A.\n"+
		"When given a second argument, DIM, return the size of the\n"+
		"corresponding dimension.",
	'sub2ind':
		"-- IND = sub2ind (DIMS, I, J)\n"+
		"-- IND = sub2ind (DIMS, S1, S2, ..., SN)\n"+
		"Convert subscripts to linear indices.\n"+
		"The input DIMS is a dimension vector where each element is the size\n"+
		"of the array in the respective dimension (see size).  The remaining\n"+
		"inputs are scalars or vectors of subscripts to be converted.\n"+
		"The output vector IND contains the converted linear indices.",
	'ind2sub':
		"-- [S1, S2, ..., SN] = ind2sub (DIMS, IND)\n"+
		"Convert linear indices to subscripts.\n"+
		"The input DIMS is a dimension vector where each element is the size\n"+
		"of the array in the respective dimension (see size).  The second\n"+
		"input IND contains linear indies to be converted.\n" +
		"The outputs S1, ..., SN contain the converted subscripts.",
	'zeros':
		" -- zeros (N)\n" +
		" -- zeros (M, N)\n" +
		" -- zeros (M, N, K, ...)\n" +
		" -- zeros ([M N ...])\n" +
		" -- zeros (..., CLASS)\n" +
		"	Return a matrix or N-dimensional array whose elements are all 0.\n" +
		"\n" +
		"	If invoked with a single scalar integer argument, return a square\n" +
		"	NxN matrix.\n" +
		"\n" +
		"	If invoked with two or more scalar integer arguments, or a vector\n" +
		"	of integer values, return an array with the given dimensions.\n" +
		"\n" +
		"	The optional argument CLASS specifies the class of the return array\n" +
		"	and defaults to double.  For example:\n" +
		"\n" +
		"		val = zeros (m,n, \"uint8\")\n" +
		"\n" +
		"	See also: ones.",
	'ones':
		" -- ones (N)\n" +
		" -- ones (M, N)\n" +
		" -- ones (M, N, K, ...)\n" +
		" -- ones ([M N ...])\n" +
		" -- ones (..., CLASS)\n" +
		"	Return a matrix or N-dimensional array whose elements are all 1.\n" +
		"\n" +
		"	If invoked with a single scalar integer argument N, return a square\n" +
		"	NxN matrix.\n" +
		"\n" +
		"	If invoked with two or more scalar integer arguments, or a vector\n" +
		"	of integer values, return an array with the given dimensions.\n" +
		"\n" +
		"	To create a constant matrix whose values are all the same use an\n" +
		"	expression such as\n" +
		"\n" +
		"		val_matrix = val * ones (m, n)\n" +
		"\n" +
		"	The optional argument CLASS specifies the class of the return array\n" +
		"	and defaults to double.  For example:\n" +
		"\n" +
		"		val = ones (m,n, \"uint8\")\n" +
		"\n" +
		"	See also: zeros.",
	'eye':
		" -- eye (N)\n" +
		" -- eye (M, N)\n" +
		" -- eye ([M N])\n" +
		" -- eye (..., CLASS)\n" +
		"	Return an identity matrix.\n" +
		"\n" +
		"	If invoked with a single scalar argument N, return a square NxN\n" +
		"	identity matrix.\n" +
		"\n" +
		"	If supplied two scalar arguments (M, N), 'eye' takes them to be the\n" +
		"	number of rows and columns.  If given a vector with two elements,\n" +
		"	'eye' uses the values of the elements as the number of rows and\n" +
		"	columns, respectively.  For example:\n" +
		"\n" +
		"		 eye (3)\n" +
		"		  =>  1  0  0\n" +
		"			  0  1  0\n" +
		"			  0  0  1\n" +
		"\n" +
		"	The following expressions all produce the same result:\n" +
		"\n" +
		"		 eye (2)\n" +
		"		 ==\n" +
		"		 eye (2, 2)\n" +
		"		 ==\n" +
		"		 eye (size ([1, 2; 3, 4]))\n" +
		"\n" +
		"	The optional argument CLASS, allows 'eye' to return an array of the\n" +
		"	specified type, like\n" +
		"\n" +
		"		 val = zeros (n,m, \"uint8\")\n" +
		"\n" +
		"	Calling 'eye' with no arguments is equivalent to calling it with an\n" +
		"	argument of 1.  Any negative dimensions are treated as zero.  These\n" +
		"	odd definitions are for compatibility with MATLAB.\n" +
		"\n" +
		"	See also: speye, ones, zeros.",
	'inv':
		" -- X = inv (A)\n" +
		" -- [X, RCOND] = inv (A)\n" +
		" -- [...] = inverse (...)\n" +
		"	Compute the inverse of the square matrix A.\n" +
		"\n" +
		"	Return an estimate of the reciprocal condition number if requested,\n" +
		"	otherwise warn of an ill-conditioned matrix if the reciprocal\n" +
		"	condition number is small.\n" +
		"\n" +
		"	In general it is best to avoid calculating the inverse of a matrix\n" +
		"	directly.  For example, it is both faster and more accurate to\n" +
		"	solve systems of equations (A*x = b) with 'Y = A \ b', rather than\n" +
		"	'Y = inv (A) * b'.\n" +
		"\n" +
		"	If called with a sparse matrix, then in general X will be a full\n" +
		"	matrix requiring significantly more storage.  Avoid forming the\n" +
		"	inverse of a sparse matrix if possible.\n" +
		"\n" +
		"	'inverse' is an alias and may be used identically in place of\n" +
		"	'inv'.\n" +
		"\n" +
		"	See also: ldivide, rdivide, pinv.",
	'det':
		" -- det (A)\n" +
		" -- [D, RCOND] = det (A)\n" +
		"	Compute the determinant of A.\n" +
		"\n" +
		"	Return an estimate of the reciprocal condition number if requested.\n" +
		"\n" +
		"	Programming Notes: Routines from LAPACK are used for full matrices\n" +
		"	and code from UMFPACK is used for sparse matrices.\n" +
		"\n" +
		"	The determinant should not be used to check a matrix for\n" +
		"	singularity.  For that, use any of the condition number functions:\n" +
		"	'cond', 'condest', 'rcond'.\n" +
		"\n" +
		"	See also: cond, condest, rcond.",
	'trace':
		" -- trace (A)\n" +
		"	Compute the trace of A, the sum of the elements along the main\n" +
		"	diagonal.\n" +
		"\n" +
		"	The implementation is straightforward: 'sum (diag (A))'.\n" +
		"\n" +
		"	See also: eig.",
	'rows':
		" -- rows (A)\n" +
		"	Return the number of rows of A.  This is equivalent to 'size (A,\n" +
		"	1)'.\n" +
		"\n" +
		"	See also: columns, size, length, numel, isscalar, isvector,\n" +
		"	ismatrix.",
	'cols':
		" -- columns (A)\n" +
		"	Return the number of columns of A.  This is equivalent to 'size (A,\n" +
		"	2)'.\n" +
		"\n" +
		"	See also: rows, size, length, numel, isscalar, isvector, ismatrix.",
	'minor':
		"",
	'cofactor':
		"",
	'adj':
		"",
	'pivot':
		"",
	'lu':
		"",
	'min':
		"",
	'max':
		"",
	'mean':
		"",
	'horzcat':
		" -- horzcat (ARRAY1, ARRAY2, ..., ARRAYN)\n"+
		"	Return the horizontal concatenation of N-D array objects, ARRAY1,\n"+
		"	ARRAY2, ..., ARRAYN along dimension 2.\n"+
		"\n"+
		"	Arrays may also be concatenated horizontally using the syntax for\n"+
		"	creating new matrices.  For example:\n"+
		"\n"+
		"		HCAT = [ ARRAY1, ARRAY2, ... ]\n"+
		"\n"+
		"	See also: cat, vertcat.",
	'vertcat':
		" -- vertcat (ARRAY1, ARRAY2, ..., ARRAYN)\n"+
		"	Return the vertical concatenation of N-D array objects, ARRAY1,\n"+
		"	ARRAY2, ..., ARRAYN along dimension 1.\n"+
		"\n"+
		"	Arrays may also be concatenated vertically using the syntax for\n"+
		"	creating new matrices.  For example:\n"+
		"\n"+
		"		VCAT = [ ARRAY1; ARRAY2; ... ]\n"+
		"\n"+
		"	See also: cat, horzcat.",
	'gauss':
		"",
};

const helpUsage: string =
	"	For help with individual commands and functions type\n" +
	"\n" +
	"		help NAME\n" +
	"\n" +
	"	(replace NAME with the name of the command or function you would\n" +
	"	like to learn more about; for an operator, enclose \"NAME\" in quotes).\n" +
	"\n" +
	"	For a more detailed introduction, consult the manual.\n" +
	"	The manual may be read from the prompt by typing\n" +
	"\n" +
	"		doc";

const helpOperatorMessage: string =
	"To obtain help on an operator, type\n\thelp \"NAME\"   or   help 'NAME'\n";

const helpFinalMessage: string =
	"\n\nAdditional help for built-in functions and operators is\n" +
	"available in the online version of the manual.  Use the command\n" +
	"'doc &lt;topic&gt;' to search the manual index.";

/**
 * Language operators
 */
 const operatorsTable: Array<string> = [
	'!',
	'~',
	'!=',
	'~=',
	'"',
	'#',
	'%',
	'#{',
	'%{',
	'#}',
	'%}',
	'...',
	'&',
	'&&',
	'\'',
	'(',
	')',
	'*',
	'**',
	'^',
	'+',
	'++',
	',',
	'-',
	'--',
	'.\'',
	'.*',
	'.**',
	'.^',
	'./',
	'/',
	'.\\',
	'\\',
	':',
	';',
	'<',
	'<=',
	'=',
	'==',
	'>',
	'>=',
	'[',
	']',
	'|',
	'||',
];

const list_in_columns = function(list: Array<string>, nsep?: number): string {
	let longest_length = list.slice().sort(
		function (a, b) {
			return b.length - a.length;
		}
	)[0].length;
	let columns = Math.floor(80/(longest_length+(nsep?nsep:1)));
	let lines = Math.round(list.length/columns);
	let output = new Array(lines).fill("");
	for (let i=0;i<list.length;i++) {
		output[i%lines] += list[i].padEnd(longest_length+(nsep?nsep:1));
	}
	return output.join("\n")+"\n";
}

const removeQuotes = function(str: string): string {
	let firstchar = str[0];
	let lastchar = str[str.length-1]
	if (
		(str.length>=2) && (
			((firstchar==="\"") && (lastchar==="\"")) ||
			((firstchar==="'") && (lastchar==="'"))
		)
	) {
		return str.substring(1,str.length-1)
	}
	else {
		return str;
	}
}

declare const keywordsTable: Array<string>;
declare var baseFunctionTable: any;

const helpOperator = function(): string {
	let result = "*** operators:\n\n";
	result += list_in_columns(operatorsTable.slice().sort(),2)+"\n";
	result += helpOperatorMessage+"\n";
	return result;
}

const helpList = function(): string {
	let result = helpOperator();
	result += "*** keywords:\n\n";
	result += list_in_columns(keywordsTable.slice().sort(),2)+"\n\n";
	result += "*** builtins:\n\n";
	let builtins = Object.keys(baseFunctionTable).sort();
	for (let i=0; i<builtins.length; i++) {
		result += builtins[i] + "\n";
	}
	return result;
}

declare var EvaluatorPointer: any;
const helpCommand = function(args: Array<any>): string {
	if (args.length==0) {
		return helpUsage;
	}
	else if (args.length==1) {
		if (args[0].str=="--list") {
			return helpList();
		}
		else if (args[0].str==".") {
			return helpOperator();
		}
		else {
			let aliasTreeName = EvaluatorPointer.aliasName(args[0].str);
			if (aliasTreeName in helpTable) {
				return helpTable[aliasTreeName]+helpFinalMessage;
			}
			else {
				throw new Error("help: '"+aliasTreeName+"' not found");
			}
		}
	}
	else {
		throw new Error("help: invalid input")
	}
}

const docCommand = function(args: Array<any>): string {
	if (args.length==0) {
		return "<a href=\"https://sergiolindau.github.io/index.html\" target=\"_blank\">overview</a>";
	}
	else if (args.length==1) {
		return "<a href=\"https://sergiolindau.github.io/index.html#"+escape(args[0].str)+"\" target=\"_blank\">"+args[0].str+"</a>";
	}
	else {
		throw new Error(
			"Invalid call to doc.  Correct usage is:\n" +
			"\n" +
			"-- doc FUNCTION_NAME\n" +
			"-- doc\n" +
			helpFinalMessage
		)
	}
}