import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'modules';
import DevTools from 'containers/DevTools';


const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../modules', () => {
            const nextRootReducer = require('../modules').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};

export default configureStore;
