@echo off
call uglifyjs DOMHelper.js MathMLSupport.js Send.js tln.js input.js Shell.js decimal.js Bool.js CharString.js ComplexDecimal.js MultiArray.js Tensor.js plotEngine.js parser.js constantsTable.js helpTable.js substGreek.js Evaluator.js EvaluatorSetup.js evalPrompt.js -o calculator.min.js
powershell -command "(gc calculator.min.js) -replace '\"use strict\"', '' | Out-File -encoding default calculator.tmp.js"
echo "use strict;" > calculator.min.js
type calculator.tmp.js >> calculator.min.js
del calculator.tmp.js
echo Build calculator.min.js complete.

call uglifycss tln.css style.css > calculator.min.css
echo Build calculator.min.css complete.
