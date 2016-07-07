import React from 'react';
import _ from 'lodash';

import './DrawingArea.scss';

const EaselJS = window.createjs;
let stage, canvas, drawingCanvas, stroke, title, oldPt, oldMidPt;

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
        canvasHeight: React.PropTypes.string,
        canvasWidth: React.PropTypes.string,
        clearNow: React.PropTypes.bool,
        onCleared: React.PropTypes.func,
        onSaved: React.PropTypes.func,
        saveNow: React.PropTypes.bool,
        selectedColor: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            canvasWidth: '900',
            canvasHeight: '520',
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
            this.fill(oldPt);
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

    fill(seedPixel) {
        //TODO: check targetColor against selectedColor
        const ppCanvas = stage.canvas;
        const canvasWidth = ppCanvas.width;
        const canvasHeight = ppCanvas.height;
        //get copy of imageData for the canvas: _imageData
        const imageData = ppCanvas.getContext('2d').getImageData(0,0,canvasWidth,canvasHeight).data;
        //convert imageData r, g, b, & alpha values into 8-character hexadecimal strings
        /* const hexColorArray = this.convertImageDataToHexArray(imageData); */
        //get the x & y coordinates for the area underneath the cursor
        //translate those x/y coordinates to the pixel's index in _imageData: _seedIndex
        const clickedPixelIndex = seedPixel.stageX + (seedPixel.stageY * canvasWidth);
        const newArray = this.fillInArray(clickedPixelIndex, imageData, canvasWidth);
        // for (let i = 0; i < imageData.length; i++) {
        //     console.log(imageData.length === 6);
        // }
    },

    convertImageDataToHexArray(imageData) {
        let i, hexValue;
        const _imageHexData = [];
        for (i = 0; i < imageData.length; i += 4) {
            hexValue = this.createPaddedHexValue(imageData, i);
            console.log(hexValue);
            _imageHexData.push(hexValue);
        }

        return _imageHexData;
    },

    createPaddedHexValue(imgData, indx) {
        let paddedHexValue = '';
        for (var i = 0; i < 4; i++) {
            let hx = imgData[indx + i].toString(16);
            paddedHexValue += (hx.length === 2) ? hx : '0' + hx;
        }

        return paddedHexValue;
    },

    getClickedPixelIndex(xCoord, yCoord) {
        const canvasWidth = stage.canvas.width;
        return xCoord + (yCoord * canvasWidth);
    },

    checkPixelForMatch(hexColorArray, pixelIndex, seedColor, targetColor) {
        let pxIndex;
        if (hexColorArray[pixelIndex] === seedColor) {
            hexColorArray[pixelIndex] = targetColor;
            pxIndex = pixelIndex;
        }

        return pxIndex;
    },




    fillInArray(startingIndex, imageData, canvasWidth) {
        const pA = [[startingIndex]];
        //TODO: Convert targetColor to a 4 item array.
        const targetColor = this.props.selectedColor + 'FF';
        //get the color data for that pixel from _imageData: _seedColor
        const seedColor = hexColorArray(clickedPixelIndex);

        if (seedColor === targetColor) { return false; }

        //while the last array in pA isn't empty
        while (pA.slice(-1)[0].length > 0) {
            const currentArray = [];
            const lastArray = pA.slice(-1);
            //loop through all index values in the last array
            for (let i = 0; i < lastArray.length; i++) {
                hexColorArray[i] = targetColor;
                //create variables whose values are the indexes of the adjacent pixels
                const topIndex = i - canvasWidth,
                    bottomIndex = i + canvasWidth,
                    leftIndex = i - 1,
                    rightIndex = i + 1;

                //if any of the value of the hexColor in hexColorArray at these indexes matches the seed color
                //add that index to the currentArray
                if (hexColorArray[topIndex] === seedColor) {currentArray.push(topIndex) }
                if (hexColorArray[bottomIndex] === seedColor) { currentArray.push(bottomIndex) }
                if (hexColorArray[leftIndex] === seedColor) { currentArray.push(leftIndex) }
                if (hexColorArray[rightIndex] === seedColor) { currentArray.push(rightIndex) }
            }

            //After looping through all the values in lastArray, push currentArray to pA
            pA.push(currentArray);
        }

        //Merge all child arrays of pA, eliminating duplicate values
        const affectedArray = _.uniq(_.flattenDeep(pA));

        // //change the values at those indexes in hexColorArray to match seedColor
        // for (let i = 0; i < affectedArray.length; i++) {
        //     hexColorArray[i] = targetColor;
        // }

        return hexColorArray;

    //create two arrays: _parentArray and a child array with _seedIndex inside it
    //The last array in _parentArray will be: _latestArray
    //Begin a recursive function
    //that first reads the last array in _parentArray
    //if the length of _latestArray is 0 the recursive function ends
    //otherwise
    //create a new array: _currentArray
    //loop through the values in _latestArray treating each as an index in _imageData
    //referring to each value in turn as _currentIndex
    //check the hex strings of the four adjacent pixels to _currentIndex to see if they match _seedColor
    //(_currentIndex - canvas.width, _currentIndex - 1, _currentIndex + 1 and _currentIndex + canvas.width)
    //if any match, push that index to _currentArray
    //push _currentArray to _parentArray and start the recursive function over again

    //if at any time, at the end of a loop, the new array is empty then stop
    //then merge all arrays and remove any duplicate values
    //convert the hex values of any of the indexes to match the desired color
    //revert all hex values to comma separated rgba values
    //overwrite the canvas' imageData with _imageData
    },


    render () {
        return (
            <div className="drawing-area">
                <canvas ref="drawingArea" width={this.props.canvasWidth} height={this.props.canvasHeight}/>
            </div>
        );

    }
});

export default DrawingArea;
