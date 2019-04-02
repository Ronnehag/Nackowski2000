import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';

class NavigationBar extends Component {
    render() {
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
                        <SearchForm/>
                        <div className="ml-auto">                            
                            <LoginForm />
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


export default NavigationBar
