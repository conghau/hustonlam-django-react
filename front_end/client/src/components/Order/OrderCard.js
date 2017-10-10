/**
 * Created by hautruong on 10/9/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class OrderCard extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <Card>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
            </Card>
        );
    }
}
export default OrderCard;