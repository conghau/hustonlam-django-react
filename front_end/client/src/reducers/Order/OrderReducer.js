import * as types from '../../actions/actionTypes';
import initialState from '../initialState';
import _ from 'lodash';

export default function TodoReducer(state = initialState.todoList, action) {
    switch (action.type) {
        case types.LOAD_TODO_LIST_SUCCESS:
            return Object.assign({}, state, {
                todos: action.payload
            });
        case types.LOAD_TODO_LIST_ERROR:
            return Object.assign({}, state, action.payload);
        case types.LOAD_TODO_DETAIL_LIST_SUCCESS:
            // return Object.assign({}, state, ...{
            //     todoItems: action.payload
            // });
            return Object.assign({}, state, {
                todoItems : [
                    ...state.todoItems.filter(item => item.id !== action.payload.id),
                    Object.assign({}, action.payload)
                ]});
        case types.LOAD_TODO_DETAIL_LIST_ERROR:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}