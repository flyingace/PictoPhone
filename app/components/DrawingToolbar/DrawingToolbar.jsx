import React from 'react';

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
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="drawing-toolbar" />
        );
    }
});

export default DrawingToolbar;
