import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GoogleMap from "./components/Map/Googlemap";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Pricing from "./components/Pricing/Pricing";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./components/Map/data.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: "",
      userData: null,
      items: data.items
    };
  }

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  storeUserData = (username, password, passwordConfirm) => {
    this.setState({
      userData: {
        username,
        password,
        passwordConfirm
      }
    });
  };

  render() {
    return (
      <Router>
        <Header />
        {/* <Route path="/" exact component={GoogleMap} /> */}
        <Route
          path="/"
          exact
          render={routeProps => <GoogleMap userData={this.state.userData} />}
        />
        <Route
          path="/register"
          exact
          render={routeProps => (
            <Register storeUserData={this.storeUserData} {...routeProps} />
          )}
        />
        <Route path="/pricing" exact render component={Pricing} />
      </Router>
    );
  }
}
