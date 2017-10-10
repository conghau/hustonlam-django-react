import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600, black } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import { ORDER_STATE } from '../../../constanst'
import monent from 'moment'

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const galPng = require('../../../components/common/assets/images/gal.png');
const delPng = require('../../../components/common/assets/images/del.png');


const Card = (props) => {
  const { style, item } = props;
  let color = (item.status === ORDER_STATE.NEW ? yellow600 : (item.status === ORDER_STATE.PROCESSING ? blue500 : black));
  let finishTime = item.finish_time || 0;
  const now = monent.utc();
  const createdAt = monent.utc(item.created_at, 'YYYY-MM-DD HH:mm:ss');
  let durationTime = (now.unix() - createdAt.unix())/60;
  return (
    <div style={style} className={`item ${item.status}`} id={style ? item.id : null}>
      <div className="item-name">#{item.id}
        {(durationTime > finishTime) &&
          <div className="badge finishtime_expired">Expired</div>
        }
        <div className="delete-perfomers">
          <a href="#"><img src={delPng} alt="Delete perfomers" /></a>
        </div>
      </div>
      <div className="item-container">
        <div className="item-content">
          <span className="line">From: {item.o_from}</span>
          <span className="line">To: {item.o_to}</span>
          <span className="line">Qty: {item.quantity}</span>
          <span className="line">Created at: {monent(item.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}</span>
          <span className="line">Updated at: {monent(item.updated_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      </div>
      {/* <ListItem
        leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={color} />}
        rightIcon={<ActionInfo />}
        primaryText={`From: ${item.o_from} \n To:${item.o_to} \n Qty:${item.quantity}`}
        secondaryText={monent(item.created_at, 'YYYY-MM-DD H:i:s').format('YYYY-MM-DD')}
      /> */}
    </div>

  );
};

Card.propTypes = propTypes;

export default Card;
