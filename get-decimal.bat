@echo off
rem https://mikemcl.github.io/decimal.js/
if not exist .\decimal.js (
powershell -command "& { iwr https://raw.githubusercontent.com/MikeMcl/decimal.js/master/decimal.js -OutFile .\decimal.js }"
rem echo export default Decimal; >> .\decimal.js
echo Download decimal.js complete.
)
if not exist .\decimal.d.ts (
powershell -command "& { iwr https://raw.githubusercontent.com/MikeMcl/decimal.js/master/decimal.d.ts -OutFile .\decimal.d.ts }"
echo Download decimal.d.ts complete.
)