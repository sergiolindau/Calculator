//import Bool from "./Bool.js";
//import Decimal from "./decimal.js";
"use strict";
const DecimalPrecision = 336; // to correct rounding of trigonometric functions
const DecimaltoExpPos = 20;
const DecimaltoExpNeg = -7;
const MachinePrecision = { MaxInt: 1.7976931348623158e308, Epsilon: 5e-324 };
const ComplexDecimalMapFunction = [
    'abs',
    'arg',
    'conj',
    'fix',
    'ceil',
    'floor',
    'round',
    'sign',
    'sqrt',
    'exp',
    'log',
    'log10',
    'sin',
    'cos',
    'tan',
    'csc',
    'sec',
    'cot',
    'asin',
    'acos',
    'atan',
    'acsc',
    'asec',
    'acot',
    'sinh',
    'cosh',
    'tanh',
    'csch',
    'sech',
    'coth',
    'asinh',
    'acosh',
    'atanh',
    'acsch',
    'asech',
    'acoth',
    'gamma',
    'factorial'
];
const ComplexDecimal2ArgFunction = [
    'root',
    'pow',
    'logbl'
];
class ComplexDecimal {
    constructor(real, imaginary) {
        this.re = new Decimal(real);
        this.im = new Decimal(imaginary);
    }
    static set(config) {
        if (config) {
            Decimal.set(config);
        }
        else {
            Decimal.set({ precision: DecimalPrecision, rounding: Decimal.ROUND_HALF_DOWN, toExpNeg: DecimaltoExpNeg, toExpPos: DecimaltoExpPos });
        }
    }
    static newThis(real, imaginary) {
        return new ComplexDecimal(real, imaginary);
    }
    static isThis(obj) {
        return 're' in obj;
    }
    static toThis(value) {
        if ('bool' in value) {
            return new ComplexDecimal(Number(value.bool), 0);
        }
        else {
            return value;
        }
    }
    static boolToThis(value) {
        return new ComplexDecimal(Number(value.bool), 0);
    }
    static parse(value) {
        let num = value.toLowerCase().replace("d", "e");
        if ((num[num.length - 1] == "i") || (num[num.length - 1] == "j")) {
            return new ComplexDecimal(0, num.substring(0, num.length - 1));
        }
        else {
            return new ComplexDecimal(num, 0);
        }
    }
    static unparseDecimal(value) {
        if (value.isFinite()) {
            let value_unparsed = value.toString().split('e');
            if (value_unparsed.length == 1) {
                return value_unparsed[0].slice(0, Decimal.toExpPos);
            }
            else {
                return value_unparsed[0].slice(0, Decimal.toExpPos) + 'e' + Number(value_unparsed[1]);
            }
        }
        else {
            return value.isNaN() ? "NaN" : ((value.isNegative() ? "-" : "") + "&infin;");
        }
    }
    static unparse(value) {
        let value_prec = ComplexDecimal.toMaxPrecision(value);
        if (!value_prec.re.eq(0) && !value_prec.im.eq(0)) {
            return "(" + ComplexDecimal.unparseDecimal(value_prec.re) + (value_prec.im.gt(0) ? "+" : "") + (!value_prec.im.eq(1) ? (!value_prec.im.eq(-1) ? ComplexDecimal.unparseDecimal(value_prec.im) : "-") : "") + "i)";
        }
        else if (!value_prec.re.eq(0)) {
            return ComplexDecimal.unparseDecimal(value_prec.re);
        }
        else if (!value_prec.im.eq(0)) {
            return (!value_prec.im.eq(1) ? (!value_prec.im.eq(-1) ? ComplexDecimal.unparseDecimal(value_prec.im) : "-") : "") + "i";
        }
        else {
            return "0";
        }
    }
    static unparseDecimalML(value) {
        if (value.isFinite()) {
            let value_unparsed = value.toString().split('e');
            if (value_unparsed.length == 1) {
                return "<mn>" + value_unparsed[0].slice(0, Decimal.toExpPos) + "</mn>";
            }
            else {
                return "<mn>" + value_unparsed[0].slice(0, Decimal.toExpPos) + "</mn><mo>&sdot;</mo><msup><mrow><mn>10</mn></mrow><mrow><mn>" + Number(value_unparsed[1]) + "</mn></mrow></msup>";
            }
        }
        else {
            return value.isNaN() ? "<mi>NaN</mi>" : ((value.isNegative() ? "<mo>-</mo>" : "") + "<mi>&infin;</mi>");
        }
    }
    static unparseML(value) {
        let value_prec = ComplexDecimal.toMaxPrecision(value);
        if (!value_prec.re.eq(0) && !value_prec.im.eq(0)) {
            return "<mo>(</mo>" + ComplexDecimal.unparseDecimalML(value_prec.re) + (value_prec.im.gt(0) ? "<mo>+</mo>" : "") + (!value_prec.im.eq(1) ? (!value_prec.im.eq(-1) ? ComplexDecimal.unparseDecimalML(value_prec.im) : "<mo>-</mo>") : "") + "<mi>i</mi><mo>)</mo>";
        }
        else if (!value.re.eq(0)) {
            return ComplexDecimal.unparseDecimalML(value_prec.re);
        }
        else if (!value_prec.im.eq(0)) {
            return (!value_prec.im.eq(1) ? (!value_prec.im.eq(-1) ? ComplexDecimal.unparseDecimalML(value_prec.im) : "<mo>-</mo>") : "") + "<mi>i</mi>";
        }
        else {
            return "<mn>0</mn>";
        }
    }
    static clone(value) {
        return new ComplexDecimal(value.re, value.im);
    }
    static toMaxPrecisionDecimal(value) {
        return value.toSignificantDigits(Decimal.precision - 7).toDecimalPlaces(Decimal.precision - 7);
    }
    static toMaxPrecision(value) {
        return new ComplexDecimal(value.re.toSignificantDigits(Decimal.precision - 7).toDecimalPlaces(Decimal.precision - 7), value.im.toSignificantDigits(Decimal.precision - 7).toDecimalPlaces(Decimal.precision - 7));
    }
    static epsilonDecimal() {
        return Decimal.pow(10, -Decimal.precision + 7);
    }
    static epsilon() {
        return new ComplexDecimal(Decimal.pow(10, -Decimal.precision + 7), 0);
    }
    static eq(left, right) {
        let left_prec = ComplexDecimal.toMaxPrecision(left);
        let right_prec = ComplexDecimal.toMaxPrecision(right);
        return (left_prec.re.eq(right_prec.re) && left_prec.im.eq(right_prec.im)) ? Bool.true() : Bool.false();
    }
    static ne(left, right) {
        let left_prec = ComplexDecimal.toMaxPrecision(left);
        let right_prec = ComplexDecimal.toMaxPrecision(right);
        return (!left_prec.re.eq(right_prec.re) || !left_prec.im.eq(right_prec.im)) ? Bool.true() : Bool.false();
    }
    static cmp(cmp, left, right) {
        // Comparisons made in polar lexicographical ordering
        // (ordered by absolute value, or by polar angle in (-pi,pi] when absolute values are equal)
        let left_prec = ComplexDecimal.toMaxPrecision(left);
        let right_prec = ComplexDecimal.toMaxPrecision(right);
        if (left_prec.im.eq(0) && right_prec.im.eq(0)) {
            return left_prec.re[cmp](right_prec.re);
        }
        let left_abs = ComplexDecimal.toMaxPrecisionDecimal(ComplexDecimal.abs(left).re);
        let right_abs = ComplexDecimal.toMaxPrecisionDecimal(ComplexDecimal.abs(right).re);
        if (!left_abs.eq(right_abs)) {
            return left_abs[cmp](right_abs);
        }
        else {
            return ComplexDecimal.toMaxPrecisionDecimal(ComplexDecimal.arg(left).re)[cmp](ComplexDecimal.toMaxPrecisionDecimal(ComplexDecimal.arg(right).re));
        }
    }
    static lt(left, right) {
        return ComplexDecimal.cmp('lt', left, right) ? Bool.true() : Bool.false();
    }
    static lte(left, right) {
        return ComplexDecimal.cmp('lte', left, right) ? Bool.true() : Bool.false();
    }
    static gte(left, right) {
        return ComplexDecimal.cmp('gte', left, right) ? Bool.true() : Bool.false();
    }
    static gt(left, right) {
        return ComplexDecimal.cmp('gt', left, right) ? Bool.true() : Bool.false();
    }
    static zero() {
        return new ComplexDecimal(0, 0);
    }
    static one() {
        return new ComplexDecimal(1, 0);
    }
    static onediv2() {
        return new ComplexDecimal(1 / 2, 0);
    }
    static minusonediv2() {
        return new ComplexDecimal(-1 / 2, 0);
    }
    static minusone() {
        return new ComplexDecimal(-1, 0);
    }
    static pi() {
        return new ComplexDecimal(Decimal.acos(-1), 0);
    }
    static pidiv2() {
        return new ComplexDecimal(Decimal.div(Decimal.acos(-1), 2), 0);
    }
    static onei() {
        return new ComplexDecimal(0, 1);
    }
    static onediv2i() {
        return new ComplexDecimal(0, 1 / 2);
    }
    static minusonediv2i() {
        return new ComplexDecimal(0, -1 / 2);
    }
    static minusonei() {
        return new ComplexDecimal(0, -1);
    }
    static two() {
        return new ComplexDecimal(2, 0);
    }
    static sqrt2pi() {
        return new ComplexDecimal(Decimal.sqrt(Decimal.mul(2, Decimal.acos(-1))), 0);
    }
    static e() {
        return new ComplexDecimal(Decimal.exp(1), 0);
    }
    static NaN_0() {
        return new ComplexDecimal(NaN, 0);
    }
    static inf_0() {
        return new ComplexDecimal(Infinity, 0);
    }
    static add(left, right) {
        return new ComplexDecimal(Decimal.add(left.re, right.re), Decimal.add(left.im, right.im));
    }
    static sub(left, right) {
        return new ComplexDecimal(Decimal.sub(left.re, right.re), Decimal.sub(left.im, right.im));
    }
    static neg(z) {
        return new ComplexDecimal(z.re.neg(), z.im.neg());
    }
    static mul(left, right) {
        if (left.im.eq(0) && right.im.eq(0)) {
            return new ComplexDecimal(Decimal.mul(left.re, right.re), new Decimal(0));
        }
        else {
            return new ComplexDecimal(Decimal.sub(Decimal.mul(left.re, right.re), Decimal.mul(left.im, right.im)), Decimal.add(Decimal.mul(left.re, right.im), Decimal.mul(left.im, right.re)));
        }
    }
    static rdiv(left, right) {
        let denom = Decimal.add(Decimal.mul(right.re, right.re), Decimal.mul(right.im, right.im));
        if (denom.isFinite()) {
            if (denom.eq(0)) {
                return new ComplexDecimal(Decimal.mul(left.re, Infinity), left.im.eq(0) ? (new Decimal(0)) : Decimal.mul(left.im, Infinity));
            }
            else {
                return new ComplexDecimal(Decimal.div(Decimal.add(Decimal.mul(left.re, right.re), Decimal.mul(left.im, right.im)), denom), Decimal.div(Decimal.sub(Decimal.mul(left.im, right.re), Decimal.mul(left.re, right.im)), denom));
            }
        }
        else {
            if (denom.isNaN()) {
                if ((!right.re.isFinite() && !right.re.isNaN()) || (!right.im.isFinite() && !right.im.isNaN())) {
                    return ComplexDecimal.zero();
                }
                else {
                    return new ComplexDecimal(NaN, 0);
                }
            }
            else if (left.re.isFinite() && left.im.isFinite()) {
                return ComplexDecimal.zero();
            }
            else {
                return new ComplexDecimal(NaN, 0);
            }
        }
    }
    static inv(right) {
        //        return ComplexDecimal.rdiv(ComplexDecimal.one(),right);
        let denom = Decimal.add(Decimal.mul(right.re, right.re), Decimal.mul(right.im, right.im));
        if (denom.isFinite()) {
            if (denom.eq(0)) {
                return new ComplexDecimal(Infinity, 0);
            }
            else {
                return new ComplexDecimal(Decimal.div(right.re, denom), Decimal.div(right.im, denom).neg());
            }
        }
        else {
            if (denom.isNaN()) {
                if ((!right.re.isFinite() && !right.re.isNaN()) || (!right.im.isFinite() && !right.im.isNaN())) {
                    return ComplexDecimal.zero();
                }
                else {
                    return new ComplexDecimal(NaN, 0);
                }
            }
            else {
                return ComplexDecimal.zero();
            }
        }
    }
    static ldiv(left, right) {
        return ComplexDecimal.rdiv(right, left);
    }
    static pow(left, right) {
        if (left.im.eq(0) && right.im.eq(0) && left.re.gte(0)) {
            return new ComplexDecimal(Decimal.pow(left.re, right.re), new Decimal(0));
        }
        else {
            let arg_left = Decimal.atan2(left.im.eq(0) ? 0 : left.im, left.re.eq(0) ? 0 : left.re);
            let mod2_left = Decimal.add(Decimal.mul(left.re, left.re), Decimal.mul(left.im, left.im));
            let mul = Decimal.mul(Decimal.pow(mod2_left, Decimal.div(right.re, 2)), Decimal.exp(Decimal.mul(Decimal.mul(-1, right.im), arg_left)));
            let trig = Decimal.add(Decimal.mul(right.re, arg_left), Decimal.mul(Decimal.div(right.im, 2), Decimal.ln(mod2_left)));
            return new ComplexDecimal(Decimal.mul(mul, Decimal.cos(trig)), (left.im.eq(0) && right.im.eq(0) && (right.re.gte(1) || right.re.lte(-1))) ? 0 : Decimal.mul(mul, Decimal.sin(trig)));
        }
    }
    static root(x, y) {
        return ComplexDecimal.pow(x, ComplexDecimal.rdiv(ComplexDecimal.one(), y));
        ;
    }
    static abs(z) {
        return z.im.eq(0) ?
            new ComplexDecimal(Decimal.abs(z.re), 0) :
            new ComplexDecimal(Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im))), 0);
    }
    static arg(z) {
        return new ComplexDecimal(Decimal.atan2(z.im.eq(0) ? 0 : z.im, z.re) /*test if imaginary part is 0 to change -0 to 0*/, 0);
    }
    static conj(z) {
        return new ComplexDecimal(new Decimal(z.re), z.im.neg());
    }
    static fix(z) {
        return new ComplexDecimal(Decimal.trunc(z.re), Decimal.trunc(z.im));
    }
    static ceil(z) {
        return new ComplexDecimal(Decimal.ceil(z.re), Decimal.ceil(z.im));
    }
    static floor(z) {
        return new ComplexDecimal(Decimal.floor(z.re), Decimal.floor(z.im));
    }
    static round(z) {
        return new ComplexDecimal(Decimal.round(z.re), Decimal.round(z.im));
    }
    static sign(z) {
        if (z.re.eq(0)) {
            if (z.im.eq(0)) {
                return ComplexDecimal.zero();
            }
            else {
                return new ComplexDecimal(0, Decimal.div(z.im, Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im)))));
            }
        }
        else {
            if (z.im.eq(0)) {
                return new ComplexDecimal(Decimal.div(z.re, Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im)))), 0);
            }
            else {
                return new ComplexDecimal(Decimal.div(z.re, Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im)))), Decimal.div(z.im, Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im)))));
            }
        }
    }
    static sqrt(z) {
        let mod_z = Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im)));
        let arg_z = Decimal.atan2(z.im.eq(0) ? 0 : z.im, z.re);
        return new ComplexDecimal(Decimal.mul(Decimal.sqrt(mod_z), Decimal.cos(Decimal.div(arg_z, 2))), Decimal.mul(Decimal.sqrt(mod_z), Decimal.sin(Decimal.div(arg_z, 2))));
    }
    static exp(z) {
        return new ComplexDecimal(Decimal.mul(Decimal.exp(z.re), Decimal.cos(z.im)), Decimal.mul(Decimal.exp(z.re), Decimal.sin(z.im)));
    }
    static log(z) {
        return new ComplexDecimal(Decimal.ln(Decimal.sqrt(Decimal.add(Decimal.mul(z.re, z.re), Decimal.mul(z.im, z.im)))), Decimal.atan2(z.im.eq(0) ? 0 : z.im, z.re));
    }
    static logbl(b, l) {
        let mod_b = Decimal.sqrt(Decimal.add(Decimal.mul(b.re, b.re), Decimal.mul(b.im, b.im)));
        if (mod_b.eq(0)) {
            return ComplexDecimal.zero();
        }
        else {
            let arg_b = Decimal.atan2(b.im.eq(0) ? 0 : b.im, b.re);
            let mod_l = Decimal.sqrt(Decimal.add(Decimal.mul(l.re, l.re), Decimal.mul(l.im, l.im)));
            let arg_l = Decimal.atan2(l.im.eq(0) ? 0 : l.im, l.re);
            let denom = Decimal.add(Decimal.mul(Decimal.ln(mod_b), Decimal.ln(mod_b)), Decimal.mul(arg_b, arg_b));
            return new ComplexDecimal(Decimal.div(Decimal.add(Decimal.mul(Decimal.ln(mod_l), Decimal.ln(mod_b)), Decimal.mul(arg_l, arg_b)), denom), Decimal.div(Decimal.sub(Decimal.mul(arg_l, Decimal.ln(mod_b)), Decimal.mul(Decimal.ln(mod_l), arg_b)), denom));
        }
    }
    static log10(z) {
        return ComplexDecimal.logbl(new ComplexDecimal(10, 0), z);
    }
    static sin(z) {
        return new ComplexDecimal(Decimal.mul(Decimal.sin(z.re), Decimal.cosh(z.im)), Decimal.mul(Decimal.cos(z.re), Decimal.sinh(z.im)));
    }
    static cos(z) {
        return new ComplexDecimal(Decimal.mul(Decimal.cos(z.re), Decimal.cosh(z.im)), Decimal.mul(Decimal.sin(z.re), Decimal.sinh(z.im)).neg());
    }
    static tan(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.sin(z), ComplexDecimal.cos(z));
    }
    static csc(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.sin(z));
    }
    static sec(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.cos(z));
    }
    static cot(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.cos(z), ComplexDecimal.sin(z));
    }
    static asin(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.onei(), ComplexDecimal.log(ComplexDecimal.sub(ComplexDecimal.sqrt(ComplexDecimal.sub(ComplexDecimal.one(), ComplexDecimal.pow(z, ComplexDecimal.two()))), ComplexDecimal.mul(ComplexDecimal.onei(), z))));
    }
    static acos(z) {
        return ComplexDecimal.sub(ComplexDecimal.pidiv2(), ComplexDecimal.asin(z));
    }
    static atan(z) {
        return ComplexDecimal.mul(ComplexDecimal.minusonediv2i(), ComplexDecimal.log(ComplexDecimal.rdiv(ComplexDecimal.sub(ComplexDecimal.onei(), z), ComplexDecimal.add(ComplexDecimal.onei(), z))));
    }
    static acsc(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.asin(z));
    }
    static asec(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.acos(z));
    }
    static acot(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.atan(z));
    }
    static sinh(z) {
        return new ComplexDecimal(Decimal.mul(Decimal.sinh(z.re), Decimal.cos(z.im)), Decimal.mul(Decimal.cosh(z.re), Decimal.sin(z.im)));
    }
    static cosh(z) {
        return new ComplexDecimal(Decimal.mul(Decimal.cosh(z.re), Decimal.cos(z.im)), Decimal.mul(Decimal.sinh(z.re), Decimal.sin(z.im)));
    }
    static tanh(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.sinh(z), ComplexDecimal.cosh(z));
    }
    static csch(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.sinh(z));
    }
    static sech(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.cosh(z));
    }
    static coth(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.cosh(z), ComplexDecimal.sinh(z));
    }
    static asinh(z) {
        return ComplexDecimal.log(ComplexDecimal.add(ComplexDecimal.sqrt(ComplexDecimal.add(ComplexDecimal.one(), ComplexDecimal.pow(z, ComplexDecimal.two()))), z));
    }
    static acosh(z) {
        return ComplexDecimal.log(ComplexDecimal.add(ComplexDecimal.sqrt(ComplexDecimal.add(ComplexDecimal.minusone(), ComplexDecimal.pow(z, ComplexDecimal.two()))), z));
    }
    static atanh(z) {
        return ComplexDecimal.mul(ComplexDecimal.onediv2(), ComplexDecimal.log(ComplexDecimal.rdiv(ComplexDecimal.add(ComplexDecimal.one(), z), ComplexDecimal.sub(ComplexDecimal.one(), z))));
    }
    static acsch(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.asinh(z));
    }
    static asech(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.acosh(z));
    }
    static acoth(z) {
        return ComplexDecimal.rdiv(ComplexDecimal.one(), ComplexDecimal.atanh(z));
    }
    /**
     * -- gamma (Z)
     * Compute the Gamma function.
     * The Gamma function is defined as
     *                   infinity
     *                  /
     *      gamma (z) = | t^(z-1) exp (-t) dt.
     *                  /
     *               t=0
     * https://rosettacode.org/wiki/Gamma_function#JavaScript
     * https://en.wikipedia.org/wiki/Lanczos_approximation
     * https://math.stackexchange.com/questions/19236/algorithm-to-compute-gamma-function
     * https://en.wikipedia.org/wiki/Gamma_function#Stirling's_formula
     * https://mathworld.wolfram.com/GammaFunction.html
     * https://www.geeksforgeeks.org/gamma-function/
     * https://octave.org/doxygen/dev/d0/d77/gamma_8f_source.html
     * @param z
     * @returns
     */
    static gamma(z) {
        const p = [
            '0.99999999999980993',
            '676.5203681218851',
            '-1259.1392167224028',
            '771.32342877765313',
            '-176.61502916214059',
            '12.507343278686905',
            '-0.13857109526572012',
            '9.9843695780195716e-6',
            '1.5056327351493116e-7'
        ];
        if (z.re.lt(0.5)) {
            return ComplexDecimal.rdiv(ComplexDecimal.pi(), ComplexDecimal.mul(ComplexDecimal.sin(ComplexDecimal.mul(ComplexDecimal.pi(), z)), ComplexDecimal.gamma(ComplexDecimal.sub(ComplexDecimal.one(), z))));
        }
        else {
            z = ComplexDecimal.sub(z, ComplexDecimal.one());
            let x = new ComplexDecimal(p[0], 0);
            let t = ComplexDecimal.add(z, new ComplexDecimal(new Decimal(p.length - 1.5), new Decimal(0)));
            for (let i = 1; i < p.length; i++) {
                x = ComplexDecimal.add(x, ComplexDecimal.rdiv(new ComplexDecimal(p[i], 0), ComplexDecimal.add(z, new ComplexDecimal(i, 0))));
            }
            return ComplexDecimal.mul(ComplexDecimal.mul(ComplexDecimal.sqrt2pi(), ComplexDecimal.pow(t, ComplexDecimal.add(z, new ComplexDecimal(0.5, 0)))), ComplexDecimal.mul(ComplexDecimal.exp(ComplexDecimal.neg(t)), x));
        }
    }
    static factorial(x) {
        if (x.re.lt(0) || !(x.re.trunc().eq(x.re)) || !x.im.eq(0))
            throw new Error("factorial: all N must be real non-negative integers");
        let result = ComplexDecimal.gamma(ComplexDecimal.add(new ComplexDecimal(x.re.round(), 0), ComplexDecimal.one()));
        result.re = result.re.trunc();
        return result;
    }
}
ComplexDecimal.set();
//export { ComplexDecimal, ComplexDecimalMapFunction, ComplexDecimal2ArgFunction };
