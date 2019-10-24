import React from "react";
import "./header.css";
import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: ""
    };
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Link to="/">
              <Button className="btn btn-dark">Home</Button>
            </Link>
            <Link to="/Pricing">
              <Button className="btn btn-dark">Pricing</Button>
            </Link>
          </Nav>
          <div className="centerDiv">
            <Container>
              <Form.Group>
                <Form.Label className="centerText">
                  Search Charging Stations
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City..."
                  onChange={this.props.handleInput}
                ></Form.Control>
              </Form.Group>
            </Container>
          </div>
          <Nav>
            <Link to="/Register">
              <Button className="btn btn-dark">Sign Up</Button>
            </Link>
            <Link to="/Pricing">
              <Button className="btn btn-dark">Login</Button>
            </Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
