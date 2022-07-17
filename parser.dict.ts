import {NodeExpr} from "./typedict";

export interface TysonTypeDictionary {
    NUMBER: 'NUMBER';
    I: 'I';
    PLOT: string;
    NAME: string;
    EOF: string;
    INVALID: string;
    "+": "+";
    "-": "-";
    "*": "*";
    "/": "/";
    "^": "^";
    "!": "!";
    "º": "º";
    "=": "=";
    "(": "(";
    ")": ")";
    "[": "[";
    "]": "]";
    ",": ",";
  
    expressions: NodeExpr;
    e: NodeExpr;
    e_list: NodeExpr;
    mrow: NodeExpr;
    mrow_list: NodeExpr;
    cnumber: NodeExpr;
    name: NodeExpr;
    number: number;
}
  