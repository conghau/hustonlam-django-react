import {combineReducers} from 'redux';
import {intlReducer} from 'react-intl-redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

export const rootReducer = (asyncReducers) => {
    return combineReducers({
        intl: intlReducer,
        ...asyncReducers,
        toastr: toastrReducer,
        ajaxCallsInProgress,
    });
};

export const injectReducer = (store, key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(rootReducer(store.asyncReducers));
};

export default rootReducer;
