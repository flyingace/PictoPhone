import React from 'react';
import { map } from 'lodash';
import './Welcome.scss';
import NameList from '../NameList/NameList';

const TABS_LIST_ONE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const TABS_LIST_TWO = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
        filterNameList: React.PropTypes.func,
        welcome: React.PropTypes.object
    },

    componentWillMount() {
        this.props.fetchWelcomeData('get/welcome/api');
    },

    filterNames(event) {
        const letter = event.target.innerHTML;
        this.props.filterNameList(letter);
    },

    showAllNames() {
        this.props.filterNameList();
    },

    renderAlphabeticalTabs(tabsArr) {
        return map(tabsArr, (tab, index) => {
            return (
                <div
                    key={index}
                    className="alphabetical-tab"
                    onClick={this.filterNames}>
                    {tab}
                </div>
            );
        });
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
                <div className="leftSide">
                    <h1>PictoPhone</h1>
                    <p>This is some basic intro code to PictoPhone. It doesn't out line the rules because they're
                        outlined in "How To Play" at the bottom.</p>
                    <p>The <span className="bold-text">How To Play</span> link below will open an overlay with a few pages of
                        instructions. How does the overlay work here? Does it also have its own route or is it just
                        acomponent that overlays the other content? It might be useful to make it so the How To Play
                        overlay could be loaded at any step (except maybe <em>Thank You</em> so that first-time users
                        would know what to do.</p>
                    <p className="bold-text">How To Play</p>
                </div>
                <div className="rightSide">
                    <div className="nameList-col">
                        <NameList nameList={this.props.welcome.filteredNameList} />
                    </div>
                    <div className="alphabetical-tabs">
                        <div className="name-list__all" onClick={this.showAllNames}>Show All</div>
                        <div className="tabs-col-1">
                            {this.renderAlphabeticalTabs(TABS_LIST_ONE)}
                        </div>
                        <div className="tabs-col-2">
                            {this.renderAlphabeticalTabs(TABS_LIST_TWO)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Welcome;
