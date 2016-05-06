import React from 'react';
import {map} from 'lodash';

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
        rowFive: React.PropTypes.array
    },

    getDefaultProps() {
        return {
            rowOne: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            rowTwo: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            rowThree: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            rowFour: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
            rowFive: ['spacebar', 'shift']
        };
    },

    createKey(letter) {
        return <Key letterValue={ letter }/>;
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
                <div className="keyboard-row cf">{ this.renderRow(this.props.rowOne) }</div>
                <div className="keyboard-row cf">{ this.renderRow(this.props.rowTwo) }</div>
                <div className="keyboard-row cf">{ this.renderRow(this.props.rowThree) }</div>
                <div className="keyboard-row cf">{ this.renderRow(this.props.rowFour) }</div>
                <div className="keyboard-row cf">{ this.renderRow(this.props.rowFive) }</div>
            </div>
        );
    }
});

export default Keyboard;
