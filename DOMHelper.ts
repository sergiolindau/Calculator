// DOM Helper static class
abstract class $ {         
    public static i(id: string): HTMLElement | null {
        return document.getElementById(id);
    }
    public static n(name: string): NodeListOf<HTMLElement> | null {
        return document.getElementsByName(name);
    }
    public static c(cls: string): HTMLCollectionOf<Element> | null {
        return document.getElementsByClassName(cls)
    }
    public static t(tag: string): HTMLCollectionOf<Element> | null {
        return document.getElementsByTagName(tag)
    }
    public static tn(ns: string, element: any, tag: string): HTMLCollectionOf<Element> | null {
		element = ((typeof element) == 'string') ? document.getElementById(element) : element;
		return element.getElementsByTagNameNS(ns, tag);
    }
    public static create<K extends keyof HTMLElementTagNameMap>(tag: K, parent?: string | HTMLElement | null, i?: string | null, c?: string | null, n?: string | null): HTMLElementTagNameMap[K] {
		if (arguments.length==1)
			return document.createElement(tag)
		else {
			var result = document.createElement(tag);
			if (parent) {
				if (typeof(parent) == 'string') {
					document.getElementById(parent)?.append(result);
				}
				else {
					parent.append(result)
				}
			}
			if ((arguments.length>2) && (i)) result.setAttribute('id',i);
			if ((arguments.length>3) && (c)) result.setAttribute('class',c);
			if ((arguments.length>4) && (n)) result.setAttribute('name',n);
			return result;
		}
    }
    public static addEventListener(element: HTMLElement | string, event: string, handler: Function, useCapture?: boolean): HTMLElement {
		var result: any = ((typeof element) == 'string')?document.getElementById(element as string):element;
		useCapture = (arguments.length>3) ? useCapture : false;
		result.addEventListener(event, handler, useCapture);
	    return result;
    }
	public static querySelector(selectors: string): HTMLElement | null {
		return document.querySelector(selectors);
	}
	public static cleanHTML(element: HTMLElement | string): HTMLElement | null {
		var result: any = ((typeof element) == 'string')?document.getElementById(element as string):element;
		result.innerHTML = "";
        return result;
	}
	public static uid(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    public static createStyle(innerHTML?: string): HTMLStyleElement {
		var newStyle: HTMLStyleElement = document.createElement('style');
		document.head.appendChild(newStyle);
		if (innerHTML) newStyle.innerHTML = innerHTML;
		return newStyle;
    }
    public static loadURIError(oError: any): void {
        throw new URIError("The file " + oError.target.src + " didn't load correctly.");
    }
    public static prefixScript(url: string, onloadFunction?: ((this: GlobalEventHandlers, ev: Event) => any) | null): HTMLScriptElement {
        var newScript: HTMLScriptElement = document.createElement('script');
        newScript.onerror = this.loadURIError;
        if (onloadFunction) { newScript.onload = onloadFunction; }
        document.currentScript?.parentNode?.insertBefore(newScript, document.currentScript);
		newScript.type = 'text/javascript';
        newScript.src = url;
		return newScript;
      }
    public static  affixScriptToHead(url: string, onloadFunction?: ((this: GlobalEventHandlers, ev: Event) => any) | null): HTMLScriptElement {
        var newScript: HTMLScriptElement = document.createElement('script');
        newScript.onerror = this.loadURIError;
        if (onloadFunction) { newScript.onload = onloadFunction; }
        document.head.appendChild(newScript);
		newScript.type = 'text/javascript';
        newScript.src = url;
		return newScript;
    }
	public static affixStylesheetToHead(url: string, onloadFunction?: ((this: GlobalEventHandlers, ev: Event) => any) | null): HTMLLinkElement {
	    var newLink: HTMLLinkElement  = document.createElement('link');
        newLink.onerror = this.loadURIError;
        if (onloadFunction) { newLink.onload = onloadFunction; }
	    document.head.appendChild(newLink);
	    newLink.rel  = 'stylesheet';
	    newLink.type = 'text/css';
	    newLink.media = 'all';
	    newLink.href = url;
		return newLink;
	}
	/**
	 * This function loads a script file with promise
	 * @param scriptUrl 
	 * @returns 
	 * Usage:
	 * const event = loaderScript("myscript.js")
  	 * .then(() => { console.log("loaded"); })
  	 * .catch(() => { console.log("error"); });
	 * 
	 * OR
	 * 
	 * try{
 	 * await loaderScript("myscript.js")
 	 * console.log("loaded"); 
	 * }catch{
 	 * console.log("error");
	 * }
	 * 
	 */
	public static loaderScript(scriptUrl: string){
		return new Promise(function (res, rej) {
			let script = document.createElement('script');
			script.src = scriptUrl;
			script.type = 'text/javascript';
			script.async = true;
			script.onerror = rej;
			script.onload = res;
			script.addEventListener('error',rej);
			script.addEventListener('load',res);
			document.head.appendChild(script);
		})
	 
	}
    public static select = {
		addOptions : function(sel: any, opt: Array<string>): void {
			if ((typeof sel) == 'string') sel = document.getElementById(sel);
			var option;
			for (var i=0;i<opt.length;i++) {
				option = document.createElement('option');
				option.text = opt[i];
				sel.add(option);
			}
		}
	};
}