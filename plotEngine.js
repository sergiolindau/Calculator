"use strict";
// Evaluator plot data
var plotData = {
    data: [],
    tag: [],
    MinX: 0,
    MaxX: 0,
    MinY: 0,
    MaxY: 0
};
// Canvas plot
// plot data from pdata
class CanvasPlot {
    constructor(parent, width, height, pdata) {
        this.Canvas = $.create("canvas", parent);
        this.Canvas.width = width;
        this.Canvas.height = height;
        this.pdata = pdata;
        this.MinX = pdata.MinX;
        this.MaxX = pdata.MaxX;
        this.MinY = pdata.MinY * 1.15;
        this.MaxY = pdata.MaxY * 1.15;
        this.draw();
    }
    // Returns the physical x-coordinate of a logical x-coordinate:
    XC(x) {
        return (x - this.MinX) / (this.MaxX - this.MinX) * this.Canvas.width;
    }
    // Returns the physical y-coordinate of a logical y-coordinate:
    YC(y) {
        return this.Canvas.height - (y - this.MinY) / (this.MaxY - this.MinY) * this.Canvas.height;
    }
    // Clears the canvas, draws the axes and graphs the function F.
    draw() {
        if (this.Canvas.getContext) {
            // Set up the canvas:
            var Ctx = this.Canvas.getContext('2d');
            if (Ctx) {
                Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
                // Draw:
                this.DrawAxes(Ctx);
                this.RenderFunction(Ctx);
            }
        }
    }
    // DrawAxes draws the X ad Y axes, with tick marks.
    DrawAxes(Ctx) {
        Ctx.save();
        Ctx.lineWidth = 2;
        // Y axis
        Ctx.beginPath();
        Ctx.moveTo(this.XC(0), this.YC(this.MinY));
        Ctx.lineTo(this.XC(0), this.YC(this.MaxY));
        Ctx.stroke();
        // Y axis tick marks
        var tdelta = 1;
        var twidth = 5;
        for (var i = 1; (i * tdelta) < this.MaxY; ++i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(0) - twidth, this.YC(i * tdelta));
            Ctx.lineTo(this.XC(0) + twidth, this.YC(i * tdelta));
            Ctx.stroke();
        }
        for (var i = 1; (i * tdelta) > this.MinY; --i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(0) - twidth, this.YC(i * tdelta));
            Ctx.lineTo(this.XC(0) + twidth, this.YC(i * tdelta));
            Ctx.stroke();
        }
        // +X axis
        Ctx.beginPath();
        Ctx.moveTo(this.XC(this.MinX), this.YC(0));
        Ctx.lineTo(this.XC(this.MaxX), this.YC(0));
        Ctx.stroke();
        // X tick marks
        for (var i = 1; (i * tdelta) < this.MaxX; ++i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(i * tdelta), this.YC(0) - twidth);
            Ctx.lineTo(this.XC(i * tdelta), this.YC(0) + twidth);
            Ctx.stroke();
        }
        for (var i = 1; (i * tdelta) > this.MinX; --i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(i * tdelta), this.YC(0) - twidth);
            Ctx.lineTo(this.XC(i * tdelta), this.YC(0) + twidth);
            Ctx.stroke();
        }
        Ctx.restore();
    }
    // RenderFunction(f) renders the input pdata on the canvas.
    RenderFunction(Ctx) {
        var first = true;
        Ctx.beginPath();
        for (var i = 0; i < this.pdata.data.length; i++) {
            if (first) {
                Ctx.moveTo(i, this.YC(this.pdata.data[i]));
                first = false;
            }
            else {
                Ctx.lineTo(i, this.YC(this.pdata.data[i]));
            }
        }
        Ctx.stroke();
    }
}
class CanvasHistogram {
    constructor(parent, width, height, hdata) {
        this.Canvas = $.create("canvas", parent);
        this.Canvas.width = width;
        this.Canvas.height = height;
        this.hdata = hdata;
        this.MinX = hdata.MinX;
        this.MaxX = hdata.MaxX;
        this.MinY = hdata.MinY * 1.15;
        this.MaxY = hdata.MaxY * 1.15;
        this.draw();
    }
    // Returns the physical x-coordinate of a logical x-coordinate:
    XC(x) {
        return (x - this.MinX) / (this.MaxX - this.MinX) * this.Canvas.width;
    }
    // Returns the physical y-coordinate of a logical y-coordinate:
    YC(y) {
        return this.Canvas.height - (y - this.MinY) / (this.MaxY - this.MinY) * this.Canvas.height;
    }
    // Clears the canvas, draws the axes and graphs the function F.
    draw() {
        if (this.Canvas.getContext) {
            // Set up the canvas:
            var Ctx = this.Canvas.getContext('2d');
            if (Ctx) {
                Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
                // Draw:
                this.DrawAxes(Ctx);
                this.RenderFunction(Ctx);
            }
        }
    }
    // DrawAxes draws the X ad Y axes, with tick marks.
    DrawAxes(Ctx) {
        Ctx.save();
        Ctx.lineWidth = 2;
        // Y axis
        Ctx.beginPath();
        Ctx.moveTo(this.XC(0), this.YC(this.MinY));
        Ctx.lineTo(this.XC(0), this.YC(this.MaxY));
        Ctx.stroke();
        // Y axis tick marks
        var tdelta = 1;
        var twidth = 5;
        for (var i = 1; (i * tdelta) < this.MaxY; ++i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(0) - twidth, this.YC(i * tdelta));
            Ctx.lineTo(this.XC(0) + twidth, this.YC(i * tdelta));
            Ctx.stroke();
        }
        for (var i = 1; (i * tdelta) > this.MinY; --i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(0) - twidth, this.YC(i * tdelta));
            Ctx.lineTo(this.XC(0) + twidth, this.YC(i * tdelta));
            Ctx.stroke();
        }
        // +X axis
        Ctx.beginPath();
        Ctx.moveTo(this.XC(this.MinX), this.YC(0));
        Ctx.lineTo(this.XC(this.MaxX), this.YC(0));
        Ctx.stroke();
        // X tick marks
        for (var i = 1; (i * tdelta) < this.MaxX; ++i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(i * tdelta), this.YC(0) - twidth);
            Ctx.lineTo(this.XC(i * tdelta), this.YC(0) + twidth);
            Ctx.stroke();
        }
        for (var i = 1; (i * tdelta) > this.MinX; --i) {
            Ctx.beginPath();
            Ctx.moveTo(this.XC(i * tdelta), this.YC(0) - twidth);
            Ctx.lineTo(this.XC(i * tdelta), this.YC(0) + twidth);
            Ctx.stroke();
        }
        Ctx.restore();
    }
    // RenderFunction(f) renders the input pdata on the canvas.
    RenderFunction(Ctx) {
        var first = true;
        Ctx.beginPath();
        for (var i = 0; i < this.hdata.data.length; i++) {
            if (first) {
                Ctx.moveTo(i, this.YC(this.hdata.data[i]));
                first = false;
            }
            else {
                Ctx.lineTo(i, this.YC(this.hdata.data[i]));
            }
        }
        Ctx.stroke();
    }
}
var plotWidth = 550;
var plotHeight = 300;
var insertOutput = '';
const outputFunction = {
    'plot': function (parent) {
        var cv = new CanvasPlot(parent, plotWidth, plotHeight, plotData);
        insertOutput = '';
    },
    'hist': function (parent) {
        var cv = new CanvasHistogram(parent, plotWidth, plotHeight, plotData);
        insertOutput = '';
    }
};
