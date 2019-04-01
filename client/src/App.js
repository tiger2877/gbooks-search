import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Search from './pages/Search';
import Saved from './pages/Saved';

class App extends Component {
  render() {
    console.log('public url: ', process.env.PUBLIC_URL);
    return (
      <div>
        <Router basename={`${process.env.PUBLIC_URL}`}>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <Route component={Search} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
