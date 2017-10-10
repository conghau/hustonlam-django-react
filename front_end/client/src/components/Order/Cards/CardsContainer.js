import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import { Badge } from 'react-bootstrap';
import Cards from './Cards';

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
        monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};

@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    total: PropTypes.number,
  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging, total, deleteCard } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div className="portlet light bordered" style={{ opacity }}>
        <div className="portlet-title">
          <div className="caption">
            <i className="icon-speech"></i>
            <span className="caption-subject bold uppercase"> {item.name} <Badge className="info">{total || 0}</Badge></span>
          </div>
          <div className="actions">
            {/* <a href="javascript:;" class="btn btn-circle btn-default">
              <i className="fa fa-plus"></i> Add </a> */}
          </div>
        </div>
        <div className="portlet-body">
          <div className="desk">
            <Cards
              moveCard={moveCard}
              x={x}
              cards={item.items}
              startScrolling={this.props.startScrolling}
              stopScrolling={this.props.stopScrolling}
              isScrolling={this.props.isScrolling}
            />
          </div>
        </div>
      </div>
    ));
  }
}
