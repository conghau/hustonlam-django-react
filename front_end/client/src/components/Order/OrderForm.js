/**
 * Created by hautruong on 10/9/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {grey400} from 'material-ui/styles/colors'
import {Col, Row, Alert} from 'react-bootstrap'
import {get, isEmpty} from 'lodash'
import PageBase from '../../components/common/PageBase'

class OrderForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.getDefaultState();
        ['onChange', 'onSave', 'onReset'].forEach((method) => this[method] = this[method].bind(this))
    }

    getDefaultState() {
        return {
            from: '',
            to: '',
            quantity: '',
            canSubmit: false,
            validationMessages: {},
            saveResult: '',
        }
    }

    onChange(event, newValue) {
        let formControlValue = {};
        if (newValue === null) {
            formControlValue[event.target.name] = event.target.value
        } else {
            formControlValue[event.target.name] = newValue
        }
        this.setState(formControlValue)
    }

    onReset() {
        let defaultState = this.getDefaultState();
        this.setState({...defaultState})
    };

    onSave() {
        let validateMessages = {};
        ['from', 'to', 'quantity'].map(field => {
            if (get(this.state, `${field}`, '') === '') {
                validateMessages[field] = 'This field is required'
            }
        });

        if (!isEmpty(validateMessages)) {
            this.setState({canSubmit: false, validationMessages: validateMessages})
        } else {
            let data = {
                o_from: this.state.from || '',
                o_to: this.state.to || '',
                quantity: this.state.quantity || 0
            };
            this.setState({canSubmit: true, saveResult: '', validateMessages: validateMessages}, () => {
                this.props.handleSave(data).then(res => {
                    if (isEmpty(res)) {
                        this.setState({saveResult: 'error'})
                    } else {
                        this.setState({saveResult: 'success'})
                    }
                })
            });
        }
    }

    render() {
        const styles = {
            toggleDiv: {
                maxWidth: 300,
                marginTop: 40,
                marginBottom: 5
            },
            toggleLabel: {
                color: grey400,
                fontWeight: 100
            },
            buttons: {
                marginTop: 30,
                float: 'right'
            },
            saveButton: {
                marginLeft: 5
            }
        }

        const {validationMessages, saveResult} = this.state;
        return (
            <Row>
                {(saveResult === 'error') &&
                <Alert>Some thing went wrong</Alert>
                }

                {(saveResult === 'success') &&
                <Alert>Place order successfully</Alert>
                }

                <Col md={12}>
                    <PageBase title={'Place Order'}>
                        <form>
                            <TextField
                                name="from"
                                value={this.state.from || ''}
                                onChange={this.onChange}
                                hintText="From"
                                floatingLabelText="From"
                                fullWidth={true}
                                errorText={validationMessages['from'] || ''}
                            />

                            <TextField
                                name="to"
                                value={this.state.to || ''}
                                hintText="To"
                                floatingLabelText="To"
                                fullWidth={true}
                                onChange={this.onChange}
                                errorText={validationMessages['to'] || ''}
                            />

                            <TextField
                                name="quantity"
                                value={this.state.quantity || ''}
                                type="number"
                                hintText="Quantity"
                                floatingLabelText="Quantity"
                                fullWidth={true}
                                onChange={this.onChange}
                                errorText={validationMessages['quantity'] || ''}
                            />

                            <div style={styles.buttons}>
                                <RaisedButton
                                    label="Reset"
                                    onClick={this.onReset}
                                />

                                <RaisedButton
                                    onClick={this.onSave}
                                    label="Save"
                                    style={styles.saveButton}
                                    primary={true}/>
                            </div>
                        </form>
                    </PageBase>
                </Col>
            </Row>
        )
    }
}

OrderForm.propTypes = {
    handleSave: PropTypes.func.isRequired
}

export default OrderForm