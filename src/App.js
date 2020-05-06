import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import history from "./utils/history";

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/app.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;