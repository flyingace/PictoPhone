import React from 'react';

import styles from './Key.css';

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
        letterValue: React.PropTypes.string
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className={styles.key}>{this.props.letterValue}</div>
        );
    }
});

export default Key;
