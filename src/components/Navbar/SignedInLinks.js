import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authAction';

export class SignedInLinks extends Component {

    handleClick = () => {
        this.props.dispatch(logoutUser());
    }

    render() {
        const user = sessionStorage.getItem("user");
        return (
            <div>
                <div className="form-inline" id="signout">
                    <div className="input-group">
                        <span className="navbar-text text-white mr-2">Welcome <strong>{user}</strong></span>
                        <button className="btn-sm btn-custom ml-2" onClick={this.handleClick}><i class="fas fa-sign-in-alt"></i> Logga ut</button>
                    </div>

                </div>
            </div>

        )
    }
}

export default connect()(SignedInLinks);
