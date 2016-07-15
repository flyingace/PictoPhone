import React from 'react';
import _ from 'lodash';

import './DrawingArea.scss';

const EaselJS = window.createjs;
const stack = [];
let stage, canvas, drawingCanvas, stroke, title, oldPt, oldMidPt,
    canvasWidth, canvasHeight, imgData, startColor, fillColor;

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
        selectedColor: React.PropTypes.string,
        selectedTool: React.PropTypes.string
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
            console.time('replacePixelData');
            this.floodFill(oldPt);
            console.timeEnd('replacePixelData');
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

    /**
     * After the canvas has been clicked on with the Fill/Bucket tool take several steps
     * 1. Extract the ImageData from the canvas (imgData)
     * 2. Determine the color of the pixel clicked on (startColor)
     * 3. Get the color of the color currently selected in the color palette (fillColor)
     * 4. Verify that the startColor and fillColor don't match -- exit the method if they do
     * 5. Call a method that will
     *  a. Fill the pixel initially clicked on (startPixel) with the fillColor
     *  b. Add horizontally and vertically adjacent pixels that match the startColor to an array (stack)
     * 6. Loop through stack so long as it has children and pass each child to the method in 5
     * 7. When there are no more children in stack replace the canvas' imageData with the updated imgData
     * @param startPixel
     * @returns {boolean}
     */
    floodFill(startPixel) {
        const ctx = stage.canvas.getContext('2d');
        imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        startColor = this.getPixelColor(startPixel.x, startPixel.y);
        fillColor = this.convertHexToRGB(this.props.selectedColor);

        if (_.isEqual(startColor, fillColor)) {
            return false;
        }

        this.fillPixel(startPixel.x, startPixel.y);

        while (stack.length > 0) {
            const toFill = stack.pop();
            this.fillPixel(toFill[0], toFill[1]);
        }

        ctx.putImageData(imgData, 0, 0);
    },

    /**
     * 1. Check if the color of the pixel at the passed coordinates matches the color of the starting pixel
     * 2. If so, fill it in with the color currently selected in the color palette
     * 3. Check if each vertically and horizontally adjacent pixel's color matches the starting pixel's color
     * 4. For each that matches, push an array with that pixel's x & y coords into the stack array
     * @param x
     * @param y
     */
    fillPixel(x, y) {
        if (this.matchesStartPixelColor(x, y)) {
            this.replacePixelData(x, y)
        }

        if (this.matchesStartPixelColor(x, y - 1)) {
            stack.push([x, y - 1])
        }

        if (this.matchesStartPixelColor(x + 1, y)) {
            stack.push([x + 1, y])
        }

        if (this.matchesStartPixelColor(x, y + 1)) {
            stack.push([x, y + 1])
        }

        if (this.matchesStartPixelColor(x - 1, y)) {
            stack.push([x - 1, y])
        }
    },

    /**
     * Updates data for re-colored pixel in imgData
     * @param x
     * @param y
     */
    replacePixelData (x, y) {
        const pxIndex = this.getPixelIndex(x, y);
        imgData.data[pxIndex] = fillColor[0];
        imgData.data[pxIndex + 1] = fillColor[1];
        imgData.data[pxIndex + 2] = fillColor[2];
        imgData.data[pxIndex + 3] = 255;
    },

    /**
     * Checks to see if the target pixel matches the start color
     * @param x
     * @param y
     * @returns {boolean}
     */
    matchesStartPixelColor (x, y) {
        const pxIndex = this.getPixelIndex(x, y);
        const r = imgData.data[pxIndex];
        const g = imgData.data[pxIndex + 1];
        const b = imgData.data[pxIndex + 2];

        return (r === startColor[0] && g === startColor[1] && b === startColor[2]);
    },

    /**
     * Locates the starting index of the data for the target pixel in the imgData array
     * This index is found by treating the image as though each row of pixels was arranged end-to-end
     * and then multiplying that number by 4. The multiplier of 4 is used because for each pixel in the image
     * there are four corresponding entries in the imgData array: one each for red, green, blue & alpha.
     * @param pixelX
     * @param pixelY
     * @returns {number}
     */
    getPixelIndex (pixelX, pixelY) {
        return (pixelX + (pixelY * canvasWidth)) * 4;
    },

    /**
     * Returns an array with a length of 4 containing a value for each
     * of red, blue, green & alpha, represented as a range between 0-255.
     * @param pixelX
     * @param pixelY
     * @returns {*[]}
     */
    getPixelColor (pixelX, pixelY) {
        const pxIndex = this.getPixelIndex(pixelX, pixelY);
        return [imgData.data[pxIndex], imgData.data[pxIndex + 1], imgData.data[pxIndex + 2]];
    },

    /**
     * Converts a hexadecimal color value to rgb values.
     * The hex color value must be in the form #rrggbb.
     * @param hexColorValue
     * @returns {*[]}
     */
    convertHexToRGB(hexColorValue) {
        const hex = parseInt(hexColorValue.substring(1), 16);
        const r = (hex & 0xff0000) >> 16;
        const g = (hex & 0x00ff00) >> 8;
        const b = hex & 0x0000ff;
        return [r, g, b];
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
