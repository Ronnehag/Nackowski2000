import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAuction } from '../../store/actions/auctionAction';

class SearchForm extends Component {

    state = {
        searchText: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(() => this.props.dispatch(searchAuction(this.state))
        )
    }

    render() {
        return (<div>
            <form onSubmit={this.handleSubmit} className="form-inline">
                <div className="input-group">
                    <input type="text" onChange={this.handleChange} name="searchText" id="searchText" className="form-control-sm" placeholder="Sök auktioner" />
                </div>
                <div className="input-group">
                    <button type="submit" className="btn-sm btn-light ml-2">Sök</button>
                </div>
            </form>
        </div>);
    }
}

export default connect()(SearchForm);