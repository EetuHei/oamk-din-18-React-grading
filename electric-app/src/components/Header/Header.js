import React from 'react';
import "./header.css";
import {Navbar, Nav, Form, Container} from 'react-bootstrap';

export default function Header(props) {
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Nav>
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Pricing</Nav.Link>
                </Nav>
                <div className="centerDiv">
                <Container>
                    <Form.Group>
                        <Form.Label className="centerText">Search Charging Stations</Form.Label>
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