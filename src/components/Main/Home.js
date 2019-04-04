import React from 'react';
import AuctionList from '../Auctions/AuctionList';
import { connect } from 'react-redux';
import { fetchAuctions } from '../../store/actions/auctionAction';
class Home extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(fetchAuctions());
        }, 1000);
    }


    render() {
        return (
            <div>
                <AuctionList />
            </div>
        );
    }
}

export default connect()(Home);

