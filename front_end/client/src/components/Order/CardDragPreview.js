import React, { PropTypes } from 'react';
import Card from './Cards/Card';

const styles = {
  display: 'block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const propTypes = {
  card: PropTypes.object
};

const CardDragPreview = (props) => {
  styles.width = `${props.card.clientWidth || 200}px`;
  styles.height = `${props.card.clientHeight || 200}px`;

  return (
    <div 
    style={styles} 
    //className= 'drag_preview'
    >
      <Card item={props.card.item} />
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
