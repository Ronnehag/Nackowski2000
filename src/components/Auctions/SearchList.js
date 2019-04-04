import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auction from './Auction';
import moment from 'moment';

class SearchList extends Component {

    sortedList = () => {
        if (this.props.auctions.length) {
            return this.props.auctions.sort((a, b) => {
                if (a.SlutDatum === b.SlutDatum) return 0;
                return a.SlutDatum > b.SlutDatum ? 1 : -1;
            })
        }
        else {
            return [];
        }
    }

    render() {

        let filteredList = this.sortedList();

        const auctionList = filteredList.length > 0 ? filteredList.map((auction) => {
            let valid = auction.SlutDatum > moment().format();
            return (
                <Auction item={auction} key={auction.AuktionID} valid={valid} />
            )
        }) : (
                <div className="col-6 offset-6 mt-5 mt-10">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )

        if (filteredList.length === 0) {
            return (
                <div class="row" id="noAuctionsText">
                    <h3>Inga auktioner matchar angivet sökvärde</h3>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    {auctionList}
                </div>
            )
        }

    }
}
const mapStateToProps = state => {
    return {
        auctions: state.auctions.filteredList
    }
}
export default connect(mapStateToProps)(SearchList);