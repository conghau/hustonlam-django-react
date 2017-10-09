/**
 * Created by hautruong on 10/9/17.
 */
import $ from 'jquery'
import {isEmpty} from 'lodash'

class OrderApi {
    static getDomain() {
        if (typeof base_url === 'undefined' || isEmpty(base_url))
        {
            return `${window.location.protocol}//${window.location.host}`
        }
        return base_url;
    }

    static createOrders(data) {
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