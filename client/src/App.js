import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Search from './pages/Search';
import Saved from './pages/Saved';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="site">
        <div className="site-content">
            <Router basename={`${process.env.PUBLIC_URL}`}>
              <Switch>
                <Route exact path="/" component={Search} />
                <Route exact path="/saved" component={Saved} />
                <Route component={Search} />
              </Switch>
            </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
