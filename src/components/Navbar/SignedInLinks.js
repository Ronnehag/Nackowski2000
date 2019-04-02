import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SignedInLinks extends Component {
    render() {
        const { username } = this.props;
        return (
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="navbar-text">{username}</span>
                    </li>
                    <li className="nav-item">
                        <Link to="/newauction" className="nav-link">Ny auktion</Link>
                    </li>
                </ul>
                <div className="form-inline">
                    <button className="btn-sm btn-custom">Logga Ut</button>
                </div>
            </div>
        )
    }
}

export default connect()(SignedInLinks);
