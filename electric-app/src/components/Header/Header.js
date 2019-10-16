import React from 'react';
import "./header.css";
import {Navbar, Nav} from 'react-bootstrap';

export default function Header(props) {
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Link</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}