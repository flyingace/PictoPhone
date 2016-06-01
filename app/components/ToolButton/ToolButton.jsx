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

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="tool-button" />
        );
    }
});

export default ToolButton;
