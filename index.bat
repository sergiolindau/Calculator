@echo off

echo ^<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"^> > index.html
echo ^<html xmlns="http://www.w3.org/1999/xhtml"^> >> index.html
type head.html >> index.html
echo: >> index.html
echo: >> index.html
echo ^<body^> >> index.html
type body.html >> index.html
echo: >> index.html
echo ^</body^> >> index.html
echo: >> index.html
echo ^</html^> >> index.html
echo Build index.html complete.