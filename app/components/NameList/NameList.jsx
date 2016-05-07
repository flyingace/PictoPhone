import React from 'react';
import './NameList.scss';

/**
 * NameList class.
 * @class NameList
 * @augments React.Component
 */
const NameList = React.createClass(/** @lends NameList.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'NameList',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: React.PropTypes.string
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="nameList">
                <h2>Select Your Name</h2>
                <ul>
                    <li>Bobby Vasquez</li>
                    <li>David Cameron</li>
                    <li>Dennis Fung</li>
                    <li>Eran Bendheim</li>
                    <li>Lei Zhu</li>
                    <li>Bobby A</li>
                    <li>Bobby B</li>
                </ul>
                <button className="button full">OK</button>
            </div>
        );
    }
});

export default NameList;
