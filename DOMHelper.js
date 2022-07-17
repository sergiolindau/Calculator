"use strict";
// DOM Helper static class
class $ {
    static i(id) {
        return document.getElementById(id);
    }
    static n(name) {
        return document.getElementsByName(name);
    }
    static c(cls) {
        return document.getElementsByClassName(cls);
    }
    static t(tag) {
        return document.getElementsByTagName(tag);
    }
    static tn(ns, element, tag) {
        element = ((typeof element) == 'string') ? document.getElementById(element) : element;
        return element.getElementsByTagNameNS(ns, tag);
    }
    static create(tag, parent, i, c, n) {
        var _a;
        if (arguments.length == 1)
            return document.createElement(tag);
        else {
            var result = document.createElement(tag);
            if (parent) {
                if (typeof (parent) == 'string') {
                    (_a = document.getElementById(parent)) === null || _a === void 0 ? void 0 : _a.append(result);
                }
                else {
                    parent.append(result);
                }
            }
            if ((arguments.length > 2) && (i))
                result.setAttribute('id', i);
            if ((arguments.length > 3) && (c))
                result.setAttribute('class', c);
            if ((arguments.length > 4) && (n))
                result.setAttribute('name', n);
            return result;
        }
    }
    static addEventListener(element, event, handler, useCapture) {
        var result = ((typeof element) == 'string') ? document.getElementById(element) : element;
        useCapture = (arguments.length > 3) ? useCapture : false;
        result.addEventListener(event, handler, useCapture);
        return result;
    }
    static querySelector(selectors) {
        return document.querySelector(selectors);
    }
    static cleanHTML(element) {
        var result = ((typeof element) == 'string') ? document.getElementById(element) : element;
        result.innerHTML = "";
        return result;
    }
    static uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    static createStyle(innerHTML) {
        var newStyle = document.createElement('style');
        document.head.appendChild(newStyle);
        if (innerHTML)
            newStyle.innerHTML = innerHTML;
        return newStyle;
    }
    static loadURIError(oError) {
        throw new URIError("The file " + oError.target.src + " didn't load correctly.");
    }
    static prefixScript(url, onloadFunction) {
        var _a, _b;
        var newScript = document.createElement('script');
        newScript.onerror = this.loadURIError;
        if (onloadFunction) {
            newScript.onload = onloadFunction;
        }
        (_b = (_a = document.currentScript) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(newScript, document.currentScript);
        newScript.type = 'text/javascript';
        newScript.src = url;
        return newScript;
    }
    static affixScriptToHead(url, onloadFunction) {
        var newScript = document.createElement('script');
        newScript.onerror = this.loadURIError;
        if (onloadFunction) {
            newScript.onload = onloadFunction;
        }
        document.head.appendChild(newScript);
        newScript.type = 'text/javascript';
        newScript.src = url;
        return newScript;
    }
    static affixStylesheetToHead(url, onloadFunction) {
        var newLink = document.createElement('link');
        newLink.onerror = this.loadURIError;
        if (onloadFunction) {
            newLink.onload = onloadFunction;
        }
        document.head.appendChild(newLink);
        newLink.rel = 'stylesheet';
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
    static loaderScript(scriptUrl) {
        return new Promise(function (res, rej) {
            let script = document.createElement('script');
            script.src = scriptUrl;
            script.type = 'text/javascript';
            script.async = true;
            script.onerror = rej;
            script.onload = res;
            script.addEventListener('error', rej);
            script.addEventListener('load', res);
            document.head.appendChild(script);
        });
    }
}
$.select = {
    addOptions: function (sel, opt) {
        if ((typeof sel) == 'string')
            sel = document.getElementById(sel);
        var option;
        for (var i = 0; i < opt.length; i++) {
            option = document.createElement('option');
            option.text = opt[i];
            sel.add(option);
        }
    }
};
