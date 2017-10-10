/**
 * Created by hautruong on 10/9/17.
 */
import * as types from './actionTypes'
import OrderApi from '../Api/OrderApi'

export function createOrderAction(data) {
  return function (dispatch) {
    return OrderApi.createOrders(data).then(res => {
      dispatch({
        type: types.CREATE_ORDER_SUCCESS,
        payload: {}
      })

      return res
    }).catch(error => {
      console.log(error)
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: { type: 'danger', value: 'something_went_wrong' } })
      return {}
    })
  }
}

export function updateOrderAction(id, data) {
  return function (dispatch) {
    return OrderApi.updateOrders(id, data).then(res => {
      dispatch({
        type: types.UPDATE_ORDER_SUCCESS,
        payload: { id: id, data: res }
      })

      return res
    }).catch(error => {
      console.log(error)
      dispatch({ type: types.UPDATE_ORDER_ERROR, payload: { type: 'danger', value: 'something_went_wrong' } })
      return {}
    })
  }
}

export function getOrdersAction(data) {
  return function (dispatch) {
    return OrderApi.getOrders(data).then(res => {
      dispatch({
        type: types.LOAD_LIST_ORDER_SUCCESS,
        payload: res
      })

      return res;
    }).catch(error => {
      console.log(error)
      dispatch({ type: types.LOAD_LIST_ORDER_ERROR, payload: { type: 'danger', value: 'something_went_wrong' } })
      return {}
    })
  }
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: types.MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: types.MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: types.TOGGLE_DRAGGING, isDragging });
  };
}