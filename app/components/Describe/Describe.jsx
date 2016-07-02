import React from 'react';
import classNames from 'classnames';
import Keyboard from '../Keyboard/Keyboard.jsx';
import DescribeInput from '../DescribeInput/DescribeInput.jsx'

import './Describe.scss';

const DELETE_KEY = 'delete';

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
        goToDrawingPage: React.PropTypes.func,
        pathToDrawing: React.PropTypes.string,
        updateCurrentDescription: React.PropTypes.func
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
            descriptionString: '',
            characterCount: 0,
            maxCharacterCount: 65
        };
    },

    componentDidMount() {

    },

    revealKeyboard() {
        this.setState({keyboardIsVisible: true});
    },

    toggleKeyboard() {
        this.setState({keyboardIsVisible: !this.state.keyboardIsVisible})
    },

    toggleShift() {
        this.setState({shiftKeyIsPressed: !this.state.shiftKeyIsPressed});
    },

    checkKeyPressed(keyArray) {
        if (keyArray.length > 1) {
            this.onKeyPressed(keyArray);
        } else {
            this.onActionKeyPressed(keyArray);
        }
    },

    /**
     * @param keyArray
     */
    onKeyPressed(keyArray) {
        const key = (this.state.shiftKeyIsPressed) ? keyArray[1] : keyArray[0];

        this.updateDescriptionString(key);
    },

    /**
     * Handles actions triggered by action-keys, like 'delete' or 'enter'
     * @param keyArray
     */
    onActionKeyPressed(keyArray) {
        const describeField = this.refs.describeInput;

        switch (keyArray[0]) {
            case 'shift':
                this.toggleShift();
                break;
            case 'del':
                this.updateDescriptionString(DELETE_KEY);
                break;
            case 'space':
                this.updateDescriptionString(' ');
                break;
            case 'enter':
                //do enter action
                break;
            default:
                break;
        }
    },

    onInputSelected(evt) {
        this.revealKeyboard();
        evt.target.blur();
    },

    updateDescriptionString(char) {
        const currentDescription = this.state.descriptionString;
        let newDescription;

        if (char !== DELETE_KEY && currentDescription.length < this.state.maxCharacterCount) {
            newDescription = currentDescription + char;
        } else if (char === DELETE_KEY) {
            newDescription = currentDescription.slice(0, -1);
        } else {
            newDescription = currentDescription;
        }

        this.setState({descriptionString: newDescription});
        this.setState({characterCount: newDescription.length});
    },

    onSubmitDescription() {
        //TODO: First, add validation if necessary
        //Then add the description to this round's data object
        this.props.updateCurrentDescription(this.state.descriptionString);
        this.props.goToDrawingPage();

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
                         src={this.props.pathToDrawing}/>
                </div>
                <div className="input-container">
                    <img className="keyboard-icon" src={keyboardIconSrc} onClick={this.toggleKeyboard}/>
                    <DescribeInput prompt={"Write a description of this picture!"}
                                   descriptionString={this.state.descriptionString}
                                   characterCount={this.state.characterCount} onGainFocus={this.onInputSelected}/>
                    <button className="button okButton" onClick={this.onSubmitDescription}>OK</button>
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
