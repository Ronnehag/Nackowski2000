import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authAction';

export class LoginForm extends Component {

    state = {
        username: ""
    }

    handleChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.username === "") return;
        this.props.dispatch(loginUser(this.state.username));
    }

    render() {
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit} id="loginForm">
                    <div className="input-group">
                        <input type="text" onChange={this.handleChange} className="form-control-sm" placeholder="Användarnamn" />
                        <button type="submit" className="btn-sm btn-custom ml-2"><i class="fas fa-sign-in-alt"></i> Logga in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(LoginForm)
