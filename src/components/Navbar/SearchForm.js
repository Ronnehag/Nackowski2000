import React from 'react';
import { connect } from 'react-redux';
import { searchAuction } from '../../store/actions/auctionAction';
import { withRouter } from 'react-router-dom'

class SearchForm extends React.Component {

    static initialState = () => {
        return {
            searchText: '',
        }
    }

    state = SearchForm.initialState();

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(searchAuction(this.state.searchText));
        this.setState(SearchForm.initialState(), () => {
            this.props.history.push("/search");
        });

    }

    render() {
        return (<div className="ml-2">
            <form onSubmit={this.handleSubmit} className="form-inline">
                <div className="input-group">
                    <input type="text" onChange={this.handleChange} value={this.state.searchText} name="searchText" id="searchText" className="form-control-sm" placeholder="Sök auktioner" />
                </div>
                <div className="input-group">
                    <button type="submit" className="btn-sm btn-light ml-2">Sök</button>
                </div>
            </form>
        </div>);
    }
}

export default withRouter(connect()(SearchForm));