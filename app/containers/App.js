import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
          <ul className="temp-nav">
              <li><IndexLink to="/">Welcome Page</IndexLink></li>
              <li><Link to="describe">Describe Page</Link></li>
              <li><Link to="draw">Draw Page</Link></li>
              <li><Link to="thankYou">Thank You Page</Link></li>
          </ul>
      </div>
    );
  }
}
