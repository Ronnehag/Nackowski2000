import React, { Component } from 'react';
import CreateNewAuction from './components/Auctions/CreateNewAuction';
import AuctionDetails from './components/Auctions/AuctionDetails'
import Home from './components/Main/Home';
import UpdateAuction from './components/Auctions/UpdateAuction';
import { connect } from 'react-redux';
import { fetchAuctions } from './store/actions/auctionAction';
import NavigationBar from './components/Navbar/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchAuctions());
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <NavigationBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path={`/Auctions/:id`} component={AuctionDetails} />
              <Route path={`/Update/:id`} component={UpdateAuction}/>
              <Route path="/newauction" component={CreateNewAuction} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default connect()(App);
