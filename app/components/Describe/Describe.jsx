import React from 'react';
import styles from './Describe.css';

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
            <div className={styles.describe}>
                <h1>Describe</h1>
                <img alt="Write a description of this" src="http://lorempixel.com/800/450/"/>
                <input className={styles.descriptionInput}/>
                <button className={styles.okButton}>OK</button>
            </div>
        );
    }
});

export default Describe;
