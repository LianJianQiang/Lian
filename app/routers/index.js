import React from 'react';
import {Router, Route} from 'react-router';

import App from '../containers';

let createRouter = () => {
    return (
        <Router>
            <Route path='/' component={App}></Route>
        </Router>
    );
};

export default createRouter();
