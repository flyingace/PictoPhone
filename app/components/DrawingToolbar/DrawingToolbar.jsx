import React from 'react';
import ToolButton from '../ToolButton/ToolButton';

import './DrawingToolbar.scss';

/**
 * DrawingToolbar class.
 * @class DrawingToolbar
 * @augments React.Component
 */
const DrawingToolbar = React.createClass(/** @lends DrawingToolbar.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'DrawingToolbar',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        thicknessSelectionHandler: React.PropTypes.func,
        toolSelectionHandler: React.PropTypes.func
    },

    renderToolButtons () {

    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="drawing-toolbar">
                <ToolButton iconClass="thick" handleToolSelection={this.props.thicknessSelectionHandler}/>
                <ToolButton iconClass="medium" handleToolSelection={this.props.thicknessSelectionHandler} />
                <ToolButton iconClass="thin" handleToolSelection={this.props.thicknessSelectionHandler} />
                <ToolButton iconClass="brush" handleToolSelection={this.props.toolSelectionHandler} />
                <ToolButton iconClass="bucket" handleToolSelection={this.props.toolSelectionHandler} />
                <ToolButton iconClass="eraser" handleToolSelection={this.props.toolSelectionHandler} />
                <ToolButton iconClass="undo" handleToolSelection={this.props.toolSelectionHandler} />
            </div>
        );
    }
});

export default DrawingToolbar;
