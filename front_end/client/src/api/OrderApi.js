/**
 * Created by hautruong on 10/9/17.
 */
import $ from 'jquery'

class OrderApi {
  static getDomain () {
    return 'http://localhost:8000/apps';
    // return `${window.location.protocol}//${window.location.host}`
  }

  static createOrders (data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: `${this.getDomain()}/api/v1/orders/`,
        data: data,
        dataType: 'json'
      }).done(function (res) {
        console.log(res);
        resolve(res)
      }).fail(function () {
        reject('Can not create new order')
      })
    })
  }
}

export default OrderApi