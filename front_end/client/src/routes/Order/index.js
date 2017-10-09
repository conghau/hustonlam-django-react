import {injectReducer} from 'reducers/index';

export function OrderRouter(store) {
    return {
        path: '/apps/order/',
        /* Async getComponent is only invoked when route matches */
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                /* Webpack - use require callback to define dependencies for building */
                const OrderPage = require('../../containers/Order/OrderPage').default;
                const OrderReducer = require('../../reducers/Order/OrderReducer').default;

                /* Add the reducer to the store on key 'counter' */
                injectReducer(store, 'order', OrderReducer);

                /* Return getComponent */
                cb(null, OrderPage);

                /* Webpack named bundle */
            }, 'order')
        }
    }
}