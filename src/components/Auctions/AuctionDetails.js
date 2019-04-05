import React from 'react';
import AuctionDetailsView from './AuctionDetailsView';
import AuctionDetailsBet from './AuctionDetailsBet';
import { connect } from 'react-redux';
import { fetchSingleAuction } from '../../store/actions/auctionAction';

class AuctionDetails extends React.Component {

    componentDidMount() {
        const { match } = this.props;
        this.props.dispatch(fetchSingleAuction(match.params.id));
    }

    render() {
        if (this.props.auction !== null) {
            console.log(this.props.auction);
            const { Bud } = this.props.auction;
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-6">
                            <AuctionDetailsView item={this.props.auction} bids={Bud} history={this.props.history} />
                        </div>
                        <div className="col-lg-6">
                            <AuctionDetailsBet item={this.props.auction} bids={Bud} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<span>loading</span>)
        }

    }
}
const mapStateToProps = (state) => {
    return {
        auction: state.auctions.auction
    }
}
export default connect(mapStateToProps)(AuctionDetails);