import React from 'react';
import classNames from 'classnames';

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
        keyValue: React.PropTypes.array,
        onKeyPressed: React.PropTypes.func
    },

    getInitialState() {
        return this.getStateFromProps(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    },

    getStateFromProps(props) {
        return {};
    },

    handleKeyPressed() {
        if (this.props.onKeyPressed) {
            this.props.onKeyPressed(this.props.keyValue);
        }
    },

    renderKeyContents() {
        const additionalClass = this.props.keyValue[0];
        let keyContents;

        if (this.props.keyValue.length === 1) {
            keyContents =
                <div className={"key " + additionalClass} onClick={this.handleKeyPressed}>
                    <span>{this.props.keyValue[0]}</span>
                </div>
        } else {
            keyContents =
                <div className="key" onClick={this.handleKeyPressed}>
                    <span className="character-lc">{this.props.keyValue[0]}</span>
                    <span className="character-uc">{this.props.keyValue[1]}</span>
                </div>
        }

        return keyContents;
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            this.renderKeyContents()
        )
    }
});

export default Key;
