import React from 'react';
import ColorPalette from '../ColorPalette/ColorPalette';
import DrawingArea from '../DrawingArea/DrawingArea';
import Toolbar from '../Toolbar/Toolbar';
import './Draw.scss';

const drawingTools = ["brush", "bucket", "eraser"];
const brushThickness = ["thick", "medium", "thin"];
const colors = ['#FAFF00', '#F88E00', '#F75800', '#F62600', '#C00000', '#BC005B', '#54005A', '#0B005D', '#0A2496',
    '#135B58', '#359000', '#5FCA00'];

/**
 * Draw class.
 * @class Draw
 * @augments React.Component
 */
const Draw = React.createClass(/** @lends Draw.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Draw',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: React.PropTypes.string,
        description: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            description: 'Three cows eating grass in France.'
        }
    },

    getInitialState() {
        return {
            selectedTool: 'paintbrush',
            selectedThickness: 'medium',
            selectedColor: 'black',
            needsToBeCleared: false
        }
    },

    onToolSelected(toolName) {
        console.log(toolName);
        this.setState({'selectedTool': toolName});
    },

    onColorSelected(colorName) {
        this.setState({'selectedColor': colorName});
    },

    onThicknessSelected(thickness) {
        let pixelThickness;

        switch (thickness) {
            case 'thick':
                pixelThickness = 40;
                break;
            case 'medium':
                pixelThickness = 30;
                break;
            case 'thin':
                pixelThickness = 20;
                break;
            default:
                pixelThickness = 30;
        }

        this.setState({'selectedThickness': pixelThickness});
    },

    onClearCanvas() {
        //don't forget to prompt the user about this choice
        this.clearCanvas();
    },

    clearCanvas() {
        this.setState({'needsToBeCleared': true});
    },

    onCanvasCleared() {
        this.setState({'needsToBeCleared': false});
    },

    onCompleteDrawing() {

    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="draw">
                <Toolbar toolType="drawing" toolbarName="drawing_tools" toolSelectionHandler={this.onToolSelected} toolButtons={drawingTools}/>
                <Toolbar toolType="brushThickness" toolbarName="brush_thickness" toolSelectionHandler={this.onThicknessSelected} toolButtons={brushThickness}/>
                <DrawingArea clearNow={this.state.needsToBeCleared} onCleared={this.onCanvasCleared}
                             brushWidth={this.state.selectedThickness}/>
                <Toolbar toolType="colorPalette" toolbarName="color_palette" toolSelectionHandler={this.onColorSelected} toolButtons={colors}/>
                <div className="description-container">
                    <p className="description">{this.props.description}</p>
                    <div className="button clear-all" onClick={this.onClearCanvas}>Clear All</div>
                    <div className="button submit-picture" onClick={this.onCompleteDrawing}>OK</div>
                </div>
            </div>
        );
    }
});

export default Draw;
