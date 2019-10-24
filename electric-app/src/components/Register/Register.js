import React from "react";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GoogleMap from "..//Map/Googlemap";
import { Redirect, Link } from "react-router-dom";
import "./register.css";
import api from "./register.json";


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirm: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation() {
    let formIsValid = true;

    if (!/^[a-zA-Z]+$/.test(this.state.username)) {
      formIsValid = false;
      alert("Your username can contain only letters");
    }

    if (this.state.password !== this.state.passwordConfirm) {
      formIsValid = false;
      alert("Your passwords don't match");
    }

    if (this.state.password.length < 6) {
      formIsValid = false;
      alert("Your password must contain atleast 6 characters");
    }

    return formIsValid;
  }

  handleSubmit(event) {
    let userData = {
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };
    // console.log(userData, "this is userData");

    if (this.handleValidation()) {
      const url = api.url;

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
        })
        .catch(err => console.log(err));

      this.setState({ redirect: true });
    } else {
      console.log("Form has errors!");
    }
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <GoogleMap />
        <Modal isOpen={true} className="modalColor">
          <ModalHeader className="modalColor">Sign Up</ModalHeader>
          <ModalBody className="modalColor">
            <form onSubmit={this.handleSubmit}>
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
                type="text"
                name="password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />

              <div>Confirm Password</div>
              <input
                type="text"
                name="passwordConfirm"
                onChange={event =>
                  this.setState({ passwordConfirm: event.target.value })
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
              Sign Up
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
