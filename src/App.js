import React, { Component } from 'react';
import CreateNewAuction from './components/Auctions/CreateNewAuction';
import AuctionDetails from './components/Auctions/AuctionDetails';
import SearchList from './components/Auctions/SearchList'
import Home from './components/Main/Home';
import UpdateAuction from './components/Auctions/UpdateAuction';
import NavigationBar from './components/Navbar/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from './store/actions/authAction';

class App extends Component {

  componentDidMount() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.props.dispatch(loginUser(user));
    }
  }

  render() {
    return (
      <Router>
        <NavigationBar />
        <div className="container pt-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={`/Auctions/:id`} component={AuctionDetails} />
            <Route path={`/Update/:id`} component={UpdateAuction} />
            <Route path="/newauction" component={CreateNewAuction} />
            <Route path="/search" component={SearchList} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default connect()(App);
