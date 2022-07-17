import Bool from "./Bool.js";
import CharString from "./CharString.js";
import Decimal from "./decimal.js";
import {ComplexDecimal} from "./ComplexDecimal.js";
import {MultiArray} from "./MultiArray.js";

"use strict";

const TensorUnOpFunction: Array<string> = [
	'uplus',
	'uminus',
	'transpose',
	'ctranspose'
];

const TensorBinOpFunction: Array<string> = [
	'minus',
	'rdivide',
	'mrdivide',
	'ldivide',
	'mldivide',
	'power',
	'mpower',
	'lte',
	'gte',
	'gt',
	'eq',
	'ne',
];

const TensorBinMoreOpFunction: Array<string> = [
	'plus',
	'times',
	'mtimes'
];

abstract class Tensor {
    static ewiseOp(op: 'add' | 'sub' | 'mul' | 'rdiv' | 'ldiv' | 'pow' | 'lt' | 'lte' | 'eq' | 'gte' | 'gt' | 'ne', left: any, right: any): any {
		left=ComplexDecimal.toThis(left);
		right=ComplexDecimal.toThis(right);
		if (('re' in left) && ('re' in right)) {
			return ComplexDecimal[op](left,right);
		}
		else if (('re' in left) && ('array' in right)) {
			return MultiArray.scalarOpMultiArray(op,left,right);
		}
		else if (('array' in left) && ('re' in right)) {
			return MultiArray.MultiArrayOpScalar(op,left,right);
		}
		else if (('array' in left) && ('array' in right)) {
			return MultiArray.ewiseOp(op,left,right);
		}
    }

    static leftOp(op: 'clone' | 'neg', right: any): any {
		right=ComplexDecimal.toThis(right);
		if ('re' in right) {
			return ComplexDecimal[op](right);
		}
		else if ('array' in right) {
			return MultiArray.leftOp(op,right);
		}
    }

    static plus(left: any,right: any): any {
        return Tensor.ewiseOp('add',left,right);
    }

    static minus(left: any,right: any): any {
        return Tensor.ewiseOp('sub',left,right);
    }

    static times(left: any,right: any): any {
        return Tensor.ewiseOp('mul',left,right);
    }

    static mtimes(left: any,right: any): any {
		left=ComplexDecimal.toThis(left);
		right=ComplexDecimal.toThis(right);
		if (('re' in left) && ('re' in right)) {
			return ComplexDecimal.mul(left,right);
		}
		else if (('re' in left) && ('array' in right)) {
			return MultiArray.scalarOpMultiArray('mul',left,right);
		}
		else if (('array' in left) && ('re' in right)) {
			return MultiArray.MultiArrayOpScalar('mul',left,right);
		}
		else if (('array' in left) && ('array' in right)) {
			return MultiArray.mul(left,right);
		}
    }

    static rdivide(left: any,right: any): any {
        return Tensor.ewiseOp('rdiv',left,right);
    }

    static mrdivide(left: any,right: any): any {
		left=ComplexDecimal.toThis(left);
		right=ComplexDecimal.toThis(right);
		if (('re' in left) && ('re' in right)) {
			return ComplexDecimal.rdiv(left,right);
		}
		else if (('re' in left) && ('array' in right)) {
			return MultiArray.scalarOpMultiArray('mul',left,MultiArray.inv(right));
		}
		else if (('array' in left) && ('re' in right)) {
			return MultiArray.scalarOpMultiArray('mul',ComplexDecimal.inv(right),left);
		}
		else if (('array' in left) && ('array' in right)) {
			return MultiArray.mul(left,MultiArray.inv(right));
		}
    }

    static ldivide(left: any,right: any): any {
        return Tensor.ewiseOp('ldiv',left,right);
    }

    static mldivide(left: any,right: any): any {
		left=ComplexDecimal.toThis(left);
		right=ComplexDecimal.toThis(right);
		// ******************

    }

    static power(left: any,right: any): any {
        return Tensor.ewiseOp('pow',left,right);
    }

    static mpower(left: any,right: any): any {
		left=ComplexDecimal.toThis(left);
		right=ComplexDecimal.toThis(right);
		if (('re' in left) && ('re' in right)) {
			return ComplexDecimal.pow(left,right);
		}
		else if (('array' in left) && ('re' in right)) {
			return MultiArray.pow(left,right);
		}
		else {
			throw new Error("invalid exponent in '^'");
		}
    }

    static uplus(right: any): any {
        return Tensor.leftOp('clone',right);
    }

    static uminus(right: any): any {
        return Tensor.leftOp('neg',right);
    }

    static transpose(left: any): any {
		left=ComplexDecimal.toThis(left);
		if ('re' in left) {
			return Object.assign({},left);
		}
		else if ('array' in left) {
			return MultiArray.transpose(left);
		}
    }

    static ctranspose(left: any): any {
		left=ComplexDecimal.toThis(left);
		if ('re' in left) {
			return ComplexDecimal.conj(left);
		}
		else if ('array' in left) {
			return MultiArray.ctranspose(left);
		}
    }

    static lt(left: any,right: any): any {
        return Tensor.ewiseOp('lt',left,right);
    }

    static lte(left: any,right: any): any {
        return Tensor.ewiseOp('lte',left,right);
    }

    static eq(left: any,right: any): any {
        return Tensor.ewiseOp('eq',left,right);
    }

    static gte(left: any,right: any): any {
        return Tensor.ewiseOp('gte',left,right);
    }

    static gt(left: any,right: any): any {
        return Tensor.ewiseOp('gt',left,right);
    }

    static ne(left: any,right: any): any {
        return Tensor.ewiseOp('ne',left,right);
    }

}

export {Tensor,TensorUnOpFunction,TensorBinOpFunction,TensorBinMoreOpFunction};