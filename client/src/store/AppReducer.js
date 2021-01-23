import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
// "regenerator-runtime/runtime" is imported to allow async actions to be transpiled by Babel without any issues.
import "regenerator-runtime/runtime";
import authReducer from './AuthReducer';
import cartReducer from './CartReducer';
import productsReducer from './ProductsReducer';
import rootSaga from './saga/RootSaga';
import areaReducer from './AreaReducer';
import shopReducer from './ShopReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
    authReducer,
    productsReducer,
    cartReducer,
    areaReducer,
    shopReducer,
});

const ENV_VERSION = process.env.ENV_VERSION || 'development';

const store = createStore(
    rootReducers,
    {},
    compose(
        applyMiddleware(sagaMiddleware),
        ENV_VERSION === 'development' && window.devToolsExtension ? window.devToolsExtension() : (f) => f // for debugging
    )
);

sagaMiddleware.run(rootSaga);

export default store;