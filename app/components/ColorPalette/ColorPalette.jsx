import React from 'react';

import './ColorPalette.scss';

/**
 * ColorPalette class.
 * @class ColorPalette
 * @augments React.Component
 */
const ColorPalette = React.createClass(/** @lends ColorPalette.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'ColorPalette',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="color-palette" />
        );
    }
});

export default ColorPalette;
