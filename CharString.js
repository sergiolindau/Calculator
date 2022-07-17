"use strict";
class CharString {
    constructor(str) {
        this.str = str;
    }
    static isThis(obj) {
        return ('str' in obj);
    }
    static parse(str) {
        return new CharString(str);
    }
    static unparse(value) {
        return value.str;
    }
    static unparseML(value) {
        return "<mn>" + value.str + "</mn>";
    }
    static removeQuotes(value) {
        let firstchar = value.str[0];
        let lastchar = value.str[value.str.length - 1];
        if ((value.str.length >= 2) && (((firstchar === "\"") && (lastchar === "\"")) ||
            ((firstchar === "'") && (lastchar === "'")))) {
            return new CharString(value.str.substring(1, value.str.length - 1));
        }
        else {
            return value;
        }
    }
}
//export default CharString;
