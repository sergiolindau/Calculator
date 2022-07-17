"use strict";
const MathJaxLoader = {
    hasMathML: function () {
        var div = document.createElement("div");
        div.innerHTML = "<math><mrow href='https://dummy.com'><mn>1</mn></mrow></math>";
        return !!div.querySelector(":link");
    },
    usingMathJax: false,
    loadMathJax: function () {
        //		usingMathJax = true;
        var script = document.createElement('script');
        document.head.appendChild(script);
        script.onerror = function (oError) {
            throw new URIError("MathJax at " + oError.target.src + " didn't load correctly.");
        };
        script.onload = function () { MathJaxLoader.usingMathJax = true; };
        //	script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"; // version 2.7.7
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js?config=TeX-MML-AM_CHTML";
    },
    renderMathML: function () {
        if (MathJaxLoader.usingMathJax) {
            //		MathJax.Hub.Typeset(); // for version 2.7.7
            MathJax.typeset();
        }
    }
};
// Load MathJax if has not native MathML support
if (!MathJaxLoader.hasMathML())
    MathJaxLoader.loadMathJax();
