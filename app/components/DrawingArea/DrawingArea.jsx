import React from 'react';
import _ from 'lodash';

import './DrawingArea.scss';

const EaselJS = window.createjs;
const stack = [];
let stage, canvas, drawingCanvas, stroke, title, oldPt, oldMidPt,
    canvasWidth, canvasHeight, imgData, startColor, newColor;

/**
 * DrawingArea class.
 * @class DrawingArea
 * @augments React.Component
 */
const DrawingArea = React.createClass(/** @lends DrawingArea.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'DrawingArea',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        brushThickness: React.PropTypes.number,
        brushWidth: React.PropTypes.number,
        canvasHeight: React.PropTypes.number,
        canvasWidth: React.PropTypes.number,
        clearNow: React.PropTypes.bool,
        onCleared: React.PropTypes.func,
        onSaved: React.PropTypes.func,
        saveNow: React.PropTypes.bool,
        selectedColor: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            canvasWidth: 900,
            canvasHeight: 520,
            brushThickness: 30,
            selectedColor: '#000000'
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */

    componentDidMount () {
        this.configureCanvasAndStage();
    },

    componentDidUpdate() {
        if (this.props.clearNow) {
            this.clearStage();
            this.props.onCleared();
        }

        if (this.props.saveNow) {
            this.props.onSaved(stage);
        }
    },

    configureCanvasAndStage () {
        canvas = this.refs.drawingArea;
        canvasWidth = this.props.canvasWidth;
        canvasHeight = this.props.canvasHeight;

        //check to see if we are running in a browser with touch support
        stage = new EaselJS.Stage(canvas);
        stage.autoClear = false;
        stage.enableDOMEvents(true);

        EaselJS.Touch.enable(stage);
        EaselJS.Ticker.setFPS(24);

        drawingCanvas = new EaselJS.Shape();

        stage.addEventListener("stagemousedown", this.handleMouseDown);
        stage.addEventListener("stagemouseup", this.handleMouseUp);

        title = new EaselJS.Text("Click and Drag to draw", "36px Arial", "#777777");
        title.x = 300;
        title.y = 200;
        stage.addChild(title);

        stage.addChild(drawingCanvas);
        stage.update();
    },

    clearStage() {
        stage.clear();
    },

    handleMouseDown(event) {
        if (!event.primary) {
            return;
        }
        if (stage.contains(title)) {
            stage.clear();
            stage.removeChild(title);
        }

        oldPt = new EaselJS.Point(stage.mouseX, stage.mouseY);

        if (this.props.selectedTool === 'brush') {
            stroke = this.props.brushWidth;
            oldMidPt = oldPt.clone();
            stage.addEventListener("stagemousemove", this.handleMouseMove);
        } else if (this.props.selectedTool === 'bucket') {
            console.time('fill');
            this.floodFill(oldPt);
            console.timeEnd('fill');
        }
    },

    handleMouseMove(event) {
        if (!event.primary) {
            return;
        }

        const midPt = new EaselJS.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

        drawingCanvas.graphics.clear()
                     .setStrokeStyle(stroke, 'round', 'round')
                     .beginStroke(this.props.selectedColor)
                     .moveTo(midPt.x, midPt.y)
                     .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

        oldPt.x = stage.mouseX;
        oldPt.y = stage.mouseY;

        oldMidPt.x = midPt.x;
        oldMidPt.y = midPt.y;

        stage.update();
    },

    handleMouseUp(event) {
        if (!event.primary) {
            return;
        }
        stage.removeEventListener("stagemousemove", this.handleMouseMove);
    },

    /*
     fill(seedPixel) {
     let pixelStack = [[seedPixel.x, seedPixel.y]];
     const ctx = stage.canvas.getContext('2d');
     imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

     while (pixelStack.length) {
     var newPos, x, y, pixelPos, reachLeft, reachRight;
     newPos = pixelStack.pop();
     x = newPos[0];
     y = newPos[1];

     pixelPos = (y * canvasWidth + x) * 4;
     while (y-- >= drawingBoundTop && this.matchStartColor(pixelPos)) {
     pixelPos -= canvasWidth * 4;
     }
     pixelPos += canvasWidth * 4;
     ++y;
     reachLeft = false;
     reachRight = false;
     while (y++ < canvasHeight - 1 && this.matchStartColor(pixelPos)) {
     this.colorPixel(pixelPos);

     if (x > 0) {
     if (this.matchStartColor(pixelPos - 4)) {
     if (!reachLeft) {
     pixelStack.push([x - 1, y]);
     reachLeft = true;
     }
     }
     else if (reachLeft) {
     reachLeft = false;
     }
     }

     if (x < canvasWidth - 1) {
     if (this.matchStartColor(pixelPos + 4)) {
     if (!reachRight) {
     pixelStack.push([x + 1, y]);
     reachRight = true;
     }
     }
     else if (reachRight) {
     reachRight = false;
     }
     }

     pixelPos += canvasWidth * 4;
     }
     }

     ctx.putImageData(colorLayer, 0, 0);
     },
     */

    floodFill(startPixel) {
        const ctx = stage.canvas.getContext('2d');
        imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
        startColor =

        this.fillPixel(startPixel.x, startPixel.y);

        while (stack.length > 0) {
            const toFill = stack.pop();
            this.fillPixel(toFill[0], toFill[1]);
        }
    },

    fillPixel(x, y) {
        if (!this.alreadyFilled(x, y)) {
            this.fill(x, y)
        }

        if (!this.alreadyFilled(x, y - 1)) {
            stack.push([x, y - 1])
        }

        if (!this.alreadyFilled(x + 1, y)) {
            stack.push([x + 1, y])
        }

        if (!this.alreadyFilled(x, y + 1)) {
            stack.push([x, y + 1])
        }

        if (!this.alreadyFilled(x - 1, y)) {
            stack.push([x - 1, y])
        }
    },

    fill (x, y){
        // this function will actually change the color of our box
    },

    alreadyFilled (x, y){
        // this function checks to see if our square has been filled already
    },

    matchStartColor(pixelPos) {
        var r = colorLayer.data[pixelPos];
        var g = colorLayer.data[pixelPos + 1];
        var b = colorLayer.data[pixelPos + 2];

        return (r == startR && g == startG && b == startB);
    },

    colorPixel(pixelPos) {
        colorLayer.data[pixelPos] = fillColorR;
        colorLayer.data[pixelPos + 1] = fillColorG;
        colorLayer.data[pixelPos + 2] = fillColorB;
        colorLayer.data[pixelPos + 3] = 255;
    },

    //set imgData for the canvas (the resulting array should never be longer than 1,872,000);

    getClickedPixelIndex(xCoord, yCoord) {
        return xCoord + (yCoord * canvasWidth);
    },

    convertToRGB(hexColorValue) {
        //hexColorValue must be #rrggbb
        var hex = parseInt(hexColorValue.substring(1), 16);
        var r = (hex & 0xff0000) >> 16;
        var g = (hex & 0x00ff00) >> 8;
        var b = hex & 0x0000ff;
        return [r, g, b];
    },

    matchesSeedColor(pxIndex) {
        if (pxIndex > canvasWidth * canvasHeight) {
            debugger;
        }
        const imgDataIndex = pxIndex * 4;
        if (_.isEqual(imgData.slice(imgDataIndex, imgDataIndex + 3), seedColor)) {
            imgData.splice(imgDataIndex, 4, fillColor[0], fillColor[1], fillColor[2], 255);
            return true;
        }
        return false;
    },

    render() {
        return (
            <div className="drawing-area">
                <canvas ref="drawingArea" width={this.props.canvasWidth} height={this.props.canvasHeight}/>
            </div>
        );

    }
});

export default DrawingArea;
