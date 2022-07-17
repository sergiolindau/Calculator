import Bool from "./Bool.js";
import CharString from "./CharString.js";
import Decimal from "./decimal.js";
import {ComplexDecimal} from "./ComplexDecimal.js";

"use strict";

declare var EvaluatorPointer: any;

const MultiArrayFunction: Array<string> = [
	'size',
	'sub2ind',
	'ind2sub',
	'zeros',
	'ones',
	'eye',
	'inv',
	'det',
	'trace',
	'rows',
	'cols',
	'minor',
	'cofactor',
	'adj',
	'pivot',
	'lu',
	'min',
	'max',
	'mean',
	'horzcat',
	'vertcat',
	'gauss',
]

type dimRange = {
    start: number;
    stride: number;
    stop: number;
}

type ComplexDecimalRange = {
    start: ComplexDecimal;
    stride: ComplexDecimal;
    stop: ComplexDecimal;
}

class MultiArray {
    dim: Array<number>;
    array: Array<Array<ComplexDecimal>>;
    constructor(...args: any) {
        if (!args.length) {
            this.dim = [0,0];
            this.array=new Array();
        }
        else if (args.length==1) {
            this.dim = args[0].slice();
            this.array = new Array(this.dim[0]);
        }
        else {
            this.dim = args[0].slice();
            this.array = new Array(this.dim[0]);
            for(var n=0; n<this.dim[0]; n++) {
                this.array[n] = new Array(this.dim[1]).fill(args[1]);
            }
        }
    }

	static firstRow(row: Array<any>): MultiArray {
		let result = new MultiArray([1,row.length]);
		result.array[0] = row;
		return result;
	}

	static appendRow(matrix: MultiArray, row: Array<any>): MultiArray {
		matrix.array.push(row);
		matrix.dim[0]++;
		return matrix;
	}

	static unparse(tree: MultiArray, that: any): string {
		let arraystr="";
		for (let i=0;i<tree.array.length;i++) {
			for(let j=0;j<tree.array[i].length;j++) {
				arraystr+=that.Unparse(tree.array[i][j])+",";
			}
			arraystr = arraystr.substring(0,arraystr.length-1);
			arraystr+=";";
		}
		arraystr = arraystr.substring(0,arraystr.length-1);
		return "[" + arraystr + "]";
	}

	static unparseML(tree: MultiArray, that: any): string {
		let temp = "";
		temp += "<mrow><mo>[</mo><mtable>";
		for(let i=0; i<tree.array.length; i++) {
			temp += "<mtr>";
			for(let j=0; j<tree.array[i].length; j++) {
				temp += "<mtd>"+that.unparserML(tree.array[i][j])+"</mtd>";
			}
			temp += "</mtr>";
		}
		temp += (tree.array.length>0)?"</mtable><mo>]</mo></mrow>":"<mspace width='0.5em'/></mtable><mo>]</mo></mrow><mo>(</mo><mn>0</mn><mi>&times;</mi><mn>0</mn><mo>)</mo>";
		return temp;			
	}

	static evaluate(tree: MultiArray, that: any, fname:string): MultiArray {
		let result = new MultiArray();
		for (let i=0,k=0;i<tree.array.length;i++,k++) {
			result.array.push(new Array());
			let h = 1;
			for(let j=0;j<tree.array[i].length;j++) {
				let temp = that.Evaluator(tree.array[i][j],false,fname);
				if (MultiArray.isThis(temp)) {
					if (j==0) {
						h = temp.array.length;
						result.array.splice(k,1,temp.array[0]);
						for (let n=1;n<h;n++){
							result.array.splice(k+n,0,temp.array[n]);
						}
					}
					else {
						for (let n=0;n<temp.array.length;n++){
							for (let m=0;m<temp.array[0].length;m++){
								result.array[k+n].push(temp.array[n][m]);
							}
						}
					}
				}
				else {
					result.array[k][j] = temp;
				}
			}
			k+=h-1;
			if (i!=0) {
				if (result.array[i].length!=result.array[0].length)
					throw new Error("vertical dimensions mismatch ("+k+"x"+result.array[0].length+" vs 1x"+result.array[i].length+")")
			}
		}
		result.dim=[result.array.length,(result.array.length)?result.array[0].length:0];
		return result;
	}

    static isThis(obj: any): boolean {
        return 'array' in obj;
    }

	static isRange(obj: any): boolean {
		return 'start' in obj;
	}

    static mat_0x0(): MultiArray {
        return new MultiArray([0,0]);
    }

    static arrayEqual(left: Array<number>,right: Array<number>): boolean {
        return !(left<right || left>right);
    }

    static isSameDim(left: MultiArray, right: MultiArray){
        return !(left.dim<right.dim || left.dim>right.dim);
    }

    static number2matrix1x1(value: ComplexDecimal | MultiArray) {
        if ('array' in value) {
            return value;
        }
        else if ('re' in value) {
            let result = new MultiArray([1,1]);
            result.array[0]=[value];
            return result;
//            return new MultiArray([1,1],value)
        }
    }

    static clone(M: MultiArray): MultiArray {
        var result = new MultiArray(M.dim);
        for (var i=0;i<M.dim[0];i++) {
            result.array[i] = new Array(M.dim[1]);
            for (var j=0;j<M.dim[1];j++){
                result.array[i][j]=Object.assign({},M.array[i][j]);
            }
        }
        return result;
    }
    
    static map(M: MultiArray,f: Function): MultiArray {
        var result = new MultiArray(M.dim.slice())
        for (var i=0;i<M.dim[0];i++) {
            result.array[i]=M.array[i].map(f as any);
        }
        return result;
    }
    
    static expandRange(startNode: ComplexDecimal, stopNode:  ComplexDecimal, strideNode?: ComplexDecimal | null): MultiArray {
        var temp = new Array();
        var s = (strideNode) ? strideNode.re.toNumber() : 1;
        for (var n=startNode.re.toNumber(), i=0; n<=stopNode.re.toNumber(); n+=s, i++) {
            temp[i] = new ComplexDecimal(n,0);
        }
        let result = new MultiArray([1,temp.length]);
        result.array=[temp];
        return result;
    }
    
    static testIndex(k: ComplexDecimal, bound: number, matrix: MultiArray, input: string): number {
        if (!k.re.isInteger() || !k.re.gte(1)) throw new Error(input+": subscripts must be either integers greater than or equal 1 or logicals");
        if (!k.im.eq(0)) throw new Error(input+": subscripts must be real");
        let result = k.re.toNumber()-1;
        if (result>=bound) {
            throw new Error(input+": out of bound "+bound+" (dimensions are "+matrix.dim[0]+"x"+matrix.dim[1]+")");
        }
        return result;
    }

    static oneRowToDim(M: Array<ComplexDecimal> | MultiArray): Array<number> {
        if (Array.isArray(M)){
            let result = [];
            for (let i=0;i<M.length;i++){
                result[i] = M[i].re.toNumber();
            }
            return result;
        }
        else {
            let result = [];
            for (let i=0;i<M.array[0].length;i++){
                result[i] = M.array[0][i].re.toNumber();
            }
            return result;
        }
    }

    static subMatrix(temp: MultiArray, id: string, argumentsList: Array<any>): any {
        if (argumentsList.length==1) {
            // single value indexing
            if ('array' in argumentsList[0]) {
                let result = new MultiArray(argumentsList[0].dim.slice(0,2))
                for (let i=0;i<argumentsList[0].dim[0];i++) {
                    result.array[i]=new Array(argumentsList[0].dim[1]);
                    for(let j=0;j<argumentsList[0].dim[1];j++) {
                        let n = MultiArray.testIndex(argumentsList[0].array[i][j],temp.dim[0]*temp.dim[1],temp,id+"("+argumentsList[0].array[i][j].re.toNumber()+")");
                        result.array[i][j]=temp.array[n%temp.dim[1]][Math.floor(n/temp.dim[1])];
                    }
                }
                return result;
            }
            else {
                let n = MultiArray.testIndex(argumentsList[0],temp.dim[0]*temp.dim[1],temp,id+"("+argumentsList[0].re.toNumber()+")")
                return temp.array[n%temp.dim[1]][Math.floor(n/temp.dim[1])];
            }
        }
        else if (argumentsList.length==2) {
            // double value indexing
            argumentsList[0]=MultiArray.number2matrix1x1(argumentsList[0]);
            argumentsList[1]=MultiArray.number2matrix1x1(argumentsList[1]);
            let rows = argumentsList[0].dim[0]*argumentsList[0].dim[1];
            let cols = argumentsList[1].dim[0]*argumentsList[1].dim[1];
            let result = new MultiArray([rows,cols]);
            let s=0;
            for (let j=0;j<argumentsList[0].dim[1];j++) {
                for (let i=0;i<argumentsList[0].dim[0];i++){
                    let p = MultiArray.testIndex(argumentsList[0].array[i][j],temp.dim[0],temp,id+"("+argumentsList[0].array[i][j].re.toNumber()+",_)");
                    for (let n=0;n<argumentsList[1].dim[1];n++) {
                        for (let m=0;m<argumentsList[1].dim[0];m++){
                            let q = MultiArray.testIndex(argumentsList[1].array[m][n],temp.dim[1],temp,id+"(_,"+argumentsList[1].array[m][n].re.toNumber()+")");
                            if (!(s%cols)){
                                result.array[Math.floor(s/cols)]=new Array(cols);
                            }
                            result.array[Math.floor(s/cols)][s%cols]=temp.array[p][q]
                            s++;
                        }
                    }
                }
            }
            if ((result.dim[0]==1) && (result.dim[1]==1)) {
                return result.array[0][0];
            }
            else {
                return result;
            }
        }
        else {
            throw new Error(id+"(_,_,...): out of bounds (dimensions are "+temp.dim[0]+"x"+temp.dim[1]+")");
        }
    }

    static mul(left: MultiArray, right: MultiArray): MultiArray {
		if (left.dim[1]==right.dim[0]) { //matrix multiplication
			var result = new MultiArray([left.dim[0],right.dim[1]]);
			for(var i=0;i<left.dim[0];i++) {
				result.array[i] = new Array(right.dim[1]).fill(ComplexDecimal.zero());
				for(var j=0;j<right.dim[1];j++) {
					for(var n=0;n<left.dim[1];n++) {
						result.array[i][j] = ComplexDecimal.add(
							result.array[i][j],
							ComplexDecimal.mul(
								ComplexDecimal.toThis(left.array[i][n]),
								ComplexDecimal.toThis(right.array[n][j])
							)
						);
					}
				}
			}						
			return result;
		}
		else {
			throw new Error("operator *: nonconformant arguments (op1 is "+left.dim[0]+"x"+left.dim[1]+", op2 is "+right.dim[0]+"x"+right.dim[1]+")")
		}
    }

    static scalarOpMultiArray(op: 'add' | 'sub' | 'mul' | 'rdiv' | 'ldiv' | 'pow' | 'lt' | 'lte' | 'eq' | 'gte' | 'gt' | 'ne', left: ComplexDecimal, right: MultiArray): MultiArray {
        var result = new MultiArray(right.dim);
		for (var i=0;i<result.dim[0];i++) {
			result.array[i] = new Array(result.dim[1]);
			for (var j=0;j<result.dim[1];j++) {
				result.array[i][j]=ComplexDecimal[op](left,ComplexDecimal.toThis(right.array[i][j])) as ComplexDecimal;
			}
		}
		return result;
	}

    static MultiArrayOpScalar(op: 'add' | 'sub' | 'mul' | 'rdiv' | 'ldiv' | 'pow' | 'lt' | 'lte' | 'eq' | 'gte' | 'gt' | 'ne', left: MultiArray, right: ComplexDecimal): MultiArray {
        var result = new MultiArray(left.dim);
		for (var i=0;i<result.dim[0];i++) {
			result.array[i] = new Array(result.dim[1]);
			for (var j=0;j<result.dim[1];j++) {
				result.array[i][j] = ComplexDecimal[op](ComplexDecimal.toThis(left.array[i][j]),right) as ComplexDecimal;
			}
		}
		return result;
	}

    static leftOp(op: 'clone' | 'neg', right: MultiArray): MultiArray {
        var result = new MultiArray(right.dim);
		for (var i=0;i<result.dim[0];i++) {
			result.array[i] = new Array(result.dim[1]);
			for (var j=0;j<result.dim[1];j++) {
				result.array[i][j] = ComplexDecimal[op](ComplexDecimal.toThis(right.array[i][j]));
			}
		}
		return result;
    }

    static ewiseOp(op: 'add' | 'sub' | 'mul' | 'rdiv' | 'ldiv' | 'pow' | 'lt' | 'lte' | 'eq' | 'gte' | 'gt' | 'ne', left: MultiArray, right: MultiArray): MultiArray {
		if (MultiArray.arrayEqual(left.dim.slice(0,2),right.dim.slice(0,2))) {
			// left and right has same number of rows and columns
            var result = new MultiArray(left.dim);
            for (var i=0;i<result.dim[0];i++) {
				result.array[i] = new Array(result.dim[1]);
				for (var j=0;j<result.dim[1];j++) {
					result.array[i][j]=ComplexDecimal[op](
						ComplexDecimal.toThis(left.array[i][j]),
						ComplexDecimal.toThis(right.array[i][j])
					) as ComplexDecimal;
				}
			}
			return result;
		}
		else if (left.dim[0]==right.dim[0]) {
			// left and right has same number of rows
			let col, matrix;
			if (left.dim[1]==1) {
				// left has one column
				col=left;
				matrix=right;
			}
			else if (right.dim[1]==1) {
				// right has one column
				col=right;
				matrix=left;
			}
			else {
				throw new Error("operator "+op+": nonconformant arguments (op1 is "+left.dim[0]+"x"+left.dim[1]+", op2 is "+right.dim[0]+"x"+right.dim[1]+")")
			}
            var result = new MultiArray([col.dim[0],matrix.dim[1]]);
			for (var i=0;i<col.dim[0];i++) {
				result.array[i] = new Array(matrix.dim[1]);
				for (var j=0;j<matrix.dim[1];j++) {
					result.array[i][j]=ComplexDecimal[op](
						ComplexDecimal.toThis(col.array[i][0]),
						ComplexDecimal.toThis(matrix.array[i][j])
					) as ComplexDecimal;
				}
			}
			return result;
		}
		else if (left.dim[1]==right.dim[1]) {
			// left and right has same number of columns
			let row, matrix;
			if (left.dim[0]==1) {
				// left has one row
				row=left;
				matrix=right;
			}
			else if (right.dim[0]==1) {
				// right has one row
				row=right;
				matrix=left;
			}
			else {
				throw new Error("operator "+op+": nonconformant arguments (op1 is "+left.dim[0]+"x"+left.dim[1]+", op2 is "+right.dim[0]+"x"+right.dim[1]+")")
			}
            var result = new MultiArray([matrix.dim[0],row.dim[1]]);
			for (var i=0;i<matrix.dim[0];i++) {
				result.array[i] = new Array(row.dim[1]);
				for (var j=0;j<row.dim[1];j++) {
					result.array[i][j]=ComplexDecimal[op](
						ComplexDecimal.toThis(row.array[0][j]),
						ComplexDecimal.toThis(matrix.array[i][j])
					) as ComplexDecimal;
				}
			}
			return result;
		}
		else if (left.dim[0]==1 && right.dim[1]==1) {
			// left has one row and right has one column
            var result = new MultiArray([right.dim[0],left.dim[1]]);
			for (var i=0;i<right.dim[0];i++) {
				result.array[i] = new Array(left.dim[1]);
				for (var j=0;j<left.dim[1];j++) {
					result.array[i][j]=ComplexDecimal[op](
						ComplexDecimal.toThis(left.array[0][j]),
						ComplexDecimal.toThis(right.array[i][0])
					) as ComplexDecimal;
				}
			}
			return result;
		}
		else if (left.dim[1]==1 && right.dim[0]==1) {
			// left has one column and right has one row
            var result = new MultiArray([left.dim[0],right.dim[1]]);
			for (var i=0;i<left.dim[0];i++) {
				result.array[i] = new Array(right.dim[1]);
				for (var j=0;j<right.dim[1];j++) {
					result.array[i][j]=ComplexDecimal[op](
						ComplexDecimal.toThis(left.array[i][0]),
						ComplexDecimal.toThis(right.array[0][j])
					) as ComplexDecimal;
				}
			}
			return result;
		}
		else {
			throw new Error("operator "+op+": nonconformant arguments (op1 is "+left.dim[0]+"x"+left.dim[1]+", op2 is "+right.dim[0]+"x"+right.dim[1]+")")
		}
    }

    static inv(M: MultiArray): MultiArray {
		// Returns the inverse of matrix `M`.
		// from http://blog.acipo.com/matrix-inversion-in-javascript/
		// I use Guassian Elimination to calculate the inverse:
		// (1) 'augment' the matrix (left) by the identity (on the right)
		// (2) Turn the matrix on the left into the identity by elemetry row ops
		// (3) The matrix on the right is the inverse (was the identity matrix)
		// There are 3 elemtary row ops: (I combine b and c in my code)
		// (a) Swap 2 rows
		// (b) Multiply a row by a scalar
		// (c) Add 2 rows

		//if the matrix isn't square: exit (error)
		if(M.dim[0] == M.dim[1]){

			//create the identity matrix (I), and a clone (C) of the original
			var i=0, ii=0, j=0, dim=M.dim[0], e = ComplexDecimal.zero();
			var I: Array<Array<ComplexDecimal>> = [], C: Array<Array<any>> = [];
			for(i=0; i<dim; i+=1){
				// Create the row
				I[I.length]=[];
				C[C.length]=[];
				for(j=0; j<dim; j+=1){
					//if we're on the diagonal, put a 1 (for identity)
					if(i==j){ I[i][j] = ComplexDecimal.one(); }
					else{ I[i][j] = ComplexDecimal.zero(); }
					// Also, make the clone of the original
					C[i][j] = M.array[i][j];
				}
			}

			// Perform elementary row operations
			for(i=0; i<dim; i+=1){
				// get the element e on the diagonal
				e = C[i][i];

				// if we have a 0 on the diagonal (we'll need to swap with a lower row)
				if(e.re.eq(0) && e.im.eq(0)){
					//look through every row below the i'th row
					for(ii=i+1; ii<dim; ii+=1){
						//if the ii'th row has a non-0 in the i'th col
						if((!C[ii][i].re.eq(0)) && (!C[ii][i].im.eq(0))){
							//it would make the diagonal have a non-0 so swap it
							for(j=0; j<dim; j++){
								e = C[i][j];       //temp store i'th row
								C[i][j] = C[ii][j];//replace i'th row by ii'th
								C[ii][j] = e;      //repace ii'th by temp
								e = I[i][j];       //temp store i'th row
								I[i][j] = I[ii][j];//replace i'th row by ii'th
								I[ii][j] = e;      //repace ii'th by temp
							}
							//don't bother checking other rows since we've swapped
							break;
						}
					}
					//get the new diagonal
					e = C[i][i];
					//if it's still 0, not invertable (error)
					if(e.re.eq(0) && e.im.eq(0)){
						return new MultiArray([M.dim[0],M.dim[1]],ComplexDecimal.inf_0())
					}
				}

				// Scale this row down by e (so we have a 1 on the diagonal)
				for(j=0; j<dim; j++){
					C[i][j] = ComplexDecimal.rdiv(C[i][j],e); //apply to original matrix
					I[i][j] = ComplexDecimal.rdiv(I[i][j],e); //apply to identity
				}

				// Subtract this row (scaled appropriately for each row) from ALL of
				// the other rows so that there will be 0's in this column in the
				// rows above and below this one
				for(ii=0; ii<dim; ii++){
					// Only apply to other rows (we want a 1 on the diagonal)
					if(ii==i){continue;}

					// We want to change this element to 0
					e = C[ii][i];

					// Subtract (the row above(or below) scaled by e) from (the
					// current row) but start at the i'th column and assume all the
					// stuff left of diagonal is 0 (which it should be if we made this
					// algorithm correctly)
					for(j=0; j<dim; j++){
						C[ii][j] = ComplexDecimal.sub(C[ii][j],ComplexDecimal.mul(e,C[i][j])); //apply to original matrix
						I[ii][j] = ComplexDecimal.sub(I[ii][j],ComplexDecimal.mul(e,I[i][j])); //apply to identity
					}
				}
			}

			//we've done all operations, C should be the identity
			//matrix I should be the inverse:
			let result = new MultiArray(M.dim);
			result.array = I;
			return result;
		}
		else {
			throw new Error("inverse: A must be a square matrix");
		}
    }

	static zeros(...args: any): MultiArray | ComplexDecimal {
		if (!args.length) {
			return ComplexDecimal.zero();
		}
		else if (args.length==1) {
			if ('re' in args[0]) {
				return new MultiArray([args[0].re.toNumber(),args[0].re.toNumber()],ComplexDecimal.zero());
			}
			else {
				return new MultiArray(MultiArray.oneRowToDim(args[0]),ComplexDecimal.zero());
			}
		}
		else {
			return new MultiArray(MultiArray.oneRowToDim(args),ComplexDecimal.zero());
		}
	}

	static ones(...args: any): MultiArray | ComplexDecimal {
		if (!args.length) {
			return ComplexDecimal.one();
		}
		else if (args.length==1) {
			if ('re' in args[0]) {
				return new MultiArray([args[0].re.toNumber(),args[0].re.toNumber()],ComplexDecimal.one());
			}
			else {
				return new MultiArray(MultiArray.oneRowToDim(args[0]),ComplexDecimal.one());
			}
		}
		else {
			return new MultiArray(MultiArray.oneRowToDim(args),ComplexDecimal.one());
		}
	}

	static eye(i: ComplexDecimal, j?: ComplexDecimal): MultiArray {
		if (!i.re.isInteger()) throw new Error("Invalid call to eye. Non integer number argument.");
		var temp = new MultiArray([i.re.toNumber(),j?j.re.toNumber():i.re.toNumber()],ComplexDecimal.zero());
		for(var n=0;n<Math.min(i.re.toNumber(),j?j.re.toNumber():i.re.toNumber());n++) {
			temp.array[n][n] = ComplexDecimal.one();
		}
		return temp;
	}

	static pow(left: MultiArray,right: ComplexDecimal): MultiArray {
		var temp1; // matrix power (multiple multiplication)
		if (right.re.isInteger() && right.im.eq(0)) {
			if (right.re.eq(0)) {
				temp1 = MultiArray.eye(new ComplexDecimal(left.dim[0],0));
			}
			else if (right.re.gt(0)) {
				temp1 = MultiArray.clone(left);
			}
			else {
				temp1 = MultiArray.inv(left);
			}
			if (Math.abs(right.re.toNumber())!=1) {
				var temp2 = MultiArray.clone(temp1);
				for (var i=1;i<Math.abs(right.re.toNumber());i++) {
					temp2 = MultiArray.mul(temp2,temp1);
				}
				temp1 = temp2;
			}
			return temp1;
		}
		else {
			throw new Error("exponent must be integer real in matrix '^'");
		}
	}

	static transpose(left: MultiArray): MultiArray {
		var result = new MultiArray(left.dim.slice(0,2).reverse())
		for(var i=0;i<left.dim[1];i++) {
			result.array[i]=new Array(left.dim[0]);
			for(var j=0;j<left.dim[0];j++) {
				result.array[i][j] = Object.assign({},left.array[j][i]);
			}
		}
		return result;
	}

	static ctranspose(left: MultiArray): MultiArray {
		var result = new MultiArray(left.dim.slice(0,2).reverse())
		for(var i=0;i<left.dim[1];i++) {
			result.array[i]=new Array(left.dim[0]);
			for(var j=0;j<left.dim[0];j++) {
				result.array[i][j] = ComplexDecimal.conj(left.array[j][i]);
			}
		}
		return result;
	}

	static horzcat(L: MultiArray, R: MultiArray): MultiArray {
		if (L.dim[0] == R.dim[0]) {
			var temp = new MultiArray([L.dim[0], L.dim[1] + R.dim[1]]);
			for (var i=0;i<L.dim[0];i++) {
				for (var j=0;j<L.dim[1];j++){
					temp.array[i][j]=Object.assign({},L.array[i][j]);
				}
				for (var j=0;j<R.dim[1];j++){
					temp.array[i][j+L.dim[1]]=Object.assign({},R.array[i][j]);
				}
			}
			return temp;
		}
		else {
			throw new Error("invalid dimensions in horzcat function");
		}
	}

	static vertcat(U: MultiArray, D: MultiArray): MultiArray {
		if (U.dim[1] == D.dim[1]) {
			var temp = new MultiArray([U.dim[0] + D.dim[0], U.dim[1]]);
			for (var i=0;i<U.dim[0];i++) {
				for (var j=0;j<U.dim[1];j++){
					temp.array[i][j]=Object.assign({},U.array[i][j]);
				}
			}
			for (var i=0;i<D.dim[0];i++) {
				for (var j=0;j<D.dim[1];j++){
					temp.array[i+U.dim[0]][j]=Object.assign({},D.array[i][j]);
				}
			}
			return temp;
		}
		else {
			throw new Error("invalid dimensions in vertcat function");
		}
	}

    static det(M: MultiArray): ComplexDecimal {
        if (M.dim[0] == M.dim[1]) {
            var det = ComplexDecimal.zero();
            if (M.dim[0]==1) det = M.array[0][0];
            else if (M.dim[0]==2) det = ComplexDecimal.sub(ComplexDecimal.mul(M.array[0][0],M.array[1][1]),ComplexDecimal.mul(M.array[0][1],M.array[1][0]));
            else {
                det = ComplexDecimal.zero();
                for(var j1=0;j1<M.dim[0];j1++) {
                    var m = new MultiArray([M.dim[0]-1,M.dim[0]-1],ComplexDecimal.zero());
                    for(var i=1;i<M.dim[0];i++) {
                        var j2=0;
                        for(var j=0;j<M.dim[0];j++) {
                            if(j == j1) continue;
                            m.array[i-1][j2] = M.array[i][j];
                            j2++;
                        }
                    }
                    det = ComplexDecimal.add(det,ComplexDecimal.mul(new ComplexDecimal(Math.pow(-1,2.0+j1), 0),ComplexDecimal.mul(M.array[0][j1],MultiArray.det(m))));
                }
            }
            return det;
        }
        else {
            throw new Error("det: A must be a square matrix");
        }
    }

	static trace(M: MultiArray): ComplexDecimal {
		if (M.dim[0] == M.dim[1]) {
			var temp: ComplexDecimal = ComplexDecimal.zero();
			for(var i=0;i<M.dim[0];i++) {
				temp = ComplexDecimal.add(temp,M.array[i][i]);
			}
			return temp;
		}
		else {
			throw new Error("trace: invalid dimensions");
		}
	}

	static rows(M: MultiArray): ComplexDecimal {
		return new ComplexDecimal(M.dim[0],0);
	}

	static cols(M: MultiArray): ComplexDecimal {
		return new ComplexDecimal(M.dim[1],0);
	}

	static minor(M: MultiArray, p: ComplexDecimal, q: ComplexDecimal): MultiArray {
		// minor of matrix (remove line and column)
		var temp = MultiArray.clone(M);
		temp.array.splice(p.re.toNumber()-1,1);
		for(var i=0;i<M.dim[0]-1;i++) {
			temp.array[i].splice(q.re.toNumber()-1,1);
		}
		temp.dim[0]--;
		temp.dim[1]--;
		return temp;
	}

	static cofactor(M: MultiArray): MultiArray {
		var temp = new MultiArray([M.dim[0],M.dim[1]],ComplexDecimal.zero());
		for(var i=0;i<M.dim[0];i++) {
			for(var j=0;j<M.dim[1];j++) {
				var minor=MultiArray.minor(M,new ComplexDecimal(i+1,0),new ComplexDecimal(j+1,0))
				if (((i+j)%2)==0) {
					var sign: ComplexDecimal = ComplexDecimal.one()
				}
				else {
					sign = ComplexDecimal.minusone();
				}
				temp.array[i][j] = ComplexDecimal.mul(sign,MultiArray.det(minor));
			}
		}
		return temp;
	}

	static min(M: MultiArray): ComplexDecimal {
		var DMin = Math.min(M.dim[0],M.dim[1]);
		var temp: MultiArray = M;
		var result: ComplexDecimal = M.array[0][0];
		if (!M.array[0][0].im.eq(0)) throw new Error("complex number in min function");
		if (DMin==1){
			if (DMin==M.dim[1]){
				temp = MultiArray.transpose(M);
			}
			for (var i=1;i<temp.dim[1];i++){
				if (!temp.array[0][i].im.eq(0)) throw new Error("complex number in min function");
				result = new ComplexDecimal(Decimal.min(result.re,temp.array[0][i].re), 0);
			}
			return result;
		}
		else {
			throw new Error("invalid dimensions in min function");
		}
	}

	static max(M: MultiArray): ComplexDecimal {
		var DMin = Math.min(M.dim[0],M.dim[1]);
		var temp: MultiArray = M;
		var result: ComplexDecimal = M.array[0][0];
		if (!M.array[0][0].im.eq(0)) throw new Error("complex number in max function");
		if (DMin==1){
			if (DMin==M.dim[1]){
				temp = MultiArray.transpose(M);
			}
			for (var i=1;i<temp.dim[1];i++){
				if (!temp.array[0][i].im.eq(0)) throw new Error("complex number in max function");
				result = new ComplexDecimal(Decimal.max(result.re,temp.array[0][i].re),0);
			}
			return result;
		}
		else {
			throw new Error("invalid dimensions in max function");
		}
	}

	static mean(M: MultiArray): ComplexDecimal {
		var DMin = Math.min(M.dim[0],M.dim[1]);
		var temp: MultiArray = M;
		var result: ComplexDecimal = ComplexDecimal.zero();
		if (DMin==1){
			if (DMin==M.dim[1]){
				temp = MultiArray.transpose(M);
			}
			for (var i=0;i<temp.dim[1];i++){
				result = ComplexDecimal.add(result,temp.array[0][i]);
			}
			return ComplexDecimal.rdiv(result,new ComplexDecimal(temp.dim[1],0));
		}
		else if (DMin==2){
			if (DMin==M.dim[1]){
				temp = MultiArray.transpose(M);
			}
			var denom: ComplexDecimal = ComplexDecimal.zero();
			for (var i=0;i<temp.dim[1];i++){
				result = ComplexDecimal.add(result,ComplexDecimal.mul(temp.array[0][i],temp.array[1][i]));
				denom = ComplexDecimal.add(denom,temp.array[1][i]);
			}
			return ComplexDecimal.rdiv(result,denom);
		}
		else {
			throw new Error("invalid dimensions in mean");
		}
	}

	static gauss(M: MultiArray, x: MultiArray): MultiArray | undefined {
		// Gaussian elimination algorithm for solving systems of linear equations.
		// Adapted from: https://github.com/itsravenous/gaussian-elimination
		if ((M.dim[0])!=M.dim[1]) throw new Error("invalid dimensions in function gauss");
		var A: MultiArray = MultiArray.clone(M);
		var i: number, k: number, j: number;
		var DMin = Math.min(x.dim[0],x.dim[1]);
		if (DMin==x.dim[1]){
			x = MultiArray.transpose(x);
		}

		// Just make a single matrix
		for (i=0; i < A.dim[0]; i++) { 
			A.array[i].push(x.array[0][i]);
		}
		var n = A.dim[0];

		for (i=0; i < n; i++) { 
			// Search for maximum in this column
			var maxEl = ComplexDecimal.abs(A.array[i][i]),
			maxRow = i;
			for (k=i+1; k < n; k++) { 
				if (ComplexDecimal.abs(A.array[k][i]).re.gt(maxEl.re)) {
					maxEl = ComplexDecimal.abs(A.array[k][i]);
					maxRow = k;
				}
			}

			// Swap maximum row with current row (column by column)
			for (k=i; k < n+1; k++) { 
				var tmp = A.array[maxRow][k];
				A.array[maxRow][k] = A.array[i][k];
				A.array[i][k] = tmp;
			}

			// Make all rows below this one 0 in current column
			for (k=i+1; k < n; k++) { 
				var c = ComplexDecimal.rdiv(ComplexDecimal.neg(A.array[k][i]),A.array[i][i]);
				for (j=i; j < n+1; j++) { 
					if (i===j) {
						A.array[k][j] = ComplexDecimal.zero();
					} else {
						A.array[k][j] = ComplexDecimal.add(A.array[k][j],ComplexDecimal.mul(c,A.array[i][j]));
					}
				}
			}
		}

		// Solve equation Ax=b for an upper triangular matrix A
		var x = new MultiArray([1, n],ComplexDecimal.zero());
		for (i=n-1; i > -1; i--) { 
			x.array[0][i] = ComplexDecimal.rdiv(A.array[i][n],A.array[i][i]);
			for (k=i-1; k > -1; k--) { 
				A.array[k][n] = ComplexDecimal.sub(A.array[k][n],ComplexDecimal.mul(A.array[k][i],x.array[0][i]));
			}
		}

		return x;			
	}

	static lu(M: MultiArray): any {
		var n = M.dim[0];
		var lower = new MultiArray([M.dim[0],M.dim[1]],ComplexDecimal.zero());
		var upper = new MultiArray([M.dim[0],M.dim[1]],ComplexDecimal.zero());
		// Decomposing matrix into Upper and
		// Lower triangular matrix
		for(var i = 0; i < n; i++){
			// Upper Triangular
			for(var k = i; k < n; k++){
				// Summation of L(i, j) * U(j, k)
				var sum: ComplexDecimal = ComplexDecimal.zero();
				for(var j = 0; j < i; j++){
					sum = ComplexDecimal.add(sum,ComplexDecimal.mul(lower.array[i][j],upper.array[j][k]));
				}
				// Evaluating U(i, k)
				upper.array[i][k] = ComplexDecimal.sub(M.array[i][k],sum);
			}
			// Lower Triangular
			for(var k = i; k < n; k++){
				if (i == k) {
					// Diagonal as 1
					lower.array[i][i] = ComplexDecimal.one();
				}
				else {
					// Summation of L(k, j) * U(j, i)
					var sum: ComplexDecimal = ComplexDecimal.zero();
					for(var j = 0; j < i; j++){
						sum = ComplexDecimal.add(sum,ComplexDecimal.mul(lower.array[k][j],upper.array[j][i]));
					}
					// Evaluating L(k, i)
					lower.array[k][i] = ComplexDecimal.rdiv(ComplexDecimal.sub(M.array[k][i],sum),upper.array[i][i]);
				}
			}
		}
		return EvaluatorPointer.nodeOp('*',lower,upper);
	}

	static pivot(M: MultiArray): MultiArray {
		var n = M.dim[0];
		var id = MultiArray.eye(new ComplexDecimal(n, 0));
		for (var i = 0; i < n; i++) {
			var maxm = ComplexDecimal.abs(M.array[i][i]);
			var row = i;
			for (var j = i; j < n; j++)
				if (ComplexDecimal.abs(M.array[j][i]).re.gt(maxm.re)) {
					maxm = ComplexDecimal.abs(M.array[j][i]);
					row = j;
				}
			if (i != row) {
				var tmp = id.array[i];
				id.array[i] = id.array[row];
				id.array[row] = tmp;
			}
		}
		return id;
	}

	static adj(M: MultiArray): MultiArray {
		return MultiArray.ctranspose(MultiArray.cofactor(M));
	}

	static size(X: any, DIM:any){
		if (arguments.length==1) {
			if ('re' in X) {
				return {array:[[ComplexDecimal.one(),ComplexDecimal.one()]]};
			}
			else if ('array' in X) {
				return {array:[[new ComplexDecimal(X.dim[0],0),new ComplexDecimal(X.dim[1],0)]]};
			}
		}
		else if (arguments.length==2) {
			if (('re' in DIM) && DIM.im.eq(0)) {
				if ('re' in X) {
					return ComplexDecimal.one();
				}
				else if ('array' in X) {
					if (Math.trunc(DIM.re.toNumber())==1) {
						return new ComplexDecimal(X.dim[0],0);
					}
					else if (Math.trunc(DIM.re.toNumber())==2) {
						return new ComplexDecimal(X.dim[1],0);
					}
					else if (Math.trunc(DIM.re.toNumber())>2) {
						return new ComplexDecimal(1,0)
					}
					else {
						throw new Error("size: requested dimension DIM (= "+Math.trunc(DIM.re.toNumber())+") out of range");
					}
				}
			}
			else {
				throw new Error("size: DIM must be a positive integer");
			}
		}
		else {
			throw new Error("Invalid call to size.");
		}
	}

	static sub2ind(DIMS: any, ...S: any){
		if (arguments.length>1) {
			let n = DIMS;
			return new ComplexDecimal(1,0);
		}
		else {
			throw new Error("Invalid call to sub2ind.");
		}
	}

	static ind2sub(DIMS: any, IND: any){
		if (arguments.length==2) {
			return new ComplexDecimal(1,0);
		}
		else {
			throw new Error("Invalid call to ind2sub.");
		}
	}
}

export {MultiArray,MultiArrayFunction};