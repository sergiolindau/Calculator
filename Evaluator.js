/**
 * #### Evaluator.ts ####
 *
 * MATLAB®/Octave like syntax parser/interpreter/compiler.
 *
 * This file defines Evaluator class that is instantiated using
 * EvaluatorConfiguration defined in EvaluatorSetup.ts file.
 *
 */
/**
 * After run Parser or Evaluate method, the exitStatus property will contains
 * exit state of method.
 */
const EvaluatorResponse = {
    INFO: -2,
    WARNING: -1,
    OK: 0,
    LEX_ERROR: 1,
    PARSER_ERROR: 2,
    EVAL_ERROR: 3
};
/**
 * Language keywords
 */
const keywordsTable = [
    'global',
    'persistent',
    'if',
    'endif',
    'end',
    'elseif',
    'else',
    'switch',
    'endswitch',
    'case',
    'otherwise',
    'while',
    'endwhile',
    'do',
    'until',
    'for',
    'endfor',
    'parfor',
    'endparfor',
    'break',
    'continue',
    'return',
    'function',
    'endfunction',
    'try',
    'catch',
    'end_try_catch',
    'unwind_protect',
    'unwind_protect_cleanup',
    'end_unwind_protect',
    'classdef',
    'endclassdef',
    'enumeration',
    'endenumeration',
    'properties',
    'endproperties',
    'events',
    'endevents',
    'methods',
    'endmethods'
];
/**
 * Word-list commands
 */
const commandsTable = [
    'help',
    'doc'
];
/**
 * Function Table
 * The Function Table is defined externally to the evaluator object to improve
 * the flexibility of native and user definitions.
 */
var baseFunctionTable = {};
/**
* Evaluator object
* It is implemented as a class but cannot be instantiated more than one time
* simultaneously.
*/
class Evaluator {
    /**
     * Evaluator object constructor
     * @param config Evaluator configuration
     */
    constructor(config) {
        this.debug = false;
        this.nativeNameTable = {};
        this.nameTable = {};
        this.localTable = {};
        this.parser = parser;
        EvaluatorPointer = this;
        this.opTable = config.opTable;
        this.aliasTable = config.aliasTable;
        this.exitStatus = EvaluatorResponse.OK;
        this.exitMessage = "";
        /* Set nativeNameTable */
        this.nativeNameTable['false'] = config.constantTable['false']();
        this.nativeNameTable['true'] = config.constantTable['true']();
        this.nativeNameTable['i'] = config.constantTable['i']();
        this.nativeNameTable['I'] = config.constantTable['i']();
        this.nativeNameTable['j'] = config.constantTable['i']();
        this.nativeNameTable['J'] = config.constantTable['i']();
        this.nativeNameTable['e'] = config.constantTable['e']();
        this.nativeNameTable['pi'] = config.constantTable['pi']();
        this.nativeNameTable['inf'] = config.constantTable['inf']();
        this.nativeNameTable['Inf'] = config.constantTable['inf']();
        this.nativeNameTable['NaN'] = config.constantTable['NaN']();
        /* Set Evaluator methods */
        this.nodeBoolean = config.functionTable['nodeBoolean'];
        this.isBoolean = config.functionTable['isBoolean'];
        this.unparseBoolean = config.functionTable['unparseBoolean'];
        this.unparseBooleanML = config.functionTable['unparseBooleanML'];
        this.nodeString = config.functionTable['nodeString'];
        this.isString = config.functionTable['isString'];
        this.unparseString = config.functionTable['unparseString'];
        this.unparseStringML = config.functionTable['unparseStringML'];
        this.removeQuotes = config.functionTable['removeQuotes'];
        this.nodeNumber = config.functionTable['nodeNumber'];
        this.newNumber = config.functionTable['newNumber'];
        this.isNumber = config.functionTable['isNumber'];
        this.booleanToNumber = config.functionTable['booleanToNumber'];
        this.unparseNumber = config.functionTable['unparseNumber'];
        this.unparseNumberML = config.functionTable['unparseNumberML'];
        this.isTensor = config.functionTable['isTensor'];
        this.isRange = config.functionTable['isRange'];
        this.unparseTensor = config.functionTable['unparseTensor'];
        this.unparseTensorML = config.functionTable['unparseTensorML'];
        this.evaluateTensor = config.functionTable['evaluateTensor'];
        this.mapTensor = config.functionTable['mapTensor'];
        this.subTensor = config.functionTable['subTensor'];
        this.expandRange = config.functionTable['expandRange'];
        this.firstRow = config.functionTable['firstRow'];
        this.appendRow = config.functionTable['appendRow'];
        this.tensor0x0 = config.functionTable['tensor0x0'];
        /* Set opTable aliases */
        this.opTable['.+'] = this.opTable['+'];
        this.opTable['.-'] = this.opTable['-'];
        this.opTable['.÷'] = this.opTable['./'];
        this.opTable['÷'] = this.opTable['/'];
        this.opTable['**'] = this.opTable['^'];
        this.opTable['.**'] = this.opTable['.^'];
        this.opTable['~='] = this.opTable['!='];
        /* Load nativeNameTable and constantsTable in nameTable */
        this.ReloadNativeTable();
        /* Define function operators */
        for (let i = 0; i < config.functionListTable['tensorBinMoreOpFunction'].length; i++) {
            this.DefBinMoreOpFunction(config.functionListTable['tensorBinMoreOpFunction'][i]);
        }
        for (let i = 0; i < config.functionListTable['tensorBinOpFunction'].length; i++) {
            this.DefBinOpFunction(config.functionListTable['tensorBinOpFunction'][i]);
        }
        for (let i = 0; i < config.functionListTable['tensorUnOpFunction'].length; i++) {
            this.DefUnOpFunction(config.functionListTable['tensorUnOpFunction'][i]);
        }
        /* Define function mappers */
        for (let i = 0; i < config.functionListTable['numberMapFunction'].length; i++) {
            this.defFunction(config.functionListTable['numberMapFunction'][i], config.baseClass['number'], true);
        }
        /* Define other functions */
        for (let i = 0; i < config.functionListTable['number2ArgFunction'].length; i++) {
            this.defFunction(config.functionListTable['number2ArgFunction'][i], config.baseClass['number']);
        }
        for (let i = 0; i < config.functionListTable['tensorFunction'].length; i++) {
            this.defFunction(config.functionListTable['tensorFunction'][i], config.baseClass['tensor']);
        }
    }
    SetDebug() {
        this.debug = true;
    }
    UnSetDebug() {
        this.debug = false;
    }
    ReloadNativeTable() {
        // Insert nativeNameTable in nameTable
        for (let name in this.nativeNameTable) {
            this.nameTable[name] = { args: [], expr: this.nativeNameTable[name] };
        }
        // Insert constantsTable in nameTable
        for (let name in constantsTable) {
            this.nameTable[constantsTable[name][0]] = { args: [], expr: this.newNumber(constantsTable[name][1], 0) };
        }
    }
    Restart() {
        this.nameTable = {};
        this.localTable = {};
        this.ReloadNativeTable();
    }
    Parse(input) {
        return this.parser.parse(input);
    }
    aliasName(name) {
        let result = false;
        let aliasindex = 0;
        for (let i = 0; i < this.aliasTable.length; i++) {
            if (this.aliasTable[i][0].test(name)) {
                result = true;
                aliasindex = i;
                break;
            }
        }
        if (result) {
            return this.aliasTable[aliasindex][1];
        }
        else {
            return name;
        }
    }
    nodeReserved(nodeid) {
        return { type: nodeid };
    }
    nodeName(nodeid) {
        return { type: 'NAME', id: nodeid.replace(/(\r\n|[\n\r])|[\ ]/gm, "") };
    }
    nodeCmdWList(nodename, nodelist) {
        return { type: 'CmdWList', id: nodename.id, args: (nodelist) ? nodelist.list : [] };
    }
    nodeArgExpr(nodeexpr, nodelist) {
        return { type: 'ARG', expr: nodeexpr, args: (nodelist) ? nodelist.list : [] };
    }
    //https://www.mathworks.com/help/matlab/ref/end.html
    nodeRange(left, ...right) {
        if (right.length == 1) {
            return { start: left, stop: right[0], stride: null };
        }
        else if (right.length == 2) {
            return { start: left, stop: right[1], stride: right[0] };
        }
        else {
            throw new Error("invalid range");
        }
    }
    nodeOp(op, data1, data2) {
        switch (op) {
            case '.+':
            case '+':
            case '.-':
            case '-':
            case '.*':
            case '*':
            case './':
            case '/':
            case '.÷':
            case '÷':
            case '.\\':
            case '\\':
            case '.^':
            case '^':
            case '.**':
            case '**':
            case '<':
            case '<=':
            case '==':
            case '>=':
            case '>':
            case '!=':
            case '~=':
            case '&':
            case '|':
            case '&&':
            case '||':
            case '=':
            case '+=':
            case '-=':
            case '*=':
            case '/=':
            case '\\=':
            case '^=':
            case '**=':
            case '.*=':
            case './=':
            case '.\\=':
            case '.^=':
            case '.**=':
            case '&=':
            case '|=':
                return { type: op, left: data1, right: data2 };
            case '()':
            case '!':
            case '~':
            case '+_':
            case '-_':
            case '++_':
            case '--_':
                return { type: op, right: data1 };
            case '.\'':
            case '\'':
            case '_++':
            case '_--':
                return { type: op, left: data1 };
            default:
                return { type: 'INVALID' };
        }
    }
    nodeListFirst(node) {
        if (node) {
            return { list: [node] };
        }
        else {
            return { list: [] };
        }
    }
    nodeList(lnode, node) {
        lnode.list.push(node);
        return lnode;
    }
    nodeFirstRow(row) {
        if (row) {
            return this.firstRow(row.list);
        }
        else {
            return this.tensor0x0();
        }
    }
    nodeAppendRow(matrix, row) {
        if (row) {
            return this.appendRow(matrix, row.list);
        }
        else {
            return matrix;
        }
    }
    validateAssignment(tree) {
        if ((tree.type == 'NAME') || ((tree.type == 'ARG') && (tree.expr.type == 'NAME'))) {
            return tree;
        }
        else {
            throw new Error("parse error: invalid left hand side of assignment.");
        }
    }
    DefUnOpFunction(name) {
        let result_function;
        eval("result_function=(...operand) => {\n\
			if (operand.length==1) {\n\
				return Tensor." + name + "(operand[0]);\n\
			}\n\
			else {\n\
				throw new Error('Invalid call to " + name + ".');\n\
			}\n\
		}");
        baseFunctionTable[name] = {
            mapper: false,
            func: result_function
        };
    }
    DefBinOpFunction(name) {
        let result_function;
        eval("result_function=(left,...right) => {\n\
			if (right.length==1) {\n\
				return Tensor." + name + "(left,right[0]);\n\
			}\n\
			else {\n\
				throw new Error('Invalid call to " + name + ".');\n\
			}\n\
		}");
        baseFunctionTable[name] = {
            mapper: false,
            func: result_function
        };
    }
    DefBinMoreOpFunction(name) {
        let result_function;
        eval("result_function=(left,...right) => {\n\
			if (right.length==1) {\n\
				return Tensor." + name + "(left,right[0]);\n\
			}\n\
			else if (right.length>1) {\n\
				let result = Tensor." + name + "(left,right[0]);\n\
				for (let i=1;i<right.length;i++) {\n\
					result = Tensor." + name + "(result,right[i]);\n\
				}\n\
				return result;\n\
			}\n\
			else {\n\
				throw new Error('Invalid call to " + name + ".');\n\
			}\n\
		}");
        baseFunctionTable[name] = {
            mapper: false,
            func: result_function
        };
    }
    defFunction(name, obj, map) {
        baseFunctionTable[name] = {
            mapper: (map) ? true : false,
            func: eval(obj + '.' + name)
        };
    }
    Unparse(tree) {
        try {
            if ('list' in tree) {
                let list = "";
                for (let i = 0; i < tree.list.length; i++) {
                    list += this.Unparse(tree.list[i]) + "\n";
                }
                return list;
            }
            else if (this.isNumber(tree)) { // NUMBER
                return this.unparseNumber(tree);
            }
            else if (this.isBoolean(tree)) { // BOOLEAN
                return this.unparseBoolean(tree);
            }
            else if (this.isString(tree)) { // STRING
                return this.unparseString(tree);
            }
            else if (this.isTensor(tree)) { // MATRIX
                return this.unparseTensor(tree, this);
            }
            else if (this.isRange(tree)) { // RANGE
                if (tree.start && tree.stop) {
                    if (tree.stride) {
                        return this.Unparse(tree.start) + ":" + this.Unparse(tree.stride) + ":" + this.Unparse(tree.stop);
                    }
                    else {
                        return this.Unparse(tree.start) + ":" + this.Unparse(tree.stop);
                    }
                }
                else {
                    return ":";
                }
            }
            else {
                let arglist;
                switch (tree.type) {
                    case ':':
                    case '!':
                    case '~':
                        return tree.type;
                    case '.+':
                    case '+':
                    case '.-':
                    case '-':
                    case '.*':
                    case '*':
                    case './':
                    case '/':
                    case '.÷':
                    case '÷':
                    case '.\\':
                    case '\\':
                    case '.^':
                    case '^':
                    case '.**':
                    case '**':
                    case '<':
                    case '<=':
                    case '==':
                    case '>=':
                    case '>':
                    case '!=':
                    case '~=':
                    case '&':
                    case '|':
                    case '&&':
                    case '||':
                    case '=':
                    case '+=':
                    case '-=':
                    case '*=':
                    case '/=':
                    case '\\=':
                    case '^=':
                    case '**=':
                    case '.*=':
                    case './=':
                    case '.\\=':
                    case '.^=':
                    case '.**=':
                    case '&=':
                    case '|=':
                        return this.Unparse(tree.left) + tree.type + this.Unparse(tree.right);
                    case '()':
                        return "(" + this.Unparse(tree.right) + ")";
                    case '!':
                    case '~':
                        return tree.type + this.Unparse(tree.right);
                    case '+_':
                        return "+" + this.Unparse(tree.right);
                    case '-_':
                        return "-" + this.Unparse(tree.right);
                    case '++_':
                        return "++" + this.Unparse(tree.right);
                    case '--_':
                        return "--" + this.Unparse(tree.right);
                    case '.\'':
                    case '\'':
                        return this.Unparse(tree.left) + tree.type;
                    case '_++':
                        return this.Unparse(tree.left) + "++";
                    case '_--':
                        return this.Unparse(tree.left) + "--";
                    case 'NAME':
                        return tree.id;
                    case 'ARG':
                        arglist = "";
                        for (let i = 0; i < tree.args.length; i++) {
                            arglist += this.Unparse(tree.args[i]) + ',';
                        }
                        return this.Unparse(tree.expr) + "(" + arglist.substring(0, arglist.length - 1) + ")";
                    case 'CmdWList':
                        arglist = "";
                        for (let i = 0; i < tree.args.length; i++) {
                            arglist += this.Unparse(tree.args[i]) + ' ';
                        }
                        return tree.id + arglist.substring(0, arglist.length - 1);
                    default:
                        return "<INVALID>";
                }
            }
        }
        catch (e) {
            return "<ERROR>";
        }
    }
    Evaluator(tree, local, fname) {
        let aliasTreeName;
        if (this.debug)
            console.log("Evaluator(tree:" + JSON.stringify(tree) + ",local:" + local + ",fname:" + fname + ")");
        if ('list' in tree) {
            let result = { list: new Array(tree.list.length) };
            for (let i = 0; i < tree.list.length; i++) {
                // Convert undefined name, defined in word-list command, to word-list command.
                // (Null length word-list command)
                if (tree.list[i].type == 'NAME' &&
                    !((local && this.localTable[fname]) && this.localTable[fname][tree.list[i].id]) &&
                    !(tree.list[i].id in this.nameTable) &&
                    (commandsTable.indexOf(tree.list[i].id) >= 0)) {
                    tree.list[i].type = 'CmdWList';
                    tree.list[i]['args'] = [];
                }
                result.list[i] = this.Evaluator(tree.list[i], local, fname);
            }
            return result;
        }
        else if (this.isNumber(tree) || this.isString(tree)) { // NUMBER or STRING
            return tree;
        }
        else if (this.isBoolean(tree)) { // BOOLEAN
            return this.booleanToNumber(tree);
        }
        else if (this.isTensor(tree)) { // MATRIX
            return this.evaluateTensor(tree, this, fname);
        }
        else if (this.isRange(tree)) { // RANGE
            return this.expandRange(this.Evaluator(tree.start, local, fname), this.Evaluator(tree.stop, local, fname), tree.stride ? this.Evaluator(tree.stride, local, fname) : null);
        }
        else {
            let result;
            switch (tree.type) {
                case '.+':
                case '+':
                case '.-':
                case '-':
                case '.*':
                case '*':
                case './':
                case '/':
                case '.÷':
                case '÷':
                case '.\\':
                case '\\':
                case '.^':
                case '^':
                case '.**':
                case '**':
                case '<':
                case '<=':
                case '==':
                case '>=':
                case '>':
                case '!=':
                case '~=':
                case '&':
                case '|':
                case '&&':
                case '||':
                    return this.opTable[tree.type](this.Evaluator(tree.left, local, fname), this.Evaluator(tree.right, local, fname));
                case '()':
                    return this.Evaluator(tree.right, local, fname);
                case '+_':
                case '-_':
                    return this.opTable[tree.type](this.Evaluator(tree.right, local, fname));
                case '++_':
                case '--_':
                    return this.opTable[tree.type](this.Evaluator(tree.right, local, fname));
                case '.\'':
                case '\'':
                case '_++':
                case '_--':
                    return this.opTable[tree.type](this.Evaluator(tree.left, local, fname));
                case '=':
                case '+=':
                case '-=':
                case '*=':
                case '/=':
                case '\\=':
                case '^=':
                case '**=':
                case '.*=':
                case './=':
                case '.\\=':
                case '.^=':
                case '.**=':
                case '&=':
                case '|=':
                    let op = tree.type.substring(0, tree.type.length - 1);
                    let left;
                    let id;
                    let args;
                    if (tree.left.type == 'NAME') {
                        left = tree.left;
                        id = tree.left.id;
                        aliasTreeName = this.aliasName(tree.left.id);
                        args = [];
                    }
                    else { // (tree.left.type=='ARG') && (tree.left.expr.type=='NAME')
                        left = tree.left.expr;
                        id = tree.left.expr.id;
                        aliasTreeName = this.aliasName(tree.left.expr.id);
                        args = tree.left.args;
                    }
                    if (aliasTreeName in baseFunctionTable) {
                        throw new Error("assign to reserved name: " + aliasTreeName);
                    }
                    else {
                        if (args.length == 0) {
                            // Name definition
                            try {
                                this.nameTable[id] = { args: [], expr: this.Evaluator(tree.right, false, fname) };
                                return this.nodeOp('=', left, this.nameTable[id].expr);
                            }
                            catch (e) {
                                this.nameTable[id] = { args: [], expr: tree.right };
                                throw e;
                            }
                        }
                        else {
                            if ((this.nameTable[id]) && (this.isTensor(this.nameTable[id].expr))) {
                                // Matrix indexing refer
                                console.log("matrix indexing refer");
                                return tree; /** */
                            }
                            else {
                                // Function definition
                                // Test if args is a list of NAME
                                let pass = true;
                                for (let i = 0; i < args.length; i++) {
                                    pass = pass && args[i].type == 'NAME';
                                    if (!pass)
                                        throw new Error("invalid arguments in function definition");
                                }
                                this.nameTable[id] = { args: args, expr: tree.right };
                                return tree;
                            }
                        }
                    }
                    break;
                case 'NAME':
                    if ((local && this.localTable[fname]) && this.localTable[fname][tree.id]) { // Defined in localTable
                        return this.localTable[fname][tree.id];
                    }
                    else if (tree.id in this.nameTable) { // Defined in nameTable
                        if (this.nameTable[tree.id].args.length == 0) { // Defined as name
                            return this.Evaluator(this.nameTable[tree.id].expr, false, fname);
                        }
                        else { // Defined as function name
                            throw new Error("calling " + tree.id + " function without arguments list");
                        }
                    }
                case 'ARG':
                    if (tree.expr.type == 'NAME') { // Matrix indexing or function call
                        aliasTreeName = this.aliasName(tree.expr.id);
                        let argumentsList = [];
                        if (aliasTreeName in baseFunctionTable) { // Is base function
                            if (typeof baseFunctionTable[aliasTreeName]['mapper'] !== 'undefined') { // arguments evaluated
                                for (let i = 0; i < tree.args.length; i++) { // Evaluate arguments list
                                    argumentsList[i] = this.Evaluator(tree.args[i], local, fname);
                                }
                                if (baseFunctionTable[aliasTreeName].mapper && argumentsList.length != 1) { // Error if mapper and #arguments!=1 (Invalid call)
                                    throw new Error("Invalid call to " + aliasTreeName + ".");
                                }
                                if ((argumentsList.length == 1) && ('array' in argumentsList[0]) && baseFunctionTable[aliasTreeName].mapper) { // Test if is mapper
                                    return this.mapTensor(argumentsList[0], baseFunctionTable[aliasTreeName].func);
                                }
                                else {
                                    return baseFunctionTable[aliasTreeName].func(...argumentsList);
                                }
                            }
                            else { // arguments selectively evaluated
                                for (let i = 0; i < tree.args.length; i++) { // Evaluate arguments list selectively
                                    argumentsList[i] = baseFunctionTable[aliasTreeName].ev[i] ? this.Evaluator(tree.args[i], local, fname) : tree.args[i];
                                }
                                return baseFunctionTable[aliasTreeName].func(...argumentsList, this);
                            }
                        }
                        else if (local && this.localTable[fname] && this.localTable[fname][tree.expr.id]) { // Defined in localTable ****
                            return this.localTable[fname][tree.expr.id];
                        }
                        else if (tree.expr.id in this.nameTable) { // Defined in nameTable
                            if (this.nameTable[tree.expr.id].args.length == 0) { // if is defined name
                                let temp = this.Evaluator(this.nameTable[tree.expr.id].expr, false, fname);
                                if (tree.args.length == 0) {
                                    // Defined name
                                    return temp;
                                }
                                else if (this.isTensor(temp)) {
                                    // Defined matrix indexing
                                    for (let i = 0; i < tree.args.length; i++) { // Evaluate index list
                                        argumentsList[i] = this.Evaluator(tree.args[i], local, fname);
                                    }
                                    return this.subTensor(temp, tree.expr.id, argumentsList);
                                }
                                else {
                                    throw new Error("invalid matrix indexing or function arguments");
                                }
                            }
                            else { // Else is defined function
                                if (this.nameTable[tree.expr.id].args.length != tree.args.length) {
                                    throw new Error("invalid number of arguments in function " + tree.expr.id);
                                }
                                this.localTable[tree.expr.id] = {}; // create localTable entry
                                for (let i = 0; i < tree.args.length; i++) { // Evaluate defined function arguments list
                                    this.localTable[tree.expr.id][this.nameTable[tree.expr.id].args[i].id] = this.Evaluator(tree.args[i], true, fname);
                                }
                                let temp = this.Evaluator(this.nameTable[tree.expr.id].expr, true, tree.expr.id);
                                delete this.localTable[tree.expr.id]; // delete localTable entry
                                return temp;
                            }
                        }
                        else {
                            throw new Error("'" + tree.id + "' undefined");
                        }
                    }
                    else { // literal indexing, ex: [1,2;3,4](1,2)
                        console.log("literal indexing");
                        return tree; /** */
                    }
                case 'CmdWList':
                    switch (tree.id) {
                        case 'help':
                            this.exitStatus = EvaluatorResponse.INFO;
                            this.exitMessage = helpCommand(tree.args);
                            break;
                        case 'doc':
                            this.exitStatus = EvaluatorResponse.INFO;
                            this.exitMessage = docCommand(tree.args);
                            break;
                    }
                    return tree;
                default:
                    throw new Error("evaluating undefined type '" + tree.type + "'");
            }
        }
    }
    Evaluate(tree) {
        try {
            this.exitStatus = EvaluatorResponse.OK;
            let result = this.Evaluator(tree, false, "");
            const assign_op = ['=', '+=', '.+=', '-=', '.-=', '*=', '/=', '\\=', '^=', '.*=', './=', '.\\=', '.^=', '.**=', '|=', '&='];
            if (assign_op.indexOf(result.type) == -1) {
                this.nameTable['ans'] = { args: [], expr: result };
            }
            if (this.exitStatus >= 0) { // not (WARNING or INFO)
                this.exitMessage = "";
            }
            return result;
        }
        catch (e) {
            this.exitStatus = EvaluatorResponse.EVAL_ERROR;
            throw e;
        }
    }
    unparserML(tree) {
        try {
            if ('list' in tree) {
                let list = "<mtable>";
                for (let i = 0; i < tree.list.length; i++) {
                    list += "<mtr><mtd>" + this.unparserML(tree.list[i]) + "</mtd></mtr>";
                }
                return list + "</mtable>";
            }
            else if (this.isNumber(tree)) { // NUMBER
                return this.unparseNumberML(tree);
            }
            else if (this.isBoolean(tree)) { // BOOLEAN
                return this.unparseBooleanML(tree);
            }
            else if (this.isString(tree)) { // STRING
                return this.unparseStringML(tree);
            }
            else if (this.isTensor(tree)) { // MATRIX
                return this.unparseTensorML(tree, this);
            }
            else if (this.isRange(tree)) { // RANGE
                if (tree.start && tree.stop) {
                    if (tree.stride) {
                        return this.unparserML(tree.start) + "<mo>:</mo>" + this.unparserML(tree.stride) + "<mo>:</mo>" + this.unparserML(tree.stop);
                    }
                    else {
                        return this.unparserML(tree.start) + "<mo>:</mo>" + this.unparserML(tree.stop);
                    }
                }
                else {
                    return "<mo>:</mo>";
                }
            }
            else {
                let arglist;
                switch (tree.type) {
                    case ':':
                    case '!':
                    case '~':
                        return "<mo>" + tree.type + "</mo>";
                    case '.+':
                    case '+':
                    case '.-':
                    case '-':
                    case '.*':
                    case './':
                    case '.÷':
                    case '÷':
                    case '.\\':
                    case '\\':
                    case '.^':
                    case '.**':
                    case '<':
                    case '>':
                    case '==':
                    case '&':
                    case '|':
                    case '&&':
                    case '||':
                    case '=':
                    case '+=':
                    case '-=':
                    case '*=':
                    case '/=':
                    case '\\=':
                    case '^=':
                    case '**=':
                    case '.*=':
                    case './=':
                    case '.\\=':
                    case '.^=':
                    case '.**=':
                    case '&=':
                    case '|=':
                        return this.unparserML(tree.left) + "<mo>" + tree.type + "</mo>" + this.unparserML(tree.right);
                    case '<=':
                        return this.unparserML(tree.left) + "<mo>&le;</mo>" + this.unparserML(tree.right);
                    case '>=':
                        return this.unparserML(tree.left) + "<mo>&ge;</mo>" + this.unparserML(tree.right);
                    case '!=':
                    case '~=':
                        return this.unparserML(tree.left) + "<mo>&ne;</mo>" + this.unparserML(tree.right);
                    case '()':
                        return "<mo>(</mo>" + this.unparserML(tree.right) + "<mo>)</mo>";
                    case '*':
                        return this.unparserML(tree.left) + "<mo>&times;</mo>" + this.unparserML(tree.right);
                    case '/':
                        return "<mfrac><mrow>" + this.unparserML(tree.left) + "</mrow><mrow>" + this.unparserML(tree.right) + "</mrow></mfrac>";
                    case '**':
                    case '^':
                        return "<msup><mrow>" + this.unparserML(tree.left) + "</mrow><mrow>" + this.unparserML(tree.right) + "</mrow></msup>";
                    case ':':
                    case '!':
                    case '~':
                        return "<mo>" + tree.type + "</mo>" + this.unparserML(tree.right);
                    case '+_':
                        return "<mo>+</mo>" + this.unparserML(tree.right);
                    case '-_':
                        return "<mo>-</mo>" + this.unparserML(tree.right);
                    case '++_':
                        return "<mo>++</mo>" + this.unparserML(tree.right);
                    case '--_':
                        return "<mo>--</mo>" + this.unparserML(tree.right);
                    case '_++':
                        return this.unparserML(tree.right) + "<mo>++</mo>";
                    case '_--':
                        return this.unparserML(tree.right) + "<mo>--</mo>";
                    case '.\'':
                        return "<msup><mrow>" + this.unparserML(tree.left) + "</mrow><mrow><mi>T</mi></mrow></msup>";
                    case '\'':
                        return "<msup><mrow>" + this.unparserML(tree.left) + "</mrow><mrow><mi>H</mi></mrow></msup>";
                    case 'NAME':
                        return "<mi>" + substGreek(tree.id) + "</mi>";
                    case 'ARG':
                        if (tree.args.length == 0) {
                            return this.unparserML(tree.expr) + "<mrow><mo>(</mo><mo>)</mo></mrow>";
                        }
                        else {
                            arglist = "";
                            for (let i = 0; i < tree.args.length; i++) {
                                arglist += this.unparserML(tree.args[i]) + "<mo>,</mo>";
                            }
                            arglist = arglist.substring(0, arglist.length - 10);
                            if (tree.expr.type == 'NAME') {
                                let aliasTreeName = this.aliasName(tree.expr.id);
                                switch (aliasTreeName) {
                                    case "abs":
                                        return "<mrow><mo>|</mo>" + this.unparserML(tree.args[0]) + "<mo>|</mo></mrow>";
                                    case "conj":
                                        return "<mover><mrow>" + this.unparserML(tree.args[0]) + "</mrow><mo>&OverBar;</mo></mover>";
                                    case "sqrt":
                                        return "<msqrt><mrow>" + this.unparserML(tree.args[0]) + "</mrow></msqrt>";
                                    case "root":
                                        return "<mroot><mrow>" + this.unparserML(tree.args[0]) + "</mrow><mrow>" + this.unparserML(tree.args[1]) + "</mrow></mroot>";
                                    case "exp":
                                        return "<msup><mi>e</mi><mrow>" + this.unparserML(tree.args[0]) + "</mrow></msup>";
                                    case "log":
                                        return "<msub><mi>log</mi><mrow>" + this.unparserML(tree.args[0]) + "</mrow></msub><mrow>" + this.unparserML(tree.args[1]) + "</mrow>";
                                    case "sum":
                                        return "<mrow><munderover><mo>&#x2211;</mo><mrow>" + this.unparserML(tree.args[0]) + "<mo>=</mo>" + this.unparserML(tree.args[1]) + "</mrow>" + this.unparserML(tree.args[2]) + "</munderover></mrow>" + this.unparserML(tree.args[3]);
                                    case "prod":
                                        return "<mrow><munderover><mo>&#x220F;</mo><mrow>" + this.unparserML(tree.args[0]) + "<mo>=</mo>" + this.unparserML(tree.args[1]) + "</mrow>" + this.unparserML(tree.args[2]) + "</munderover></mrow>" + this.unparserML(tree.args[3]);
                                    case "gamma":
                                        return "<mi>&Gamma;</mi><mrow><mo>(</mo>" + arglist + "<mo>)</mo></mrow>";
                                    case "factorial":
                                        return "<mrow><mo>(</mo>" + this.unparserML(tree.args[0]) + "<mo>)</mo></mrow><mo>!</mo>";
                                    case "binomial":
                                        return "<mrow><mo>(</mo><mtable><mtr><mtd>" + this.unparserML(tree.args[0]) + "</mtd></mtr><mtr><mtd>" + this.unparserML(tree.args[1]) + "</mtd></mtr></mtable><mo>)</mo></mrow>";
                                    default:
                                        return "<mi>" + substGreek(tree.expr.id) + "</mi><mrow><mo>(</mo>" + arglist + "<mo>)</mo></mrow>";
                                }
                            }
                            else {
                                return "<mi>" + this.unparserML(tree.expr) + "</mi><mrow><mo>(</mo>" + arglist + "<mo>)</mo></mrow>";
                            }
                        }
                    case 'CmdWList':
                        arglist = " ";
                        for (let i = 0; i < tree.args.length; i++) {
                            arglist += this.Unparse(tree.args[i]) + ' ';
                        }
                        return "<mtext>" + tree.id + " " + arglist.substring(0, arglist.length - 1) + "</mtext>";
                    default:
                        return "<mi>invalid</mi>";
                }
            }
        }
        catch (e) {
            if (this.debug) {
                throw e;
            }
            else {
                return "<mi>error</mi>";
            }
        }
    }
    UnparseML(tree) {
        let result = this.unparserML(tree);
        result = result.replace(/\<mo\>\(\<\/mo\>\<mi\>error\<\/mi\><\mi\>error\<\/mi\>\<mi\>i\<\/mi\>\<mo\>\)\<\/mo\>/ig, "<mi>error</mi>");
        return "<math xmlns = 'http://www.w3.org/1998/Math/MathML' display='block'>" + result + "</math>";
    }
}
//export { Evaluator, EvaluatorPointer, EvaluatorResponse, baseFunctionTable, keywordsTable };
