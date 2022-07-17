"use strict";

class Bool {

    bool: boolean;

    constructor(...args: Array<boolean | number | string>){
        if (!args.length) {
            this.bool = false;
        }
        else {
            switch(typeof args[0]) {
                case 'boolean':
                    this.bool = args[0];
                    break;
                case 'number':
                    this.bool = Boolean(args[0]);
                    break;
                case 'string':
                    this.bool=((args[0] as string).toLowerCase().trim()=='true') || Boolean(Number(args[0]));
                    break;
            }
        }
    }

    static isThis(obj: any): boolean {
        return 'bool' in obj;
    }

    static parse(...args: Array<boolean | number | string>): Bool {
        return new Bool(args[0]);
    }

    static unparse(value: Bool){
        return String(Number(value.bool));
    }

    static unparseML(value: Bool){
        return "<mn>"+String(Number(value.bool))+"</mn>";
    }

    static false(): Bool {
        return new Bool();
    }

    static true(): Bool {
        return new Bool(true);
    }

}

export default Bool;