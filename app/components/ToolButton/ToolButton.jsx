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
        selected: React.PropTypes.bool,
        iconClass: React.PropTypes.string
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

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const class_name = (this.props.iconClass) ? "tool-button icon-" + this.props.iconClass : "tool-button";

        return (
            <div className={class_name} />
        );
    }
});

export default ToolButton;
