/**
 * Created by hautruong on 10/9/17.
 */
import * as types from './actionTypes'
import OrderApi from '../Api/OrderApi'

export function createOrderAction (data) {
  return function (dispatch) {
    return OrderApi.createOrders(data).then(res => {
      dispatch({
        type: types.CREATE_ORDER_SUCCESS,
        payload: {}
      })

      return res
    }).catch(error => {
      console.log(error)
      dispatch({type: types.CREATE_ORDER_SUCCESS, payload: {type: 'danger', value: 'something_went_wrong'}})
      return {}
    })
  }
}