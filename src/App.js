import React, { Component } from 'react';
import AuctionDetails from './components/Auctions/AuctionDetails'
import { connect } from 'react-redux';
import { fetchAuctions } from './store/actions/auctionAction';

class App extends Component {

  componentDidMount() {
    console.log("Mounted")
    this.props.dispatch(fetchAuctions());
  }

  render() {
    console.log(this.props.auctions);
    return (
      <div className="App">
        <AuctionDetails/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auctions: state.auctions.items
  }
}

export default connect(mapStateToProps)(App);
