import React from 'react';

import './DrawingArea.scss';

const EaselJS = window.createjs;
let stage, canvas, drawingCanvas, colors, color, stroke, title, oldPt, oldMidPt, index

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
        propTypes: {},

        /**
         * Renders the component based on the properties passed in from a parent
         * component and the component's state.
         * @method render
         * @return {ReactElement}
         */

        componentDidMount () {
            canvas = this.refs.drawingArea;
            index = 0;
            colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600",
                "#fe8a00", "#f9a71f"];

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

            this.saveImageAsJPEG();
        },

        handleMouseDown(event) {
            if (!event.primary) {
                return;
            }
            if (stage.contains(title)) {
                stage.clear();
                stage.removeChild(title);
            }
            color = colors[(index++) % colors.length];
            stroke = Math.random() * 30 + 10 | 0;
            oldPt = new EaselJS.Point(stage.mouseX, stage.mouseY);
            oldMidPt = oldPt.clone();
            stage.addEventListener("stagemousemove", this.handleMouseMove);
        },

        handleMouseMove(event) {
            if (!event.primary) {
                return;
            }
            let midPt = new EaselJS.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

            drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

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

        saveImageAsJPEG() {
            setTimeout(function() {
                console.log(canvas.toDataURL());
                console.log('did that work?');
            }, 20000)
        },

        render()
        {
            return (
                <div>
                    <canvas id="drawing-area" ref="drawingArea" width="960" height="400"/>
                </div>
            );

        }
    })
    ;

export default DrawingArea;
