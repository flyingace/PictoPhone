import React from 'react';
import _ from 'lodash';

import './DrawingArea.scss';

const EaselJS = window.createjs;
let stage, canvas, drawingCanvas, stroke, title, oldPt, oldMidPt,
    canvasWidth, canvasHeight, imgData, seedColor, fillColor;

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
            this.fill(oldPt);
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

    fill(seedPixel) {
        //set imgData for the canvas (the resulting array should never be longer than 1,872,000);
        const ctx =stage.canvas.getContext('2d');
        imgData = Array.from(ctx.getImageData(0, 0, canvasWidth, canvasHeight).data);
        console.log(_.sortedUniq(imgData));
        // _.chunk(imgData, 4);
        const seedPixelIndex = this.getClickedPixelIndex(seedPixel.x, seedPixel.y);
        this.fillInArray(seedPixelIndex, imgData, canvasWidth);
        window.setTimeout(function() {

        const newImageData = new ImageData(Uint8ClampedArray.from(imgData), canvasWidth, canvasHeight);
        ctx.putImageData(newImageData, 0, 0);
        }, 4000)
    },

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

    fillInArray(seedPxIndex) {
        const pA = [[seedPxIndex]];
        //Convert the selected color to an array of [R, G, B].
        fillColor = this.convertToRGB(this.props.selectedColor);
        //get the color data for that pixel from imgData
        seedColor = imgData.slice(seedPxIndex, seedPxIndex + 3);
        //if the target pixel is already the target color, exit
        if (_.isEqual(seedColor, fillColor)) {
            return false;
        }

        //while the last array in pA isn't empty
        while (pA.slice(-1)[0].length > 0) {
            const currentArrayOfIndexes = [];
            const lastArrayOfIndexes = pA.slice(-1)[0];
            //loop through all index values in the last array
            for (let i = 0; i < lastArrayOfIndexes.length; i++) {
                //create variables whose values are the indexes of the adjacent pixels
                const topPxIndex = lastArrayOfIndexes[i] - canvasWidth,
                    bottomPxIndex = lastArrayOfIndexes[i] + canvasWidth,
                    leftPxIndex = lastArrayOfIndexes[i] - 1,
                    rightPxIndex = lastArrayOfIndexes[i] + 1;

                if (this.matchesSeedColor(topPxIndex)) {
                    currentArrayOfIndexes.push(topPxIndex)
                }
                if (this.matchesSeedColor(bottomPxIndex)) {
                    currentArrayOfIndexes.push(bottomPxIndex)
                }
                if (this.matchesSeedColor(leftPxIndex)) {
                    currentArrayOfIndexes.push(leftPxIndex)
                }
                if (this.matchesSeedColor(rightPxIndex)) {
                    currentArrayOfIndexes.push(rightPxIndex)
                }
            }

            //After looping through all the values in lastArrayOfIndexes, push currentArray to pA
            pA.push(currentArrayOfIndexes);
        }
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
