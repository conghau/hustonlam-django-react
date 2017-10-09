import {combineReducers} from 'redux';
import {intlReducer} from 'react-intl-redux';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        intl: intlReducer,
        ...asyncReducers
    });
};

export const injectReducer = (store, {key, reducer}) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
