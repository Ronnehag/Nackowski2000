import React from 'react';
import { connect } from 'react-redux';
import Auction from './Auction';

class AuctionList extends React.Component {
    render() {
        const filterdList = this.props.auctions.filter((filterdAuction) =>{

        })
        const auctionList = this.props.auctions.map((auction, index ) => {
            if((index +1 ) % 4 === 0){
                return (
                <div className="card-group">
                    <Auction item={auction} key={auction.AuktionID} />
                </div>
                )
            }
            return (
                <div>
                    <Auction item={auction} key={auction.AuktionID} />
                </div>
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