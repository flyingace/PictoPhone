import React from 'react';

import './ToolButton.scss';

/**
 * ToolButton class.
 * @class ToolButton
 * @augments React.Component
 */
const ToolButton = React.createClass(/** @lends ToolButton.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'ToolButton',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        groupName: React.PropTypes.string,
        handleToolSelection: React.PropTypes.func,
        selected: React.PropTypes.bool,
        toolName: React.PropTypes.string
    },

    /**
     * Returns the default values for props in the component.
     * @method getDefaultProps
     * @return {Object}
     */
    getDefaultProps() {
        return {
            selected: false
        };
    },

    onToolSelected() {
        if (this.props.handleToolSelection) {
            this.props.handleToolSelection(this.props.toolName);
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const class_name = (this.props.toolName) ? "tool-button icon-" + this.props.toolName : "tool-button";

        return (
            <input type="radio" name={this.props.groupName} className={class_name} onClick={this.onToolSelected} />
        );
    }
});

export default ToolButton;
