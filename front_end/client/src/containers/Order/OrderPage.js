import  React  from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as OrderActions from '../../actions/OrderActions'
import OrderForm from '../../components/Order/OrderForm'

class OrderPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        ['handleSave'].forEach((method) => this[method] = this[method].bind(this))

    }

    handleSave(data) {
        return this.props.actions.createOrderAction(data);
    }

    render() {
        return <OrderForm handleSave={this.handleSave}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {actions: bindActionCreators(OrderActions, dispatch)}
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
