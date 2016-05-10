import React from 'react';
import classNames from 'classnames';
import Keyboard from '../Keyboard/Keyboard.jsx';

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
            keyboardIsVisible: false
        };
    },

    componentDidMount() {

    },

    checkKeyPressed(key) {
        if (key.length === 1) {
            this.onKeyPressed(key);
        } else {
            this.onActionKeyPressed(key);
        }
    },

    /**
     * Handles updating of the input field for single-character keys, like 'a', '7' or '!'
     * @param key
     */
    onKeyPressed(key) {
        const describeField = this.refs.describeInput;
        describeField.value += key;
    },

    toggleKeyboard() {
        this.setState({keyboardIsVisible: !this.state.keyboardIsVisible})
    },

    /**
     * Handles actions triggered by action-keys, like 'delete' or 'enter'
     * @param key
     */
    onActionKeyPressed(key) {
        const describeField = this.refs.describeInput;

        switch (key) {
            case 'shift':
                //do shift action
                break;
            case 'delete':
                describeField.value = describeField.value.slice(0, -1);
                break;
            case 'spacebar':
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

        const keyboardIconSrc =  (keyboardIsVisible) ? 'images/keyboard-hide.png' : 'images/keyboard-show.png';

        return (
            <div className="describe">
                <div className="keyboard-icon">
                    <img src={keyboardIconSrc} onClick={this.toggleKeyboard}/>
                </div>
                <div className="image-container">
                    <img className={mainImageClass} alt="Write a description of this" src={this.props.mainImageURL}/>
                </div>
                <div className="input-container">
                    <input className="descriptionInput" ref="describeInput"/>
                    <button className="button okButton">OK</button>
                </div>
                <div className={keyboardContainerClass}>
                    <Keyboard fieldRef="describeInput" keyPressHandler={this.checkKeyPressed}/>
                </div>
            </div>
        );
    }
});

export default Describe;
