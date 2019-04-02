import React from 'react';
import AuctionDetailsView from './AuctionDetailsView';
import AuctionDetailsBet from './AuctionDetailsBet';
import {connect} from 'react-redux';
class AuctionDetails extends React.Component {

    render() {
        console.log(this.props.auctions)
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <AuctionDetailsView item={this.props.auctions}/>
                    </div>
                    <div className="col-lg-6">
                        <AuctionDetailsBet item={this.props.auctions} />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const {match} = ownProps;
    console.log(match);
    return { auctions: state.auctions.items.find(a=>a.AuktionID == match.params.id)

    }
}
export default connect(mapStateToProps)(AuctionDetails);