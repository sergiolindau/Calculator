// Test MathML native suport and load MathJax if need
declare const MathJax: any;
const MathJaxLoader = {

	hasMathML: function(): boolean { // test if has native MathML support in browser
		var div: HTMLDivElement = document.createElement("div");
		div.innerHTML = "<math><mrow href='https://dummy.com'><mn>1</mn></mrow></math>";
		return !!div.querySelector(":link");
	},

	usingMathJax: false, // true if MathJax is loaded

	loadMathJax: function(): void { // load MathJax
//		usingMathJax = true;
		var script: HTMLScriptElement = document.createElement('script');
		document.head.appendChild(script);
		script.onerror = function(oError: any): void {
        	throw new URIError("MathJax at " + oError.target.src + " didn't load correctly.");
	    };
		script.onload = function(){ MathJaxLoader.usingMathJax = true; };
		//	script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"; // version 2.7.7
		script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js?config=TeX-MML-AM_CHTML";
	},

	renderMathML: function(): void { // Render MathML after load
		if (MathJaxLoader.usingMathJax) {
			//		MathJax.Hub.Typeset(); // for version 2.7.7
			MathJax.typeset();
		}
	}
}
// Load MathJax if has not native MathML support
if (!MathJaxLoader.hasMathML()) MathJaxLoader.loadMathJax();