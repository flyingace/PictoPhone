import React from 'react';
import ColorPalette from '../ColorPalette/ColorPalette';
import DrawingArea from '../DrawingArea/DrawingArea';
import DrawingToolbar from '../DrawingToolbar/DrawingToolbar';
import './Draw.scss';

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
      <div className="draw">
          <DrawingToolbar />
          <DrawingArea />
          <ColorPalette />
          <p>Phrase to come.</p>
          <div className="button">Clear All</div>
          <div className="button">OK</div>
      </div>
    );
  }
});

export default Draw;
