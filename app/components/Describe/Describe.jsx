import React from 'react';

import './Describe.scss';

/**
 * Describe class.
 * @class Describe
 * @augments React.Component
 */
const Describe = React.createClass(/** @lends Describe.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Describe',

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
            <div className="describe" />
        );
    }
});

export default Describe;
