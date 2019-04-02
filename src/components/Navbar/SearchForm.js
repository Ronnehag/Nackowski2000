import React, { Component } from 'react';

class SearchForm extends Component {
    render() {
        return (<div>
            <form className="form-inline">
                <div className="input-group">
                    <input type="text" className="form-control-sm" placeholder="Sök auktioner" />
                </div>
                <div className="input-group">
                    <button type="submit" className="btn-sm btn-light ml-2">Sök</button>
                </div>
            </form>
        </div>);
    }
}

export default SearchForm;