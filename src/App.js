import React, { Component } from 'react';
<<<<<<< HEAD
import AuctionDetails from './components/Auctions/AuctionDetails'
=======
import { connect } from 'react-redux';
import { fetchAuctions } from './store/actions/auctionAction';

>>>>>>> 3544eae4f2ca180ac9a3b452f31395f675105691
class App extends Component {

  componentDidMount() {
    console.log("Mounted")
    this.props.dispatch(fetchAuctions());
  }

  render() {
    console.log(this.props.auctions);
    return (
      <div className="App">
<<<<<<< HEAD
        <AuctionDetails/>
=======
      <h3>Hello</h3>
>>>>>>> 3544eae4f2ca180ac9a3b452f31395f675105691
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
