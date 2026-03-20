import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";

const UserModal = ({ show, handleClose, userinfo }) => {
  let [isEdit, setEdit] = useState("");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {currentRow?.user} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="from-group">
          <Row>
            <Col lg={6}>
              <div className="form-item">
                <input type="text" name="" placeholder="enter the userName" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-item">
                <input type="email" name="" placeholder="enter the email" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-item">
                <input
                  type="password"
                  name=""
                  placeholder="enter the password"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-item">
                <input
                  type="number"
                  name=""
                  placeholder="enter the phonenumber"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-item">
                <input type="number" name="" placeholder="enter the age" />
              </div>
            </Col>
            <Col lg={6}>
              <select name="">
                <option value="select Region">select Region</option>
                <option> india </option>
                <option> others </option>
              </select>
            </Col>
            <Col lg={6}>
              <label htmlFor="gender">Gender</label>
              <span>
                {" "}
                <input type="radio" value="male" checked={""} /> male{" "}
              </span>
              <span>
                {" "}
                <input type="radio" value="male" checked={""} /> female{" "}
              </span>
            </Col>
            <Col lg={6}>
              <label htmlFor="Skills">Skills</label>
              <input type="checkbox" />
            </Col>
            <Col lg={6}>
              <label htmlFor="Address">Address</label>
              <textarea placeholder="Your Address"></textarea>
            </Col>
            <Col lg={6}>
              <input type="file" />
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
