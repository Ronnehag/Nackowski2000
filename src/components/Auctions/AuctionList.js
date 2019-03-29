import React from 'react';
import { connect } from 'react-redux';
import Auction from './Auction';

class AuctionList extends React.Component {
    render() {
        const filterdList = this.props.auctions.filter((filterdAuction) =>{

        })
        const auctionList = this.props.auctions.map((auction) => {
            console.log(auction)
            return (
                <Auction item={auction} />
            )   
        })
        return (
            <div>
                {auctionList}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { auctions: state.auctions.items }
}
export default connect(mapStateToProps)(AuctionList);