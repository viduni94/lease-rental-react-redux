import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import history from "./utils/history";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Switch>
              {/* <Route exact path="/" component={Login} /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;