import * as types from '../../actions/actionTypes';
import initialState from '../initialState';
import { get } from 'lodash';

export default function OrderReducer(state = initialState.orders, action) {
    switch (action.type) {
        case types.LOAD_LIST_ORDER_SUCCESS:
            return Object.assign({}, state, {
                lists: action.payload
            });
        case types.LOAD_LIST_ORDER_ERROR:
            return Object.assign({}, state, action.payload);
        case types.UPDATE_ORDER_SUCCESS:
            let id = action.payload.id;
            let currentList = get(state, 'lists.results', []);
            let items = currentList.map(item => {
                if (item.id === id) {
                    return action.payload.data;
                }
                return item;
            })
            return Object.assign({}, state, {
                lists: { ...state.lists, results: items }
            });
        case types.DELETE_ORDER_SUCCESS:
            let idd = action.payload.id;
            let currentLists = get(state, 'lists.results', []);
            let itemss = currentLists.filter(item => {
                return (item.id !== idd)
            })
            return Object.assign({}, state, {
                lists: { ...state.lists, results: itemss }
            });
        default:
            return state;
    }
}