import React from 'react';
import styles from './Draw.css';

/**
 * Draw class.
 * @class Draw
 * @augments React.Component
 */
const Draw = React.createClass(/** @lends Draw.prototype */{
  /**
   * @property {String} displayName - A string used in debugging messages.
   */
  displayName: 'Draw',

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
      <div className={styles.draw}>
        <h1>Draw</h1>
      </div>
    );
  }
});

export default Draw;
