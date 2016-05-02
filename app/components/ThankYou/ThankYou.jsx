import React from 'react';

import './ThankYou.scss';
import Key from '../Key/Key.jsx';

/**
 * ThankYou class.
 * @class ThankYou
 * @augments React.Component
 */
const ThankYou = React.createClass(/** @lends ThankYou.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'ThankYou',

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
            <div className="thankYou">
              <h1>Thank You</h1>
                <p>You're done! Check your email later for a link to the completed game!</p>
                <Key letterValue="A" />
                <Key letterValue="S" />
                <Key letterValue="D" />
                <Key letterValue="F" />
            </div>
        );
    }
});

export default ThankYou;
