/* global
 lang, iCareLocale
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {browserHistory, Router} from 'react-router';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme();

class AppContainer extends Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const intlData = {
            locale: 'en',
            messages: {}
        };
        const {routes, store} = this.props;
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <IntlProvider {...intlData}>
                        <div style={{height: '100%'}}>
                            <Router history={browserHistory} children={routes}/>
                        </div>
                    </IntlProvider>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default AppContainer;
