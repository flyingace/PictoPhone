import React from 'react';

import './Key.scss';

/**
 * Key class.
 * @class Key
 * @augments React.Component
 */
const Key = React.createClass(/** @lends Key.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Key',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        letterValue: React.PropTypes.string,
        onKeyPressed: React.PropTypes.func,
        addlClass: React.PropTypes.string,
        fuzz: React.PropTypes.string
    },

    onKeyPressed() {
        if (this.props.onKeyPressed) {
            this.props.onKeyPressed(this.props.letterValue);
        }
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        let keyClass = (this.props.addlClass) ? 'key ' + this.props.addlClass : 'key';
        return (
            <div className={keyClass} onClick={this.onKeyPressed}>{this.props.letterValue}</div>
        );
    }
});

export default Key;
