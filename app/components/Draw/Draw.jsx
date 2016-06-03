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
    children: React.PropTypes.string,
      description: React.PropTypes.string
  },
    
    getDefaultProps() {
      return {
          description: 'Three cows eating grass in France.'
      }  
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
          <p className="description">{this.props.description}</p>
          <div className="button clear-all">Clear All</div>
          <div className="button submit-picture">OK</div>
      </div>
    );
  }
});

export default Draw;
