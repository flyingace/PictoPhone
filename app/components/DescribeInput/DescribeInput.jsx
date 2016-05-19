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
        characterCount: React.PropTypes.number,
        onGainFocus: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    },

    /**
     * Returns the default values for props in the component.
     * @method getDefaultProps
     * @return {Object}
     */
    getDefaultProps() {
        return {
            maxCharacterCount: 50
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
                       placeholder={this.props.prompt} value={this.props.descriptionString}
                       onFocus={this.props.onGainFocus} spellCheck="true"
                       readonly="true"/>
                <span className="character-count">{this.props.characterCount}/{this.props.maxCharacterCount}</span>
            </div>
        );
    }
});

export default DescribeInput;
