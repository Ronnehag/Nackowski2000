import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">AuctionSite</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Hem</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Details">Detaljer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/newauction">Skapa auktion</Link>
                            </li>
                        </ul>
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
