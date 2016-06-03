import React from 'react';

import './ColorSwatch.scss';

/**
 * ColorSwatch class.
 * @class ColorSwatch
 * @augments React.Component
 */
const ColorSwatch = React.createClass(/** @lends ColorSwatch.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'ColorSwatch',

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
            <div className="color-swatch" />
        );
    }
});

export default ColorSwatch;
