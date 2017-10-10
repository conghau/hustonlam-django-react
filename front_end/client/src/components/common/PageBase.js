/**
 * Created by hautruong on 10/9/17.
 */

import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../../styles/index';
import {IndexLink, Link} from 'react-router'

const PageBase = (props) => {

    const {title, navigation} = props;

    return (
        <div>
            <span style={globalStyles.navigation}>{navigation}</span>

            <Paper style={globalStyles.paper}>
                <h3 style={globalStyles.title}>{title}</h3>

                <Divider/>
                {props.children}
                <div style={globalStyles.clear}/>
            </Paper>
        </div>
    );
};

PageBase.propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.string,
    children: PropTypes.element
};

export default PageBase;