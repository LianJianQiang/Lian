// if (process.env.NODE_ENV === 'production') {
//     module.exports = require('./Root.prod')
// } else {
//     module.exports = require('./Root.dev')
// }

import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import App from 'containers';
import DevTools from 'containers/DevTools';


class RootProd extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path='/' component={App}></Route>
                </BrowserRouter>
                {
                    process.env.NODE_ENV !== 'production' ?
                        <DevTools/> : ''
                }
            </div>
        );
    }
}

export default RootProd;
