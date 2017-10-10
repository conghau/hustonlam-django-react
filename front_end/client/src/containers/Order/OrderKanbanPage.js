/**
 * Created by hautruong on 10/9/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import OrderCard from '../../components/Order/OrderCard'
import { Row, Col } from 'react-bootstrap';
import PageBase from '../../components/common/PageBase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as OrderActions from '../../actions/OrderActions'
import { isEmpty, get } from 'lodash'
import CardsContainer from '../../components/Order/Cards/CardsContainer';
import CustomDragLayer from '../../components/Order/CustomDragLayer';
import { ORDER_STATE } from '../../constanst'

class OrderKanbanPage extends Component {
	static propTypes = {
		moveCard: PropTypes.func,
		moveList: PropTypes.func,
		lists: PropTypes.array,
	}
	constructor(props) {
		super(props)
		this.state = {
			orders: [],
			ordersGroup: [],
		}
		this.state = { isScrolling: false };
		['startScrolling', 'stopScrolling', 'scrollRight', 'scrollLeft', 'moveCard', 'moveList', 'prepareDateRender'].forEach((method) => this[method] = this[method].bind(this))

	}

	componentWillMount() {
		this.props.actions.getOrdersAction();
	}

	componentWillReceiveProps(nextProps) {
		// if (!isEmpty(nextProps.lists)) {

		// }
	}

	startScrolling(direction) {
		// if (!this.state.isScrolling) {
		switch (direction) {
			case 'toLeft':
				this.setState({ isScrolling: true }, this.scrollLeft());
				break;
			case 'toRight':
				this.setState({ isScrolling: true }, this.scrollRight());
				break;
			default:
				break;
		}
		// }
	}

	scrollRight() {
		function scroll() {
			document.getElementsByTagName('main')[0].scrollLeft += 10;
		}
		this.scrollInterval = setInterval(scroll, 10);
	}

	scrollLeft() {
		function scroll() {
			document.getElementsByTagName('main')[0].scrollLeft -= 10;
		}
		this.scrollInterval = setInterval(scroll, 10);
	}

	stopScrolling() {
		this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
	}

	moveCard(lastX, lastY, nextX, nextY, orderId) {
		this.props.actions.moveCard(lastX, lastY, nextX, nextY);
		const self = this;
		if (orderId) {
			let status = (nextX === 0 ? ORDER_STATE.NEW : (nextX === 1 ? ORDER_STATE.PROCESSING : ORDER_STATE.FINISHED));

			self.props.actions.updateOrderAction(orderId, { 'status': status });
		}
	}

	moveList(listId, nextX) {
		const { lastX } = this.findList(listId);
		this.props.actions.moveList(lastX, nextX);
	}

	isDropped(boxName) {
		return this.state.droppedBoxNames.indexOf(boxName) > -1
	}

	prepareDateRender() {
		const { orders } = this.props;
		const lists = get(orders, 'results', []);

		// const ordersNew = orders.results || [];
		let newOrder = [];
		let proccessOrder = [];
		let fishnishOrder = [];

		lists.map(order => {
			if (order.status === ORDER_STATE.NEW) {
				newOrder.push(order);
			}
			if (order.status === ORDER_STATE.PROCESSING) {
				proccessOrder.push(order);
			}
			if (order.status === ORDER_STATE.FINISHED) {
				fishnishOrder.push(order);
			}
		})

		return [
			{ id: ORDER_STATE.NEW, name: ORDER_STATE.NEW, items: newOrder, total: newOrder.length },
			{ id: ORDER_STATE.PROCESSING, name: ORDER_STATE.PROCESSING, items: proccessOrder, total: proccessOrder.length },
			{ id: ORDER_STATE.FINISHED, name: ORDER_STATE.FINISHED, items: fishnishOrder, total: fishnishOrder.length },
		];
	}

	render() {
		let ordersGroup = this.prepareDateRender();
		return (
			<main>
			
			<div style={{ height: '100%' }}>
				<PageBase>
					<div>
						<CustomDragLayer snapToGrid={false} />
						{ordersGroup && ordersGroup.map((item, i) =>
							<CardsContainer
								key={item.id}
								id={item.id}
								item={item}
								moveCard={this.moveCard}
								moveList={this.moveList}
								startScrolling={this.startScrolling}
								stopScrolling={this.stopScrolling}
								isScrolling={this.state.isScrolling}
								x={i}
								total={item.total || 0}
							/>
						)}
					</div>
				</PageBase>
			</div>
			</main>

		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(OrderActions, dispatch) }
}
function mapStateToProps(state, ownProps) {
	let listOrder = get(state, 'order.lists' || []);
	return { orders: listOrder }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(OrderKanbanPage))