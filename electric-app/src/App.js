import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import GoogleMap from './components/Map/Googlemap';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props)
  {
    super(props);

    this.state= {

    };
  }

  render()
  {
    return(
      <Router>
        <Header />
        <Route path="/" exact component={GoogleMap} />
      </Router>
    );
  }
}