import React from 'react';
import './Welcome.scss';
import NameList from '../NameList/NameList';

/**
 * Welcome class.
 * @class Welcome
 * @augments React.Component
 */
const Welcome = React.createClass(/** @lends Welcome.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Welcome',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        fetchWelcomeData: React.PropTypes.func,
        welcome: React.PropTypes.object
    },

    componentWillMount() {
        this.props.fetchWelcomeData('get/welcome/api');
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="welcome cf">
                <h1>PictoPhone</h1>
                <div className="leftSide">
                    <p>This is some basic intro code to PictoPhone. It doesn't out line the rules because they're
                        outlined in "How To Play" at the bottom.</p>
                    <p>The <span className="bold">How To Play</span> link below will open an overlay with a few pages of
                        instructions. How does the overlay work here? Does it also have its own route or is it just
                        acomponent that overlays the other content? It might be useful to make it so the How To Play
                        overlay could be loaded at any step (except maybe <em>Thank You</em> so that first-time users
                        would know what to do.</p>
                    <p className="bold">How To Play</p>
                </div>
                <div className="rightSide">
                    <NameList
                        nameList={this.props.welcome.nameList}
                    />
                </div>
            </div>
        );
    }
});

export default Welcome;
