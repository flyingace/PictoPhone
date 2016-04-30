import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import WelcomePage from './containers/WelcomePage';
import DescribePage from './containers/DescribePage';
import DrawPage from './containers/DrawPage';
import ThankYouPage from './containers/ThankYouPage';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={WelcomePage}/>
        <Route path="/describe" component={DescribePage}/>
        <Route path="/draw" component={DrawPage}/>
        <Route path="/thankYou" component={ThankYouPage}/>
    </Route>
);
