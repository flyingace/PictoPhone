import React from 'react';
import { map } from 'lodash';

import ColorSwatch from '../ColorSwatch/ColorSwatch';

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
        colors: React.PropTypes.array
    },

    getDefaultProps() {
        return {
            colors: ['#FAFF00', '#F88E00', '#F75800', '#F62600', '#C00000', '#BC005B', '#54005A', '#0B005D', '#0A2496',
                '#135B58', '#359000', '#5FCA00']
        }
    },
    renderSwatches(colorArray) {
        return map(colorArray, this.renderSwatch)
    },

    renderSwatch(swatchColor, index) {
        return <ColorSwatch swatchColor={swatchColor} key={index}/>
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render()
    {
        return (
            <div className="color-palette">
                {this.renderSwatches(this.props.colors)}
            </div>
        );
    }
});

export default ColorPalette;
