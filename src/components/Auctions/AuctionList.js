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

    render() {
        const filteredList = this.filteredList();

        const auctionList = filteredList.length > 0 ? filteredList.map((auction) => {
            return (
                <Auction item={auction} key={auction.AuktionID} />
            )
        }) : (
                <div className="col-6 offset-6 mt-5 mt-10">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )

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
    }
}
export default connect(mapStateToProps)(AuctionList);