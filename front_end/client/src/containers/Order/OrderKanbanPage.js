/**
 * Created by hautruong on 10/9/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import { Row, Col } from 'react-bootstrap';
import PageBase from '../../components/common/PageBase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as OrderActions from '../../actions/OrderActions'
import { isEmpty, get } from 'lodash'
import CardsContainer from '../../components/Order/Cards/CardsContainer';
import CustomDragLayer from '../../components/Order/CustomDragLayer';
import { ORDER_STATE } from '../../constanst'
import moment from 'moment'

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
			isloaded: true,
			isScrolling: false,
			last_refresh: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
			lastUpdated: null,
		};

		['startScrolling', 'stopScrolling', 'scrollRight', 'scrollLeft', 'moveCard', 'moveList', 'prepareDateRender', 'getOrdersAction'].forEach((method) => this[method] = this[method].bind(this))

	}

	getChildContext() {
		return {
			deleteCard: this.handleDeleteCard.bind(this),
		}
	}

	componentWillMount() {
		this.getOrdersAction();
	}

	componentDidMount() {
		if (typeof saveToDraftAfterSeconds === 'undefined' || saveToDraftAfterSeconds === 0) {
			var saveToDraftAfterSeconds = 20;
		}
		this.intervalGetOrdersAction = setInterval(this.getOrdersAction, parseInt(saveToDraftAfterSeconds) * 1000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalGetOrdersAction);
	}

	getOrdersAction() {
		const { isloaded } = this.state;
		if (isloaded) {
			console.log('getOrdersAction');
			this.setState({ isloaded: false }, () => {
				this.props.actions.getOrdersAction().then(re => {
					this.setState({ isloaded: true, last_refresh: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss") })
				}).catch(err => {
					console.log(err);
					this.setState({ isloaded: true })
				});
			});
		}
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


	handleDeleteCard(orderId) {
		const self = this;
		if (orderId) {
			self.props.actions.deleteOrdersAction(orderId);
		}
	}
	moveCard(lastX, lastY, nextX, nextY, orderId) {
		this.props.actions.moveCard(lastX, lastY, nextX, nextY);
		const self = this;
		if (orderId && lastX != nextX) {
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
		let lastUpdated = null;
		if (!isEmpty(lists)) {
			lastUpdated = lists[0].updated_at;
		}
		lists.map(order => {
			if (order.updated_at > lastUpdated) {
				lastUpdated = order.updated_at;
			}
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

		return {
			lastUpdated: lastUpdated,
			ordersGroup: [{ id: ORDER_STATE.NEW, name: ORDER_STATE.NEW, items: newOrder, total: newOrder.length },
			{ id: ORDER_STATE.PROCESSING, name: ORDER_STATE.PROCESSING, items: proccessOrder, total: proccessOrder.length },
			{ id: ORDER_STATE.FINISHED, name: ORDER_STATE.FINISHED, items: fishnishOrder, total: fishnishOrder.length }],
		};
	}

	render() {
		const newData = this.prepareDateRender();
		const { lastUpdated, ordersGroup } = newData;
		const { last_refresh } = this.state;
		return (
			<div>
				<div className='order_kanban_info_system'>
					<p>Current time: {moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss")}</p>
					<p>Last refesh: {last_refresh}</p>
					{lastUpdated &&
						<p>Last update: {moment(lastUpdated, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}</p>
					}
				</div>
				<div style={{ "clear": "both" }} />
				<main>
					<div style={{ height: '100%' }}>
						<PageBase>
							<div className="__CardsContainer">
								<CustomDragLayer snapToGrid={false} />
								{ordersGroup && ordersGroup.map((item, i) =>
									<Col md={4} sm={4} key={item.id}>
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
									</Col>
								)}
							</div>
						</PageBase>
					</div>
				</main>
			</div>

		);
	}
}
OrderKanbanPage.childContextTypes = {
	deleteCard: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(OrderActions, dispatch) }
}
function mapStateToProps(state, ownProps) {
	let listOrder = get(state, 'order.lists' || []);
	return { orders: listOrder }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(OrderKanbanPage))