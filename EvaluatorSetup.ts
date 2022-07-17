/**
 * #### EvaluatorSetup.ts ####
 * 
 * This file defines four base objects for use in Evaluator and it's associated
 * methods:
 * - boolean
 * - string
 * - number (complex)
 * - tensor
 * 
 * It has definitions for aditional functions in baseFunctionTable and
 * specialFunctionTable too.
 * 
 * At end of this file is the definition of EvaluatorConfiguration. It is the
 * definition of basic objects and methods. This is the parameter passed in
 * Evaluator class instantiation.
 * 
 */


import Bool from "./Bool.js";
import CharString from "./CharString.js";
import Decimal from "./decimal.js";
import {ComplexDecimal,ComplexDecimalMapFunction,ComplexDecimal2ArgFunction} from "./ComplexDecimal.js";
import {MultiArray,MultiArrayFunction} from "./MultiArray.js";
import {Tensor,TensorUnOpFunction,TensorBinOpFunction,TensorBinMoreOpFunction} from "./Tensor.js";
import {
	Evaluator,TEvaluatorConfig,EvaluatorPointer,
	TBaseFunctionTableEntry,TBaseFunctionTable,baseFunctionTable,
	NodeName, NodeExpr
} from "./Evaluator.js";

"use strict";

const externalFunctionDefinitions: TBaseFunctionTable = { 

	'sum': { // summation
		ev:[false,true,true,false],
		func:function(variable: NodeName,start: ComplexDecimal,end: ComplexDecimal,expr:NodeExpr, that: Evaluator): ComplexDecimal {
			if (!start.im.eq(0)) throw new Error("complex number sum index");
			if (!end.im.eq(0)) throw new Error("complex number sum index");
			var result: ComplexDecimal = ComplexDecimal.zero();
			that.localTable['sum_function'] = {};
			for (var i=start.re.toNumber();i<=end.re.toNumber();i++){
				that.localTable['sum_function'][variable.id]={re:new Decimal(i), im:new Decimal(0)};
				result = ComplexDecimal.add(result,that.Evaluator(expr,true,"sum_function"));
			}
			delete that.localTable['sum_function'];
			return result;
		}
	},

	'prod': { // productory
		ev:[false,true,true,false],
		func:function(variable: NodeName,start: ComplexDecimal,end: ComplexDecimal,expr: NodeExpr, that: Evaluator): ComplexDecimal {
			if (!start.im.eq(0)) throw new Error("complex number prod index");
			if (!end.im.eq(0)) throw new Error("complex number prod index");
			var result: ComplexDecimal = ComplexDecimal.one();
			that.localTable['prod_function'] = {};
			for (var i=start.re.toNumber();i<=end.re.toNumber();i++){
				that.localTable['prod_function'][variable.id]={re:new Decimal(i), im:new Decimal(0)};
				result = ComplexDecimal.mul(result,that.Evaluator(expr,true,"prod_function"));
			}
			delete that.localTable['prod_function'];
			return result;
		}
	},

	'plot': { // plot 2D
		ev:[false,false,true,true],
		func:function(expr: NodeExpr,variable: NodeName,minx: ComplexDecimal,maxx: ComplexDecimal, that: Evaluator): NodeExpr {
			insertOutput='plot';
			if (!minx.im.eq(0)) {
				throw new Error("complex number in plot minimum x axis");
			}
			else {
				plotData.MinX=minx.re.toNumber();
			}
			if (!maxx.im.eq(0)) {
				throw new Error("complex number in plot maximum x axis");
			}
			else {
				plotData.MaxX=maxx.re.toNumber();
			}
			var deltaX = (plotData.MaxX-plotData.MinX)/plotWidth
			that.localTable['plot_function']={}
			let save_precision = Decimal.precision;
			Decimal.set({precision:20});
			plotData.MaxY = 0;
			plotData.MinY = 0;
			for(var i=0;i<plotWidth;i++){
				that.localTable['plot_function'][variable.id]={re:new Decimal(plotData.MinX+deltaX*i), im:new Decimal(0)};
				var data_y=that.Evaluator(expr,true,"plot_function");
				if (isFinite(data_y.re.toNumber()) && isFinite(data_y.im.toNumber()) && (data_y.im.eq(0))) {
					plotData.data[i]=data_y.re.toNumber();
				}
				else {
					throw new Error("non real number in plot y axis");
				}
				plotData.MaxY=Math.max(plotData.MaxY,plotData.data[i]);
				plotData.MinY=Math.min(plotData.MinY,plotData.data[i]);
			}
			delete that.localTable['plot_function'];
			Decimal.set({ precision: save_precision });
			return that.nodeArgExpr(that.nodeName('plot'),{list:[expr,variable,minx,maxx]});
		}
	},

	'hist': { // histogram
		ev:[true],
		func:function(M: MultiArray): NodeExpr {
			insertOutput='hist';
			var DMin = Math.min(M.dim[0],M.dim[1]);
			var temp: any = M;
			if ((DMin!=1) && (DMin!=2)){
				throw new Error("invalid dimensions in hist");
			}
			else {
				if (DMin==M.dim[1]){
					temp = MultiArray.transpose(M);
				}
				plotData.MaxY=0;
				plotData.MinY=0;
				for(var i=0;i<temp.dim[1];i++){
					if (isFinite(temp.array[0][i].re.toNumber()) && isFinite(temp.array[0][i].im.toNumber()) && (temp.array[0][i].im.eq(0))) {
						plotData.data[i]=temp.array[0][i].re.toNumber();
					}
					else {
						throw new Error("non real number in histogram y axis");
					}
					plotData.MaxY=Math.max(plotData.MaxY,plotData.data[i]);
					plotData.MinY=Math.min(plotData.MinY,plotData.data[i]);
				}
				if (temp.dim[0]==2) {
					plotData.MaxX=0;
					plotData.MinX=0;
					for(var i=0;i<temp.dim[1];i++){
						if ('str' in temp.array[1][0]) {
							plotData.tag[i]=temp.array[1][i].str;
						}
						else {
							if (isFinite(temp.array[1][i].re.toNumber()) && isFinite(temp.array[1][i].im.toNumber()) && (temp.array[1][i].im.eq(0))) {
								plotData.tag[i]=temp.array[1][i].re.toNumber().toString();
							}
							else {
								throw new Error("non real number in histogram x axis");
							}
							plotData.MaxX=Math.max(plotData.MaxX,M.array[1][i].re.toNumber());
							plotData.MinX=Math.min(plotData.MinX,M.array[1][i].re.toNumber());
						}
					}
				}
			}
			return EvaluatorPointer.nodeArgExpr(EvaluatorPointer.nodeName('hist'),{list:[temp]});
		}
	},

};
Object.assign(baseFunctionTable,externalFunctionDefinitions)

const EvaluatorConfiguration: TEvaluatorConfig = {

	aliasTable: [
		/* Number functions */
		[/^abs(olut(o|e))?|mod(ul(o|e))?$/i, "abs"],
		[/^arg(ument(o)?)?|angle|[aâ]ngulo$/i, "arg"],
		[/^sign(al)?|sinal|sgn$/i, "sign"],
		[/^conj(uga(do|te)?)?$/i, "conj"],
		[/^r(ai)?z(2|q(uadrada)?)|sqrt$/i, "sqrt"],
		[/^r(ai)?z|r(oo)?t$/i, "root"],
		[/^pot([eê]ncia)?|elev(ado)?|pow$/i, "pow"],
		[/^exp(onen((cial)|(tial)))?$/i, "exp"],
		[/^ln$/i, "ln"],
		[/^log$/i, "log"],
		[/^log10$/i, "log10"],
		[/^a(rc)?s[ei]n$/i, "asin"],
		[/^s[ei]n$/i, "sin"],
		[/^a(rc)?cos$/i, "acos"],
		[/^cos$/i, "cos"],
		[/^a(rc)?t(g|an)$/i, "atan"],
		[/^t(g|an)$/i, "tan"],
		[/^a(rc)?s[ei]nh$/i, "asinh"],
		[/^s[ei]nh$/i, "sinh"],
		[/^a(rc)?cosh$/i, "acosh"],
		[/^cosh$/i, "cosh"],
		[/^a(rc)?t(g|an)h$/i, "atanh"],
		[/^t(g|an)h$/i, "tanh"],
		[/^fa(c)?t(orial)?$/i, "factorial"],
		[/^binom(i(o|al))?$/i, "binomial"],
		/* Matrix functions */
		[/^ident(i(dade|ty))?|eye$/i, "eye"],
		[/^inv(er(t(er)?|s[ea])?)?$/i, "inv"],
		[/^det(erminant(e)?)?$/i, "det"],
		[/^tr(a[cç]o|ace)$/i, "trace"],
		[/^trans(p((ose)?|(osta)?))?$/i, "ctranspose"],
		[/^elem(ento?)?$/i, "elem"],
		[/^lin(ha|e)?|row$/i, "row"],
		[/^n(um)?lin(has|es)?|nrows$/i, "nrows"],
		[/^col(u(na|mn))?$/i, "col"],
		[/^n(um)?col(u(na|mn))?s$/i, "ncols"],
		[/^m[ie]nor$/i, "minor"],
		[/^cofa(c)?t(or)?$/i, "cofact"],
		[/^adj(unta|oint)?$/i, "adj"],
		[/^piv[oô]t?$/i, "pivot"],
		[/^lu(dec(omp(osi[cç][aã]o|osition)?)?)?|(dec(omp(osi[cç][aã]o|osition)?)?)?lu$/i, "lu"],
		[/^m[ií]]n(imo)?|min(imum)?$/i, "min"],
		[/^m[aá]x(imo)?|max(imum)?$/i, "max"],
		[/^m[eé]dia|mean$/i, "mean"],
		/* Special functions */
		[/^soma(t[oó]rio)?|sum(mation)?$/i, "sum"],
		[/^prod(t[oó]rio|(ctory)?)$/i, "prod"],
		[/^gr[aá](f(ico)?|ph?(ics?)?)?|plot$/i, "plot"],
		[/^hist(ogram(a)?)?$/i, "hist"],
		/* Constants */
		[/^cte\.pi$/i, "pi"],
		[/^cte\.e$/i, "e"]
	],

	baseClass: {
		'boolean':	'Bool',
		'string':	'CharString',
		'number':	'ComplexDecimal',
		'tensor':	'MultiArray'
	},

	constantTable: {
		'false':	Bool.false,
		'true':		Bool.true,
		'i':		ComplexDecimal.onei,
		'e':		ComplexDecimal.e,
		'pi':		ComplexDecimal.pi,
		'inf':		ComplexDecimal.inf_0,
		'NaN':		ComplexDecimal.NaN_0
	},

	functionListTable: {
		'numberMapFunction':		ComplexDecimalMapFunction,
		'number2ArgFunction':		ComplexDecimal2ArgFunction,
		'tensorFunction':			MultiArrayFunction,
		'tensorUnOpFunction':		TensorUnOpFunction,
		'tensorBinOpFunction':		TensorBinOpFunction,
		'tensorBinMoreOpFunction':	TensorBinMoreOpFunction,
	},

	functionTable: {
		'nodeBoolean':		Bool.parse,
		'isBoolean':		Bool.isThis,
		'unparseBoolean':	Bool.unparse,
		'unparseBooleanML':	Bool.unparseML,
		'nodeString':		CharString.parse,
		'isString':			CharString.isThis,
		'unparseString':	CharString.unparse,
		'unparseStringML':	CharString.unparseML,
		'removeQuotes':		CharString.removeQuotes,
		'nodeNumber':		ComplexDecimal.parse,
		'newNumber':		ComplexDecimal.newThis,
		'booleanToNumber':	ComplexDecimal.boolToThis,
		'isNumber':			ComplexDecimal.isThis,
		'unparseNumber':	ComplexDecimal.unparse,
		'unparseNumberML':	ComplexDecimal.unparseML,
		'isTensor':			MultiArray.isThis,
		'isRange':			MultiArray.isRange,
		'unparseTensor':	MultiArray.unparse,
		'unparseTensorML':	MultiArray.unparseML,
		'evaluateTensor':	MultiArray.evaluate,
		'mapTensor':		MultiArray.map,
		'subTensor':		MultiArray.subMatrix,
		'expandRange':		MultiArray.expandRange,
		'firstRow':			MultiArray.firstRow,
		'appendRow':		MultiArray.appendRow,
		'tensor0x0':		MultiArray.mat_0x0,
	},

	opTable: {
		'+':	Tensor.plus,
		'-':	Tensor.minus,
		'.*':	Tensor.times,
		'*':	Tensor.mtimes,
		'./':	Tensor.rdivide,
		'/':	Tensor.mrdivide,
		'.\\':	Tensor.ldivide,
		'\\':	Tensor.mldivide,
		'.^':	Tensor.power,
		'^':	Tensor.mpower,
		'+_':	Tensor.uplus,
		'-_':	Tensor.uminus,
		'.\'':	Tensor.transpose,
		'\'':	Tensor.ctranspose,
		'<':	Tensor.lt,
		'<=':	Tensor.lte,
		'==':	Tensor.eq,
		'>=':	Tensor.gte,
		'>':	Tensor.gt,
		'!=':	Tensor.ne,
	}

};

type TBoolean = Bool;
type TString = CharString;
type TNumber = ComplexDecimal;
type TTensor = MultiArray;

export {EvaluatorConfiguration, TBoolean, TString, TNumber, TTensor};