import React from 'react';
import classNames from 'classnames';
import Keyboard from '../Keyboard/Keyboard.jsx';
import DescribeInput from '../DescribeInput/DescribeInput.jsx'

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
        children: React.PropTypes.string,
        mainImageURL: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            mainImageURL: "http://lorempixel.com/900/520/"
        }
    },

    getInitialState() {
        return {
            keyboardIsVisible: false,
            shiftKeyIsPressed: false,
            characterCount: 0
        };
    },

    componentDidMount() {

    },

    toggleKeyboard() {
        this.setState({keyboardIsVisible: !this.state.keyboardIsVisible})
    },

    checkKeyPressed(keyArray) {
        if (keyArray.length > 1) {
            this.onKeyPressed(keyArray);
        } else {
            this.onActionKeyPressed(keyArray);
        }
    },

    /**
     * Handles updating of the input field for single-character keys, like 'a', '7' or '!'
     * @param keyArray
     */
    onKeyPressed(keyArray) {
        const describeField = this.refs.describeInput;
        const key = (this.state.shiftKeyIsPressed) ? keyArray[1] : keyArray[0];

        describeField.value += key;
    },

    /**
     * Handles actions triggered by action-keys, like 'delete' or 'enter'
     * @param keyArray
     */
    onActionKeyPressed(keyArray) {
        const describeField = this.refs.describeInput;

        switch (keyArray[0]) {
            case 'shift':
                this.setState({shiftKeyIsPressed: !this.state.shiftKeyIsPressed});
                break;
            case 'del':
                describeField.value = describeField.value.slice(0, -1);
                break;
            case 'space':
                describeField.value = describeField.value + ' ';
                break;
            case 'enter':
                //do enter action
                break;
            default:
                break;
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const keyboardIsVisible = this.state.keyboardIsVisible;
        let keyboardContainerClass = classNames({
            'keyboard-container': true,
            'keyboard-container--visible': keyboardIsVisible
        });
        let mainImageClass = classNames({
            'scaled': keyboardIsVisible
        });

        const keyboardIconSrc = (keyboardIsVisible) ? 'images/keyboard-hide.png' : 'images/keyboard-show.png';

        return (
            <div className="describe">
                <div className="image-container">
                    <img className={mainImageClass} alt="Write a description of this picture!"
                         src={this.props.mainImageURL}/>
                </div>
                <div className="input-container">
                    <img className="keyboard-icon" src={keyboardIconSrc} onClick={this.toggleKeyboard}/>
                    <DescribeInput prompt={"Write a description of this picture!"} characterCount={this.state.characterCount} />
                    <button className="button okButton" onClick={this.props.onSubmit}>OK</button>
                </div>
                <div className={keyboardContainerClass}>
                    <Keyboard fieldRef="describeInput" keyPressHandler={this.checkKeyPressed}
                              isShifted={this.state.shiftKeyIsPressed}/>
                </div>
            </div>
        );
    }
});

export default Describe;
