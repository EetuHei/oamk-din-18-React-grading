import React from "react";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GoogleMap from "..//Map/Googlemap";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
import api from "../Register/register.json";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let userData = {
      username: this.state.username,
      password: this.state.password
    };
    const url = api.url2;
    fetch(url, {
      body: JSON.stringify(userData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(myJSON => {
        console.log(myJSON);
        if (myJSON.success) {
          this.props.handleLogin();
          this.setState({ redirect: true });
        } else {
          alert("Login failed!");
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }
    return (
      <div>
        <GoogleMap />
        <Modal isOpen={true} className="modalColor">
          <ModalHeader className="modalColor">Login</ModalHeader>
          <ModalBody className="modalColor">
            <form>
              <div>Name</div>
              <input
                type="text"
                name="username"
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
              />

              <div>Password</div>
              <input
                type="password"
                name="password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </form>
          </ModalBody>
          <ModalFooter className="modalColor">
            <Button
              className="btn btn-dark"
              type="submit"
              onClick={event => this.handleSubmit(event)}
            >
              Login
            </Button>
            <Link to="/">
              <Button className="btn btn-dark">Cancel</Button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Login;
