import React from 'react';
import { connect } from 'react-redux';
import { searchAuction } from '../../store/actions/auctionAction';
import { Redirect } from 'react-router-dom'

class SearchForm extends React.Component {

    state = {
        searchText: '',
        redirect: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(searchAuction(this.state.searchText))
        this.setState({ redirect: true });
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return (<Redirect to="/search" />)
        }

        return (<div className="ml-2">
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