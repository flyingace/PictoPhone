import React from 'react';
import ToolButton from '../ToolButton/ToolButton';
import { map } from 'lodash';

import './Toolbar.scss';

/**
 * Toolbar class.
 * @class Toolbar
 * @augments React.Component
 */
const Toolbar = React.createClass(/** @lends Toolbar.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Toolbar',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        toolButtons: React.PropTypes.array,
        toolSelectionHandler: React.PropTypes.func,
        toolType: React.PropTypes.string,
        toolbarName: React.PropTypes.string
    },

    renderToolButtons(toolArray) {
        return map(toolArray, this.renderToolButton)
    },

    renderToolButton(tool, index) {
        return <ToolButton toolName={tool} key={index} handleToolSelection={this.props.toolSelectionHandler} groupName={this.props.toolbarName} />
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className={this.props.toolType + "-toolbar"}>
                {this.renderToolButtons(this.props.toolButtons)}
            </div>
        );
    }
});

export default Toolbar;
