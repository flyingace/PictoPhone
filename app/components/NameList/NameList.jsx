import { map, isEmpty } from 'lodash';
import React, { PropTypes } from 'react';
import cx from 'classnames';
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
        nameList: PropTypes.object,
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

    selectName(key) {
        this.setState({ selectedKey: key });
    },

    // http://codepen.io/seansean11/pen/fBjIi
    renderCheckSVG() {
        return (
            <div className="check-wrapper">
                <svg version="1.1" id="Layer_1" x="0px" y="0px"
                    viewBox="0 0 98.5 98.5" enable-background="new 0 0 98.5 98.5" xmlSpace="preserve">
                    <path className="checkmark" fill="none" strokeWidth="6" strokeMiterlimit="10" d="M81.7,17.8C73.5,9.3,62,4,49.2,4C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"/>
                </svg>
            </div>
        );
    },

    renderNameList() {
        let nameList;

        if (isEmpty(this.props.nameList)) {
            nameList = 'Name not found';
        } else {
            const names = map(this.props.nameList, (playerData, playerID) => {

                if (playerData.played) {
                    return (
                        <li
                            key={playerID}
                            data-uid={playerID}
                            className="played">
                            {playerData.name}
                        </li>
                    );
                }

                const nameSelectedClass = cx({
                    'selected': playerID === this.state.selectedKey
                });

                return (
                    <li
                        key={playerID}
                        data-uid={playerID}
                        onClick={ () => {
                            this.selectName(playerID)
                        }}
                        className={nameSelectedClass}>
                        {playerData.name}
                        {this.renderCheckSVG()}
                    </li>
                );
            });

            nameList = (
                <ul>{ names }</ul>
            );
        }

        return nameList;
    },

    nameSelectionHandler() {
        if (this.props.onNameSelected) {
            this.props.onNameSelected(this.state.selectedKey)
        }
    },

    render() {
        return (
            <div className="nameList">
                <p><span className="bold-text">SELECT YOUR NAME</span></p>
                <div className="nameListContainer">
                    { this.renderNameList() }
                </div>
                <button className="button full" onClick={this.nameSelectionHandler}>OK</button>
            </div>
        );
    }
});

export default NameList;
