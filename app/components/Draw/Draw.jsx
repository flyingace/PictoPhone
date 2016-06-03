import React from 'react';
import ColorPalette from '../ColorPalette/ColorPalette';
import DrawingArea from '../DrawingArea/DrawingArea';
import DrawingToolbar from '../DrawingToolbar/DrawingToolbar';
import './Draw.scss';

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
        this.setState({'needsToBeCleared': false})
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
                <DrawingToolbar toolSelectionHandler={this.onToolSelected}
                                thicknessSelectionHandler={this.onThicknessSelected}/>
                <DrawingArea clearNow={this.state.needsToBeCleared} onCleared={this.onCanvasCleared} brushWidth={this.state.selectedThickness} />
                <ColorPalette colorSelectionHandler={this.onColorSelected}/>
                <p className="description">{this.props.description}</p>
                <div className="button clear-all" onClick={this.onClearCanvas}>Clear All</div>
                <div className="button submit-picture" onClick={this.onCompleteDrawing}>OK</div>
            </div>
        );
    }
});

export default Draw;
