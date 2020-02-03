import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input ,Col} from 'reactstrap';
import validator from 'validator';
import { actionCreators } from '../../store/user_Auth';

class Login_Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            password: '',
            errors: '',
            email_err: 'Wprowadż email',
            password_err: 'Wprowadż hasło',
            loading: false,
            disabled: true,
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state);
        this.props.history.push('/');
    }


    onChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        switch (name) {
            case 'email':
                this.setState({ email: value })
                if (validator.isEmail(value)) {
                    this.setState({ email_err: '' })
                }
                else
                    this.setState({ email_err: 'Nieprawidłowy email' })
                break;
            case 'password':
                this.setState({ password: value })
                if (value.length > 4) {
                    this.setState({ password_err: '' })
                }
                else
                    this.setState({ password_err: 'Nieprawidlowe hasło' })
                break;
            default:
                console.log("Unknown");
                break;
        }

        if (this.state.email_err.length > 0 && this.state.password_err.length > 0)
            this.setState({ disabled: true })
        else
            this.setState({ disabled: false })
    }

    render() {
        return (
            <div>
                <Form>
                    <h1>Login</h1>
                    <Col sm={{ size: 4, order: 2, offset: 1 }}>
                        <FormGroup>
                            <Label htmlFor="email" class="control-label">Email</Label>
                            <Input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} />
                            {this.state.errors.email_err > 0 && <p>{this.state.email_err}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password" class="control-label">Password</Label>
                            <Input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} />
                            {this.state.password_err.length > 0 && <p>{this.state.password_err}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" disabled={this.state.disabled} onClick={this.onSubmit}>Załoguj się</Button>
                        </FormGroup>
                    </Col>
                </Form>
            </div>
        );
    }
}

export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login_Form);
