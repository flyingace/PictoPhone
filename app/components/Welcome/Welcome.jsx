import React from 'react';

import './Welcome.scss';

/**
 * Welcome class.
 * @class Welcome
 * @augments React.Component
 */
const Welcome = React.createClass(/** @lends Welcome.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Welcome',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: React.PropTypes.string
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="welcome" />
        );
    }
});

export default Welcome;
