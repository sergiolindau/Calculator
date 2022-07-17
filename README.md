# Scientific Calculator
> Interpreter with language syntax like MATLAB&reg;/Octave

This is a scientific calculator based on [MATLAB&reg;](https://www.mathworks.com/)/[Octave](https://www.gnu.org/software/octave/) syntax written in [Javascript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) ([Typescript](https://www.typescriptlang.org/)). It uses the [Jison](https://gerhobbelt.github.io/jison/) [parser generator](https://en.wikipedia.org/wiki/Compiler-compiler) to create an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)). It also uses the [decimal.js](https://mikemcl.github.io/decimal.js/) [API](https://en.wikipedia.org/wiki/API) to do calculations with arbitrary precision and displays the computed math expressions in a user-friendly manner ([MathML](https://www.w3.org/Math/)). To render [MathML](https://www.w3.org/Math/) in browsers without support, it uses the [MathJax](https://www.mathjax.org/) [polyfill](https://developer.mozilla.org/pt-BR/docs/Glossary/Polyfill).

The calculations can be made in a [batch processing](https://en.wikipedia.org/wiki/Batch_processing) or in an [interactive prompt](https://en.wikipedia.org/wiki/Interactive_computing).

The code in this repository is published in [lindau-calculator.netlify.app](https://lindau-calculator.netlify.app) using [Netlify](https://www.netlify.com/) hosting service.

[![Netlify Status](https://api.netlify.com/api/v1/badges/b9ac0512-d998-4217-b379-7b74b07329bb/deploy-status)](https://app.netlify.com/sites/lindau-calculator/deploys)

Get a minified version from a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network). To embed in a webpage using [jsDelivr CDN](https://www.jsdelivr.com/) copy the following HTML code:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sergiolindau/calculator/calculator.min.css" type="text/css" media="screen" charset="utf-8">
<script src='https://cdn.jsdelivr.net/gh/sergiolindau/calculator/calculator.min.js'></script>
<div id="panel"></div><script>Shell.init("panel", evalPrompt, linesArray);</script> 
```

This project is a [free software](https://en.wikipedia.org/wiki/Free_software) under the terms of [MIT License](#license).

# References

Some Math knowledge to code this project were noted in the [math.html](https://lindau-calculator.netlify.app/math.html) file.

Some links accessed to carry out this work:

## Online evaluators
* [Octave Online](https://octave-online.net/)
* [WolframAlpha](https://www.wolframalpha.com/)
* [Math Notepad](https://mathnotepad.com/)

## MATLAB&reg; References
* [MATLAB&reg; website](https://www.mathworks.com)
    * [Get Started with MATLAB&reg;](https://www.mathworks.com/help/matlab/getting-started-with-matlab.html)
    * [Language Fundamentals](https://www.mathworks.com/help/matlab/language-fundamentals.html)
        * [MATLAB&reg; Operators and Special Characters](https://www.mathworks.com/help/matlab/matlab_prog/matlab-operators-and-special-characters.html)
        * [Array vs. Matrix Operations](https://www.mathworks.com/help/matlab/matlab_prog/array-vs-matrix-operations.html)
        * [Compatible Array Sizes for Basic Operations](https://www.mathworks.com/help/matlab/matlab_prog/compatible-array-sizes-for-basic-operations.html)
        * [Creating, Concatenating, and Expanding Matrices](https://www.mathworks.com/help/matlab/math/creating-and-concatenating-matrices.html)
    * [Matrix Indexing in MATLAB&reg;](https://www.mathworks.com/company/newsletters/articles/matrix-indexing-in-matlab.html)
    * [MATLAB&reg; Central](https://www.mathworks.com/matlabcentral/)
        * [Buckinghams Pi-Theorem in MATLAB&reg;](https://www.mathworks.com/matlabcentral/fileexchange/40890-buckinghams-pi-theorem-in-matlab)
* [MATLAB&reg; at Wikipedia](https://en.wikipedia.org/wiki/MATLAB&reg;)

## Octave references
* [Octave website](https://octave.org/)
    * [GNU Octave Wiki](https://wiki.octave.org/)
    * [Octave source documentation (development version)](https://octave.org/doxygen/dev/)
        * [data.h File Reference](https://octave.org/doxygen/7.0.0/d2/dbd/data_8h.html)
        * [data.cc File Reference](https://octave.org/doxygen/7.0.0/d4/d05/data_8cc.html)
        * [help.cc File Reference](https://octave.org/doxygen/7.0.0/db/db1/help_8cc.html)
        * [sub2ind.cc File Reference](https://octave.org/doxygen/7.0.0/da/d9e/sub2ind_8cc.html)
        * [Array< T > Class Template Reference](http://octave.org/doxygen/7.0.0/d0/d26/classArray.html)
        * [Array.h File Reference](https://octave.org/doxygen/7.0.0/df/dd0/Array_8h.html)
        * [Array.cc File Reference](https://octave.org/doxygen/7.0.0/d4/d10/Array_8cc.html)
        * [mappers.cc File Reference](http://octave.org/doxygen/dev/de/ddd/mappers_8cc.html)
        * [gamma.f File Reference](https://octave.org/doxygen/dev/d0/d77/gamma_8f.html)
        * [magic.m script](https://github.com/gnu-octave/octave/blob/default/scripts/special-matrix/magic.m)
* [Octave scripts source](https://github.com/gnu-octave/octave/tree/default/scripts)
* [GNU Octave at Wikipedia](https://en.wikipedia.org/wiki/GNU_Octave)
* [Octave Forge - Extra packages for GNU Octave](https://octave.sourceforge.io/)
    * [Octave Forge Function List](https://octave.sourceforge.io/list_functions.php)
* [GNU Octave at Free Software Foundation](https://www.gnu.org/software/octave/)
* [GNU Octave (version 6.4.0) Online Manual](https://octave.org/doc/v6.4.0/index.html)
    * [18.2 Basic Matrix Functions](https://octave.org/doc/v6.4.0/Basic-Matrix-Functions.html)


## MATLAB&reg;/Octave language grammar
* [Octave lexer](https://github.com/gnu-octave/octave/blob/default/libinterp/parse-tree/lex.ll)
* [Octave parser](https://github.com/gnu-octave/octave/blob/default/libinterp/parse-tree/oct-parse.yy)
* [MATLAB&reg; parser by Tegala Sravani](https://github.com/TegalaSravani/MATLAB&reg;-PARSER)
* [The Design and Implementation of a Parser and Scanner for the MATLAB&reg; Language in the MATCH Compiler](http://www.ece.northwestern.edu/cpdc/pjoisha/MAGICA/CPDC-TR-9909-017.pdf)
* [MATLAB&reg; grammar from Grammar Zoo](https://slebok.github.io/zoo/markup/scientific/matlab/srour/extracted/index.html)
### General compiler construction information
* [IBM - Write text parsers with yacc and lex](https://developer.ibm.com/tutorials/au-lexyacc/)
* [University of Cambridge - Parsing arithmetic expressions - Bison and Flex](http://www-h.eng.cam.ac.uk/help/tpl/languages/flexbison/)
* [Wikipedia - Comparison of parser generators](https://en.wikipedia.org/wiki/Comparison_of_parser_generators)
* [A COMPACT GUIDE TO LEX  &  YACC by Tom Niemann](http://www.inf.ufrgs.br/~johann/comp/lexyacc.pdf)
* [YACC program to recognize string with grammar { a^nb^n | n≥0 }](https://www.geeksforgeeks.org/yacc-program-to-recognize-string-with-grammar-anbn-n0/)
* [Bison and Flex Assignments - Matrix Dimension Checker](https://gist.github.com/seanwu1105/ee31cd3a2ea250d6a4df9d805c341921)
* [stackoverflow - Matrix parser with Lex and Yacc](https://stackoverflow.com/questions/61716465/matrix-parser-with-lex-and-yacc)
* [stackoverflow - Where can I find a formal grammar for MATLAB?](https://stackoverflow.com/questions/9583307/where-can-i-find-a-formal-grammar-for-matlab)
* [stackoverflow - YACC grammar for arithmetic expressions, with no surrounding parentheses](https://stackoverflow.com/questions/43968490/yacc-grammar-for-arithmetic-expressions-with-no-surrounding-parentheses)
* [Unofficial page of the course "Compiladores e Intérpretes" (Compilers & Interpreters Construction) UCSE (Argentina)](https://www.angelfire.com/ar/CompiladoresUCSE/COMPILERS.html)


## Used APIs repositories
* [Jison](https://gerhobbelt.github.io/jison/)
* [decimal.js](https://mikemcl.github.io/decimal.js/)
* [MathJax](https://github.com/mathjax/MathJax)
* [Modernizr](https://modernizr.com/)
* [texinfo-js](https://aur.archlinux.org/packages/texinfo-js)
* [Marked](https://github.com/markedjs/marked)
* [CodeMirror](https://codemirror.net/)
* [archlinux user repository: texinfo-js](https://aur.archlinux.org/packages/texinfo-js)
* [itsravenous/gaussian-elimination](https://github.com/itsravenous/gaussian-elimination)

## Util Mathematics topics for project coding
### Complex Numbers
* At [Wolfram Mathworld](https://mathworld.wolfram.com/):
    * [Complex Number](https://mathworld.wolfram.com/ComplexNumber.html)
    * [Imaginary Unit](https://mathworld.wolfram.com/ImaginaryUnit.html)
    * [Complex Addition](https://mathworld.wolfram.com/ComplexAddition.html)
    * [Complex Subtraction](https://mathworld.wolfram.com/ComplexSubtraction.html)
    * [Complex Multiplication](https://mathworld.wolfram.com/ComplexMultiplication.html)
    * [Complex Division](https://mathworld.wolfram.com/ComplexDivision.html)
    * [Euler Formula](https://mathworld.wolfram.com/EulerFormula.html)
    * [Complex Modulus](https://mathworld.wolfram.com/ComplexModulus.html)
    * [Complex Argument](https://mathworld.wolfram.com/ComplexArgument.html)
    * [Complex Conjugate](https://mathworld.wolfram.com/ComplexConjugate.html)
    * [Complex Exponentiation](https://mathworld.wolfram.com/ComplexExponentiation.html)
    * [Square Root](https://mathworld.wolfram.com/SquareRoot.html)
    * [de Moivre's Identity](https://mathworld.wolfram.com/deMoivresIdentity.html)
    * [Absolute Square](https://mathworld.wolfram.com/AbsoluteSquare.html)
    * [Indeterminate](https://mathworld.wolfram.com/Indeterminate.html)
    * [Complex Infinity](https://mathworld.wolfram.com/ComplexInfinity.html)
    * [Conjugate Matrix](https://mathworld.wolfram.com/ConjugateMatrix.html)
    * [Conjugate Transpose](https://mathworld.wolfram.com/ConjugateTranspose.html)
* At [functions.wolfram.com](https://functions.wolfram.com/)
    * [ComplexInfinity](https://functions.wolfram.com/Constants/ComplexInfinity/)
    * [ComplexInfinity - language definnition](https://functions.wolfram.com/Constants/ComplexInfinity/17/01/0001/)
    * [ComplexInfinity - Symbols](https://functions.wolfram.com/Constants/ComplexInfinity/introductions/Symbols/ShowAll.html)
* [math.stackexchange.com - Why does Wolfram Alpha say that n/0 is complex infinity?](https://math.stackexchange.com/questions/1294852/why-does-wolfram-alpha-say-that-n-0-is-complex-infinity)
* At [Wikipedia](https://en.wikipedia.org/wiki/Main_Page):
    * [Complex logarithm](https://en.wikipedia.org/wiki/Complex_logarithm)
    * [Inverse trigonometric functions](https://en.wikipedia.org/wiki/Inverse_trigonometric_functions)
    * [Riemann sphere](https://en.wikipedia.org/wiki/Riemann_sphere)
    * [Directed infinity](https://en.wikipedia.org/wiki/Directed_infinity)
* At [developer.mozilla.org](https://developer.mozilla.org)
    * [isFinite](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
    * [map](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
    * [Matrix Math for the web](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web)

### Linear Algebra and Array Computing
* At [Science Direct topics](https://www.sciencedirect.com/topics/index):
    * [LU Decomposition](https://www.sciencedirect.com/topics/mathematics/lu-decomposition)
* At [Wikipedia](https://en.wikipedia.org/wiki/Main_Page):
    * [Increment and decrement operators](https://en.wikipedia.org/wiki/Increment_and_decrement_operators)
    * [Row- and column-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order)
    * [Augmented assignment](https://en.wikipedia.org/wiki/Augmented_assignment)
    * [LU decomposition](https://en.wikipedia.org/wiki/LU_decomposition)
    * [Buckingham π theorem](https://en.wikipedia.org/wiki/Buckingham_%CF%80_theorem)

## Util Javascript projects and topics for project coding
* At [developer.mozilla.org](https://developer.mozilla.org)
    * [Destructuring assignment](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
    * [Strict mode](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Strict_mode)
* [DEVMEDIA: Apresentando a biblioteca JavaScript Modernizr](https://www.devmedia.com.br/apresentando-a-biblioteca-javascript-modernizr/27376)
* [Matrix Inverse with JavaScript](https://jamesmccaffrey.wordpress.com/2020/04/24/matrix-inverse-with-javascript/)
* [Understanding Destructuring, Rest Parameters, and Spread Syntax in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript)
* [The Complete Guide to Using Arrays in JavaScript](https://betterprogramming.pub/the-complete-guide-to-using-arrays-in-javascript-c77f1abab50e)
* [LU decomposition at RosettaCode.org](https://rosettacode.org/wiki/LU_decomposition)
* [A Note on PA = LU in Javascript](https://www.codeproject.com/Articles/1203224/A-Note-on-PA-equals-LU-in-Javascript)
* [math.js](https://mathjs.org/)
* [mljs/matrix](https://github.com/mljs/matrix)
* [JaHIY/toArray.js](https://gist.github.com/JaHIY/3256397)
* [themadcreator/luqr](https://github.com/themadcreator/luqr)
* [Learning JavaScript Design Patterns](https://www.patterns.dev/posts/classic-design-patterns/)
* [infusion/complex.js - C in JavaScript at GitHub](https://github.com/infusion/Complex.js/)
* [infusion/complex.js - C in JavaScript at npm](https://www.npmjs.com/package/complex.js)
* [pilogb/jit - Complex.js](https://philogb.github.io/jit/static/v20/Docs/files/Geometry/Complex-js.html)
* [patrickroberts/complex at GitHub](https://github.com/patrickroberts/complex)
* [patrickroberts/complex at at npm](https://www.npmjs.com/package/complex-js)
* [W3Schools - Artificial Intelligence](https://www.w3schools.com/ai/default.asp)
* [W3Schools - JavaScript Tutorial](https://www.w3schools.com/js/default.asp)
* [Linear algebra libraries](http://lampx.tugraz.at/~hadley/num/ch2/2.3b.php?print)
* [geeksforgeeks.org - Determinant of a Matrix](https://www.geeksforgeeks.org/determinant-of-a-matrix/)
* [rosettacode.org - Determinant and permanent](https://rosettacode.org/wiki/Determinant_and_permanent)
* [JSMatrix project](https://mech.fsv.cvut.cz/~stransky/en/software/jsmatrix/)
* [Compreendendo a diferença entre Object.create () e new SomeFunction ()](https://qastack.com.br/programming/4166616/understanding-the-difference-between-object-create-and-new-somefunction)
* [Matrix Methods in JS](https://medium.com/@marielwerner28/matrix-methods-in-js-6331cc95daf7)
* [System of Linear Equations and Inverse Matrix With JavaScript](https://geekrodion.com/blog/linear-algebra/system)

## TensorFlow
* [TensorFlow](https://www.tensorflow.org/)
* [TensorFlow Playground](http://playground.tensorflow.org/)
* [TensorFlow - latest](https://js.tensorflow.org/api/latest/)
* [TensorFlow - Tensors and operations](https://www.tensorflow.org/js/guide/tensors_operations)
* [TensorFlow - Setup](https://www.tensorflow.org/js/tutorials/setup)
* [TensorFlow Blog - A Gentle Introduction to TensorFlow.js](https://blog.tensorflow.org/2018/04/a-gentle-introduction-to-tensorflowjs.html)
* [Visualizing training with tfjs-vis](https://storage.googleapis.com/tfjs-vis/mnist/dist/index.html)
* [TensorFlow - latest - erf](https://js.tensorflow.org/api/latest/#erf)
* [Tensorflow.js tf.erf() Function](https://www.geeksforgeeks.org/tensorflow-js-tf-erf-function/)
* [stackoverflow - tensorflow matrix multiplication](https://stackoverflow.com/questions/47739284/tensorflow-matrix-multiplication)
* [Tensorflow.js tf.complex() Function](https://www.geeksforgeeks.org/tensorflow-js-tf-complex-function/)
* [Tensorflow.js tf.complex() Function](https://medium.com/tensorflow/introducing-tensorflow-js-machine-learning-in-javascript-bf3eab376db)
* [stackoverflow - TensorFlow.js and complex datasets?](https://stackoverflow.com/questions/57376996/tensorflow-js-and-complex-datasets)
* [TensorFlow Basics: Tensor, Shape, Type, Sessions & Operators](https://www.guru99.com/tensor-tensorflow.html)

## TypeScript info
* [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
* [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* [DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)
* [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
* [Introdução a Typescript: o que é e como começar?](https://blog.geekhunter.com.br/introducao-a-typescript/)
* [TypeScript static classes](https://stackoverflow.com/questions/13212521/typescript-static-classes)
* [Importing untyped JS modules](https://github.com/Microsoft/TypeScript/issues/3019)
* [Complex TypeScript definitions made easy](https://www.stevefenton.co.uk/2013/01/complex-typescript-definitions-made-easy/)
* [Advanced TypeScript 4.2 Concepts: Classes and Types](https://www.sitepen.com/blog/advanced-typescript-concepts-classes-and-types)
* [Type Casting](https://www.typescripttutorial.net/typescript-tutorial/type-casting/)
* [www.npmjs.com/package/tyson](https://www.npmjs.com/package/tyson)
* [EcmaScript Modules: Módulos nativos no JavaScript](https://blog.da2k.com.br/2019/02/25/ecmascript-modules-modulos-nativos-no-javascript/) http server


## MathML info
* [tutorialspoint - MathML Tutorial](https://www.tutorialspoint.com/mathml/index.htm)
* [W3C Recommendation 10 April 2014 - Mathematical Markup Language (MathML) Version 3.0 2nd Edition](https://www.w3.org/TR/MathML/)
* [W3C Math Home](https://www.w3.org/Math/)
* [MDN Web Docs moz://a - Mathematical Markup Language (MathML)](https://developer.mozilla.org/en-US/docs/Web/MathML)
* [GeeksforGeeks - HTML5 | MathML Introduction](https://www.geeksforgeeks.org/html5-mathml-introduction/)

## Project Development Environment
* [Visual Studio Code website](https://code.visualstudio.com/)
    * [TypeScript in Visual Studio Code](https://code.visualstudio.com/Docs/languages/typescript)
    * [How to change execution policies to build Typescript sources in Visual Studio Code](https://docs.microsoft.com/en/powershell/module/microsoft.powershell.core/about/about_execution_policies)
* [Netlify hosting service](https://www.netlify.com/)
* [jsDelivr CDN](https://www.jsdelivr.com/)

## Code resources
* [Rosetta Code](https://rosettacode.org/)
* [GSL - GNU Scientific Library](https://www.gnu.org/software/gsl/)

# License
>MIT License
>
>Copyright &copy; 2016-2022 Sergio Lindau
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all
>copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
>SOFTWARE.
