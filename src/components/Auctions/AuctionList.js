import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Auction from './Auction';

class AuctionList extends React.Component {

    filteredList = () => {
        const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
        if (this.props.auctions.length) {
            return this.props.auctions.filter(auction => {
                if (auction.SlutDatum > currentDate) return auction;
            }).sort((a, b) => {
                if (a.SlutDatum === b.SlutDatum) return 0;
                return a.SlutDatum > b.SlutDatum ? 1 : -1;
            });
        } else {
            return [];
        }
    }

    searchResult = () => {
        return this.props.auctions.filter(auction => {
            if (auction.Titel.includes(this.props.filter))
                return auction;
        });

    }

    render() {

        let filteredList = [];

        if (this.props.filter) {
            filteredList = this.searchResult();
        }
        else {
            filteredList = this.filteredList();
        }

        const auctionList = filteredList.length > 0 ? filteredList.map((auction) => {
            console.log(auction.Bud);
            return (
                <Auction item={auction} key={auction.AuktionID} />
            )
        }) : (
                <div className="row">
                    <div className="col-6 text-center mt-5">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>)

        return (
            <div className="row">
                {auctionList}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        auctions: state.auctions.items,
        filter: state.auctions.filter
    }
}
export default connect(mapStateToProps)(AuctionList);