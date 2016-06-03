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
        iconClass: React.PropTypes.string,
        onToolSelected: React.PropTypes.func,
        selected: React.PropTypes.bool
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
            this.props.handleToolSelection(this.props.iconClass);
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const class_name = (this.props.iconClass) ? "tool-button icon-" + this.props.iconClass : "tool-button";

        return (
            <div className={class_name} onClick={this.onToolSelected} />
        );
    }
});

export default ToolButton;
