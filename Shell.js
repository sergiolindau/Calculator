"use strict";
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
const Shell = {
    thispanel: null,
    evalPrompt: function () { },
    isTouch: false,
    thisbatch: null,
    batchpre: null,
    batchwrapper: null,
    batcharea: null,
    batchbutton: null,
    thisprompt: null,
    linesArray: [""],
    promptArray: [],
    promptSet: {},
    promptPointer: -1,
    batchResize: function (event) {
        Shell.batcharea.style.height = '1em';
        Shell.batcharea.style.height = Shell.batcharea.scrollHeight + 27 + 'px';
    },
    batchDelayedResize: function (event) {
        window.setTimeout(Shell.batchResize, 0);
    },
    promptFocus: function (event) {
        var _a;
        Shell.promptPointer = Shell.promptArray.indexOf((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id.substring(1));
    },
    promptBlur: function (event) {
        var onblur = Shell.promptSet[Shell.promptArray[Shell.promptPointer]][2];
        if (Shell.isTouch && (onblur.value != "")) {
            Shell.evalPrompt(Shell.promptSet[onblur.id.substring(1)][0], Shell.promptSet[onblur.id.substring(1)][1], Shell.promptSet[onblur.id.substring(1)][2], Shell.promptSet[onblur.id.substring(1)][3]);
        }
    },
    promptKeydown: function (event) {
        var onfocus = document.activeElement;
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            if ((event.keyCode === 13 || event.which === 13) && !event.shiftKey) {
                if (!event.shiftKey)
                    event.preventDefault();
                if (onfocus.selectionStart == 0) {
                    //cria prompt anterior se pressionado enter com o cursor em 0
                    var pdiv = document.getElementById(("d" + (onfocus === null || onfocus === void 0 ? void 0 : onfocus.id.substring(1))));
                    var uid = $.uid();
                    var div = $.create("div", null, "d" + uid);
                    Shell.promptCreate(uid, div);
                    Shell.promptArray.splice(Shell.promptPointer, 0, uid);
                    Shell.promptPointer++;
                    Shell.thisprompt.insertBefore(div, pdiv);
                    onfocus.style.width = "90%";
                    onfocus.style.height = "1em";
                    onfocus.style.height = onfocus.scrollHeight + 'px';
                    Shell.linesArray.splice(Shell.promptPointer - 1, 0, onfocus.value);
                    Shell.batcharea.value = Shell.linesArray.join("\n");
                }
                else {
                    if ((Shell.promptPointer + 1) == Shell.promptArray.length) {
                        //adiciona ao final
                        var uid = $.uid();
                        var div = $.create("div", Shell.thisprompt, "d" + uid);
                        Shell.promptCreate(uid, div);
                        Shell.promptArray.push(uid);
                        Shell.linesArray.push(Shell.promptSet[onfocus === null || onfocus === void 0 ? void 0 : onfocus.id.substring(1)][2].value);
                        Shell.batcharea.value = Shell.linesArray.join("\n");
                        Shell.promptPointer++;
                    }
                    Shell.evalPrompt(Shell.promptSet[onfocus.id.substring(1)][0], Shell.promptSet[onfocus.id.substring(1)][1], Shell.promptSet[onfocus.id.substring(1)][2], Shell.promptSet[onfocus.id.substring(1)][3]);
                    // passa ao próximo prompt
                    onfocus = Shell.promptSet[Shell.promptArray[Shell.promptArray.indexOf(onfocus.id.substring(1)) + 1]][2];
                    onfocus.focus();
                    onfocus.selectionStart = onfocus.value.length;
                }
                if (!event.shiftKey)
                    return false;
            }
            else if ( //apaga prompt anterior se for nulo e pressionar backspace na coluna 0
            (event.keyCode === 8 || event.which === 8) &&
                (onfocus.selectionStart == 0) &&
                (Shell.promptPointer != 0) &&
                (Shell.promptSet[Shell.promptArray[Shell.promptPointer - 1]][2].value == "")) {
                //apaga prompt anterior
                Shell.promptSet[Shell.promptArray[Shell.promptPointer - 1]][0].remove();
                delete Shell.promptSet[Shell.promptArray[Shell.promptPointer - 1]];
                Shell.promptArray.splice(Shell.promptPointer - 1, 1);
                Shell.linesArray.splice(Shell.promptPointer - 1, 1);
                Shell.batcharea.value = Shell.linesArray.join("\n");
                Shell.promptPointer--;
            }
            else if ((event.keyCode === 38 || event.which === 38)) {
                if (Shell.promptPointer > 0)
                    Shell.promptSet[Shell.promptArray[Shell.promptArray.indexOf(onfocus.id.substring(1)) - 1]][2].focus();
            }
            else if ((event.keyCode === 40 || event.which === 40)) {
                if ((Shell.promptPointer + 1) < Shell.promptArray.length)
                    Shell.promptSet[Shell.promptArray[Shell.promptArray.indexOf(onfocus.id.substring(1)) + 1]][2].focus();
            }
        }
    },
    promptCreate: function (uid, div) {
        var pre = $.create("pre", div, "p" + uid, "good");
        var input = $.create("textarea", pre, "i" + uid, "inputprompt");
        $.addEventListener(input, 'focus', Shell.promptFocus);
        $.addEventListener(input, 'blur', Shell.promptBlur);
        $.addEventListener(input, 'keydown', Shell.promptKeydown);
        function promptResize() {
            input.style.width = "97%";
            input.style.height = "1em";
            input.style.height = input.scrollHeight + 'px';
        }
        /* 0-timeout to get the already changed textarea */
        function promptDelayedResize() {
            window.setTimeout(promptResize, 0);
        }
        function inputFocus() {
            if (!Shell.isTouch)
                input.focus();
        }
        $.addEventListener(input, 'change', promptResize);
        $.addEventListener(input, 'cut', promptDelayedResize);
        $.addEventListener(input, 'paste', promptDelayedResize);
        $.addEventListener(input, 'drop', promptDelayedResize);
        $.addEventListener(input, 'keydown', promptDelayedResize);
        $.addEventListener(pre, 'click', inputFocus);
        promptResize();
        var output = $.create("div", pre, "o" + uid);
        Shell.promptSet[uid] = [div, pre, input, output];
    },
    promptAppend: function (text) {
        var uid = $.uid();
        var div = $.create("div", Shell.thisprompt, "d" + uid);
        Shell.promptCreate(uid, div);
        Shell.promptPointer++;
        Shell.promptArray.push(uid);
        if (text)
            Shell.promptSet[uid][2].value = text;
        Shell.promptSet[uid][2].focus();
        if (Shell.isTouch) {
            Shell.promptSet[uid][2].blur();
        }
        else {
            Shell.evalPrompt(Shell.promptSet[uid][0], Shell.promptSet[uid][1], Shell.promptSet[uid][2], Shell.promptSet[uid][3]);
        }
    },
    promptClean: function () {
        for (var i in Shell.promptSet) {
            Shell.promptSet[i][0].remove();
        }
    },
    updateBatch: function () {
        Shell.batcharea.value = Shell.linesArray.join("\n");
    },
    loadBatch: function () {
        Shell.linesArray = Shell.batcharea.value.split("\n");
    },
    loadLines: function () {
        if (Shell.linesArray && (Shell.linesArray.length == 0))
            Shell.linesArray = [""];
        if (Shell.linesArray) {
            for (var i = 0; i < Shell.linesArray.length; i++) {
                Shell.promptAppend(Shell.linesArray[i]);
            }
            Shell.batchResize();
            Shell.promptSet[Shell.promptArray[0]][2].focus();
        }
    },
    batchFocus: function (event) {
        var onfocus = document.activeElement;
    },
    batchExec: function (event) {
        Shell.promptClean();
        Shell.loadBatch();
        Shell.loadLines();
        Shell.batchbutton.focus();
    },
    batchBlur: function (event) {
        Shell.promptClean();
    },
    init: function (panel, func, linesArray) {
        Shell.thispanel = $.i(panel);
        if (func) {
            Shell.evalPrompt = func;
        }
        else {
            Shell.evalPrompt = function (div, pre, input, output) { console.log("evalPrompt(" + input.value + ")"); };
        }
        Shell.linesArray = linesArray;
        Shell.isTouch = isTouchDevice();
        if (Shell.isTouch) {
            window.addEventListener('mousemove', function () {
                Shell.isTouch = false;
            });
            window.addEventListener('touchstart', function () {
                Shell.isTouch = true;
            });
        }
        Shell.thisbatch = $.create("div", Shell.thispanel, "batch_" + panel);
        Shell.batchpre = $.create("pre", Shell.thisbatch, "batchpre_", "good");
        Shell.batchwrapper = $.create("div", Shell.batchpre, "batchwrapper_", "batchwrapper");
        Shell.batcharea = $.create("textarea", Shell.batchwrapper, "text_" + panel, "inputarea");
        $.addEventListener(Shell.batcharea, 'change', Shell.batchResize);
        $.addEventListener(Shell.batcharea, 'cut', Shell.batchDelayedResize);
        $.addEventListener(Shell.batcharea, 'paste', Shell.batchDelayedResize);
        $.addEventListener(Shell.batcharea, 'drop', Shell.batchDelayedResize);
        $.addEventListener(Shell.batcharea, 'keydown', Shell.batchDelayedResize);
        Shell.batcharea.focus();
        Shell.batcharea.select();
        Shell.batchbutton = $.create("button", Shell.batchpre, "batchbutton_", "inputbutton");
        Shell.batchbutton.innerHTML = "Computar";
        Shell.batchbutton.style = "width:calc(100% - 3em);height:50px";
        $.addEventListener(Shell.batchbutton, 'click', Shell.batchExec);
        $.addEventListener(Shell.batcharea, 'focus', Shell.batchFocus);
        $.addEventListener(Shell.batcharea, 'blur', Shell.batchBlur);
        Shell.thisprompt = $.create("div", Shell.thispanel, "prompt_" + panel);
        Shell.promptArray = [];
        Shell.promptSet = {};
        Shell.promptPointer = -1;
        Shell.updateBatch();
        TLN.append_line_numbers(Shell.batcharea.id);
        Shell.batchResize();
        Shell.promptAppend();
        Shell.loadLines();
    },
    delete: function () {
        Shell.promptClean();
    }
};
