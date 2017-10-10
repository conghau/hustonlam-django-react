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

  return (
    // <div style={style} className="item" id={style ? item.id : null}>
    //   <div className="item-name">{item.status}</div>
    //   <div className="item-container">
    //     <div className="item-avatar-wrap">
    //       {/* <img src={`https://randomuser.me/api/portraits/med/men/${item.id}.jpg`} alt="" /> */}
    //     </div>
    //     <div className="item-content">
    //       <div className="item-author">{`${item.o_from} ${item.o_to} ${item.quantity}`}</div>
    //     </div>
    //   </div>
    //   <div className="item-perfomers">
    //     <div className="delete-perfomers">
    //       <a href="#"><img src={delPng} alt="Delete perfomers" /></a>
    //       <div className="perfomer">
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div style={style} className="item" id={style ? item.id : null}>
      <ListItem
        leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={color} />}
        rightIcon={<ActionInfo />}
        primaryText={`From: ${item.o_from} \n To:${item.o_to} \n Qty:${item.quantity}`}
        secondaryText={monent(item.created_at, 'YYYY-MM-DD H:i:s').format('YYYY-MM-DD')}
      />
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
