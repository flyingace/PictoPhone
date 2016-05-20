import { map, isEmpty } from 'lodash';
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
        nameList: React.PropTypes.array
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */

    renderNameList() {
        let nameList;

        if (isEmpty(this.props.nameList)) {
            nameList = 'Name not found';
        } else {
            const names = map(this.props.nameList, (listItem, index) => {
                return (
                    <li key={ index }>{ listItem.name }</li>
                );
            });

            nameList = (
                <ul>{ names }</ul>
            );
        }

        return nameList;
    },

    render() {
        return (
            <div className="nameList">
                <p><span className="bold-text">SELECT YOUR NAME</span></p>
                <div className="nameListContainer">
                    { this.renderNameList() }
                </div>
                <button className="button full">OK</button>
            </div>
        );
    }
});

export default NameList;
