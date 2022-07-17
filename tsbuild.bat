@echo off
rem del parser.actions.ts
call tsc -p tsconfig.json
del parser.dict.js
del typedict.js

powershell -command "(gc Bool.js) -replace 'import', '//import' | Out-File -encoding default Bool.js"
powershell -command "(gc Bool.js) -replace 'export', '//export' | Out-File -encoding default Bool.js"

powershell -command "(gc CharString.js) -replace 'import', '//import' | Out-File -encoding default CharString.js"
powershell -command "(gc CharString.js) -replace 'export', '//export' | Out-File -encoding default CharString.js"

powershell -command "(gc ComplexDecimal.js) -replace 'import', '//import' | Out-File -encoding default ComplexDecimal.js"
powershell -command "(gc ComplexDecimal.js) -replace 'export', '//export' | Out-File -encoding default ComplexDecimal.js"

powershell -command "(gc MultiArray.js) -replace 'import', '//import' | Out-File -encoding default MultiArray.js"
powershell -command "(gc MultiArray.js) -replace 'export', '//export' | Out-File -encoding default MultiArray.js"

powershell -command "(gc Tensor.js) -replace 'import', '//import' | Out-File -encoding default Tensor.js"
powershell -command "(gc Tensor.js) -replace 'export', '//export' | Out-File -encoding default Tensor.js"

powershell -command "(gc Evaluator.js) -replace 'import', '//import' | Out-File -encoding default Evaluator.js"
powershell -command "(gc Evaluator.js) -replace 'export', '//export' | Out-File -encoding default Evaluator.js"

powershell -command "(gc EvaluatorSetup.js) -replace 'import', '//import' | Out-File -encoding default EvaluatorSetup.js"
powershell -command "(gc EvaluatorSetup.js) -replace 'export', '//export' | Out-File -encoding default EvaluatorSetup.js"

powershell -command "(gc evalPrompt.js) -replace 'import', '//import' | Out-File -encoding default evalPrompt.js"

powershell -command "(gc helpTable.js) -replace 'export', '//export' | Out-File -encoding default helpTable.js"


echo Build ^*.ts =^> ^*.js complete.
pause