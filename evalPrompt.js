/* Prompt Executor */
//import { Evaluator, EvaluatorResponse } from "./Evaluator.js";
//import { EvaluatorConfiguration } from "./EvaluatorSetup.js";
var evaluator = new Evaluator(EvaluatorConfiguration);
function evalPrompt(div, pre, input, output) {
    try {
        var tree = evaluator.Parse(input.value);
        if (tree) {
            let unparse_input = evaluator.Unparse(tree);
            let eval_input = evaluator.Evaluate(tree);
            if (evaluator.exitStatus == EvaluatorResponse.OK) {
                pre.className = "good";
                let unparse_eval_input = evaluator.Unparse(eval_input);
                if (unparse_input != unparse_eval_input) {
                    output.innerHTML = "<table><tr><td>" + evaluator.UnparseML(tree) +
                        "</td><td><math xmlns = 'http://www.w3.org/1998/Math/MathML' display='block'><mo>=</mo></math></td><td>" +
                        evaluator.UnparseML(eval_input) + "</td></tr></table>";
                }
                else {
                    output.innerHTML = "<table><tr><td>" + evaluator.UnparseML(tree) + "</td></tr></table>";
                }
                if (insertOutput != '') {
                    let uid = $.uid();
                    $.create("div", output, "o" + uid);
                    outputFunction[insertOutput]("o" + uid);
                }
                if (evaluator.debug) {
                    output.innerHTML += "<br /><br />Input   : " + JSON.stringify(tree) +
                        "<br /><br />Evaluate: " + JSON.stringify(eval_input) +
                        "<br /><br />Unparse Input   :" + unparse_input +
                        "<br /><br />Unparse Evaluate:" + unparse_eval_input;
                }
            }
            else if (evaluator.exitStatus == EvaluatorResponse.INFO) {
                pre.className = "info";
                output.innerHTML = evaluator.exitMessage;
            }
        }
    }
    catch (e) {
        pre.className = "bad";
        output.innerHTML = "<table><tr><td align='left'>" + evaluator.UnparseML(tree) + "</td></tr></table><br />" + e + (evaluator.debug ? ("<br /><br />Input   : " + JSON.stringify(tree)) : "");
        if (evaluator.debug)
            throw e;
    }
    MathJaxLoader.renderMathML();
}
