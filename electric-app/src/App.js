import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GoogleMap from "./components/Map/Googlemap";
import Register from "./components/Register/Register";
import Pricing from "./components/Pricing/Pricing";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./components/Map/data.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      items: data.items,
      authenticated: false
    };
  }

  storeUserData = (username, password, passwordConfirm) => {
    this.setState({
      userData: {
        username,
        password,
        passwordConfirm
      }
    });
  };

  handleLogin = event => {
    this.setState({
      authenticated: true
    });
  };

  render() {
    return (
      <Router>
        {/* <Route path="/" exact component={GoogleMap} /> */}
        <Route
          path="/"
          exact
          render={routeProps => (
            <GoogleMap
              authenticated={this.state.authenticated}
              {...routeProps}
            />
          )}
        />
        <Route
          path="/register"
          exact
          render={routeProps => (
            <Register storeUserData={this.storeUserData} {...routeProps} />
          )}
        />
        <Route path="/pricing" exact render component={Pricing} />
        <Route
          exact
          path="/login"
          render={() => <Login handleLogin={() => this.handleLogin()} />}
        />
      </Router>
    );
  }
}
