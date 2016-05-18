import React from 'react';

import './DescribeInput.scss';

/**
 * DescribeInput class.
 * @class DescribeInput
 * @augments React.Component
 */
const DescribeInput = React.createClass(/** @lends DescribeInput.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'DescribeInput',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        maxCharacterCount: React.PropTypes.number,
        prompt: React.PropTypes.string,
        characterCount: React.PropTypes.string,
        onGainFocus: React.PropTypes.func,
        onLoseFocus: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    },

    /**
     * Returns the default values for props in the component.
     * @method getDefaultProps
     * @return {Object}
     */
    getDefaultProps() {
        return {
            maxCharacterCount: 65
        };
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="describe-input-wrapper">
                <input className="descriptionInput" type="text" maxLength={this.props.maxCharacterCount}
                       placeholder={this.props.prompt} spellCheck="true" ref="describeInput"/>
                <span className="character-count">{this.props.characterCount}</span>
            </div>
        );
    }
});

export default DescribeInput;
