import React from 'react';
import AuctionDetailsView from './AuctionDetailsView';
import AuctionDetailsBet from './AuctionDetailsBet';
import {connect} from 'react-redux';
class AuctionDetails extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <AuctionDetailsView />
                    </div>
                    <div className="col-lg-6">
                        <AuctionDetailsBet />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { auctions: state.auctions.items }
}
// export default connect(mapStateToProps)(AuctionList);