import { map, isEmpty } from 'lodash';
import React, { PropTypes } from 'react';
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
        nameList: PropTypes.array,
        onNameSelected: PropTypes.func
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */

    getInitialState() {
        return {
            selectedNameIndex: null
        };
    },

    selectName(index) {
        this.setState({ selectedNameIndex: index });
    },

    renderNameList() {
        let nameList, nameSelectedClass;

        if (isEmpty(this.props.nameList)) {
            nameList = 'Name not found';
        } else {
            const names = map(this.props.nameList, (listItem, index) => {
                if (index === this.state.selectedNameIndex) {
                    nameSelectedClass = 'selected';
                } else {
                    nameSelectedClass = null;
                }

                return (
                    <li
                        key={ index }
                        onClick={() => {this.selectName(index)}}
                        className={nameSelectedClass}>{ listItem.name }</li>
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
                <button className="button full" onClick={this.props.onNameSelected}>OK</button>
            </div>
        );
    }
});

export default NameList;
