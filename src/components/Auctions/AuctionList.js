import React from 'react';
import { connect } from 'react-redux';
import Auction from './Auction';

class AuctionList extends React.Component {
    render() {
        const filterdList = this.props.auctions.filter((filterdAuction) => {

        })
        const auctionList = this.props.auctions.map((auction, index) => {
            if(!this.props.auctions)
            {
                return "loading...";
            }
            return (
                <Auction item={auction} key={auction.AuktionID} />
            )
        })
        return (
            <div className="row">
                {auctionList}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { auctions: state.auctions.items }
}
export default connect(mapStateToProps)(AuctionList);