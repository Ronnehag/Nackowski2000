import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import SignedInLinks from './SignedInLinks';

class NavigationBar extends Component {
    render() {
        const user = sessionStorage.getItem("user");
        const { username, isLoggedIn } = this.props.user;
        return (
            <div>
                <nav className="navbar navbar-expand-lg  nav-custom">
                    <Link className="navbar-brand ml-2" to="/">AuctionSite</Link>
                    <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Hem</Link>
                            </li>
                        </ul>
                        <SearchForm />
                        <div className="ml-auto">
                            {isLoggedIn || user ? <SignedInLinks /> : <LoginForm />}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};


export default connect(mapStateToProps)(NavigationBar);
