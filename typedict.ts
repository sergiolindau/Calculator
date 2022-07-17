import Decimal from "./decimal";

export type NodeExpr = NodeNumber | NodeBoolean | NodeString | NodeRange | NodeMatrix |  NodeInvalid | NodeName | NodeArgExpr | NodeOperation | NodeList;

export interface NodeNumber {
  re: Decimal;
  im: Decimal;
}

export interface NodeBoolean {
  bool: boolean;
}

export interface NodeString {
  str: string;
}

export interface NodeRange {
  start: NodeExpr | null;
  stop: NodeExpr | null;
  stride: NodeExpr | null;
}

export interface NodeMatrix {
  dim: Array<number>;
  array: Array<Array<NodeNumber>>;
}

export interface PrimaryNode {
	type: string;
}

export interface NodeInvalid extends PrimaryNode {
  type: "INVALID";
}

export interface NodeName extends PrimaryNode {
  type: "NAME";
  id: string;
}

export interface NodeArgExpr extends PrimaryNode {
  type: "ARG";
  expr: NodeExpr;
  args: Array<NodeExpr>;
}

export type NodeOperation = UnaryOperation | BinaryOperation;

export type UnaryOperation = UnaryOperationL | UnaryOperationR;

export interface UnaryOperationR extends PrimaryNode {
  right: NodeExpr;
}

export interface UnaryOperationL extends PrimaryNode {
  left: NodeExpr;
}

export interface BinaryOperation extends PrimaryNode {
  left: NodeExpr;
  right: NodeExpr;
}

export interface NodeList extends PrimaryNode {
  type: "ELIST";
  dim: Array<number>;
  list: Array<NodeExpr>;
}