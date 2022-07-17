rem call tyson ./parser.jison ./parser.dict.ts --out ./parser.actions.ts
rem Build parser.actions.ts complete.
call jison parser.jison -o .\parser.js > parser_conflicts.txt
type parser_conflicts.txt
echo Build parser.js complete.
pause
