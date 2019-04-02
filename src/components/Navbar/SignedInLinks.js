import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class SignedInLinks extends Component {
    render() {
        const { username } = this.props;
        return (

            <div>
                <div className="form-inline">
                    <div className="input-group">
                        <span className="navbar-text">{username}</span>
                    </div>
                    <div className="input-group">
                        <Link to="/newauction" className="nav-link">Ny auktion</Link>
                    </div>
                        <div className="input-group">
                            <button className="btn-sm btn-custom ml-2">Logga ut</button>
                        </div>
                    </div>
                </div>

        )
    }
}

export default connect()(SignedInLinks);
