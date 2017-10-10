/**
 * Created by hautruong on 10/9/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {isEmpty} from 'lodash'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class OrderCards extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {items} = this.props;
        const lanes = items.map(lane =>
            (
                <Card>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </CardText>
                </Card>
            ),
          );
      
          return (
            <div className="lanes">
              {lanes}
            </div>
          );
    }
}

OrderCards.propTypes = {
    items: PropTypes.array,
    onDelete: PropTypes.func,
    onMove:PropTypes.func
}
export default OrderCards;