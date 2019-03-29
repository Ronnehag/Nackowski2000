import React, { Component } from 'react';
import CreateNewAuction from './components/Auctions/CreateNewAuction';
import AuctionDetails from './components/Auctions/AuctionDetails'
import { connect } from 'react-redux';
import { fetchAuctions } from './store/actions/auctionAction';
import NavigationBar from './components/Navbar/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    console.log("Mounted")
    this.props.dispatch(fetchAuctions());
  }

  render() {
    console.log(this.props.auctions);
    return (
      <Router>
        <div className="App container-fluid">
          <NavigationBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={CreateNewAuction} />
              <Route path="/Details" component={AuctionDetails} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auctions: state.auctions.items
  }
}

export default connect(mapStateToProps)(App);
