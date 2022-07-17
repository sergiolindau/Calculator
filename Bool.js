"use strict";
class Bool {
    constructor(...args) {
        if (!args.length) {
            this.bool = false;
        }
        else {
            switch (typeof args[0]) {
                case 'boolean':
                    this.bool = args[0];
                    break;
                case 'number':
                    this.bool = Boolean(args[0]);
                    break;
                case 'string':
                    this.bool = (args[0].toLowerCase().trim() == 'true') || Boolean(Number(args[0]));
                    break;
            }
        }
    }
    static isThis(obj) {
        return 'bool' in obj;
    }
    static parse(...args) {
        return new Bool(args[0]);
    }
    static unparse(value) {
        return String(Number(value.bool));
    }
    static unparseML(value) {
        return "<mn>" + String(Number(value.bool)) + "</mn>";
    }
    static false() {
        return new Bool();
    }
    static true() {
        return new Bool(true);
    }
}
//export default Bool;
