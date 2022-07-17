@echo off
rem https://github.com/MatheusAvellar/textarea-line-numbers
if not exist tln.css (
powershell -command "& { iwr https://raw.githubusercontent.com/MatheusAvellar/textarea-line-numbers/master/tln.css -OutFile tln.css }"
echo Download tnl.css complete.
)
if not exist tln.js (
powershell -command "& { iwr https://raw.githubusercontent.com/MatheusAvellar/textarea-line-numbers/master/tln.js -OutFile tln.js }"
echo ; >> tln.js
echo Download tln.js complete.
)
