import React from "react";
import "./header.css";
import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Link to="/">
            <Button style={{ float: "left" }} className="btn btn-dark">
              Home
            </Button>
          </Link>
          <Link to="/Pricing">
            <Button style={{ float: "left" }} className="btn btn-dark">
              Pricing
            </Button>
          </Link>
        </Nav>
        <div className="centerDiv">
          <Container>
            <Form.Group>
              <Form.Label className="centerText">
                Search Charging Stations
              </Form.Label>
              <Form.Control type="text" placeholder="City..."></Form.Control>
            </Form.Group>
          </Container>
        </div>
        <Nav>
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>Sign Up</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
