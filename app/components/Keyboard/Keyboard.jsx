import React from 'react';
import { map } from 'lodash';

import Key from '../Key/Key.jsx';

import './Keyboard.scss';

/**
 * Keyboard class.
 * @class Keyboard
 * @augments React.Component
 */
const Keyboard = React.createClass(/** @lends Keyboard.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Keyboard',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        rowOne: React.PropTypes.array,
        rowTwo: React.PropTypes.array,
        rowThree: React.PropTypes.array,
        rowFour: React.PropTypes.array,
        rowFive: React.PropTypes.array,
        keyPressHandler: React.PropTypes.func.isRequired
    },

    //TODO: Consider adding more information per key, such as its value when "shift" is pressed, or whether display
    //on the key should be handled separately from the value of the key, as with the spacebar. It's possible though
    //that trying to create a one-size-fits-all solution here might not work and that just having arrays for shifted
    //and unshifted values might be the most efficient solution.

    getDefaultProps() {
        return {
            rowOne: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', 'delete'],
            rowTwo: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '!', '?'],
            rowThree: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "'", '"'],
            rowFour: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '&'],
            rowFive: ['shift', 'spacebar', 'enter']
        };
    },

    createKey(letter) {
        let keyComponent;

        if (letter.length > 1) {
            keyComponent = <Key letterValue={ letter } addlClass={ letter } onKeyPressed={this.props.keyPressHandler}/>;
        } else {
            keyComponent = <Key letterValue={ letter } onKeyPressed={this.props.keyPressHandler}/>;
        }

        return keyComponent;
    },

    renderRow(keysInRow) {
        return map(keysInRow, this.createKey);
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="keyboard">
                <div className="keyboard-row">{ this.renderRow(this.props.rowOne) }</div>
                <div className="keyboard-row">{ this.renderRow(this.props.rowTwo) }</div>
                <div className="keyboard-row">{ this.renderRow(this.props.rowThree) }</div>
                <div className="keyboard-row">{ this.renderRow(this.props.rowFour) }</div>
                <div className="keyboard-row">{ this.renderRow(this.props.rowFive) }</div>
            </div>
        );
    }
});

export default Keyboard;
