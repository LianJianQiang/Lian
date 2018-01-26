import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import 'antd/dist/antd.css';

import configureStore from 'store/configureStore';
import Root from 'store/Roots';

let store = configureStore();

render(
    <AppContainer>
        <Provider store={store}>
            <Root/>
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);

