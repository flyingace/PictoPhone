import React from 'react';

import './ThankYou.scss';

let returnToStartDelay;

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
        children: React.PropTypes.string,
        returnToStart: React.PropTypes.func
    },

    /**
     * When component mounts, start a timer. If the player hasn't hit the "Return To Start" button
     * before the timer runs down, trigger the returnToStart() method.
     */
    componentDidMount() {
        returnToStartDelay = window.setTimeout (
            this.props.returnToStart, 10000
        );
    },

    /**
     * When the component unmounts clear the returnToStartDelay timer.
     */
    componentWillUnmount() {
        window.clearTimeout(returnToStartDelay);
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
                <button className="button" onClick={this.props.returnToStart}>Return To Start</button>
            </div>
        );
    }
});

export default ThankYou;
