import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GoogleMap from "..//Map/Googlemap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Pricing() {
  return (
    <div>
      <GoogleMap />
      <Modal isOpen={true} className="modalColor">
        <ModalHeader className="modalColor" closeButton>
          Our Pricing
        </ModalHeader>
        <ModalBody className="modalColor">
          Slow Chargers that are free are marked by blue icons. <br></br>Slow
          Chargers that cost 0.20€/min are marked by yellow icons. <br></br>Fast
          Chargers cost 18c/kWh and are marked with green battery icon.
        </ModalBody>
        <ModalFooter className="modalColor">
          <Link to="/">
            <Button className="btn btn-dark">Close</Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}
