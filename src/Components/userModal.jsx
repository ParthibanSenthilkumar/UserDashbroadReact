import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";

const UserModal = ({ show, handleClose, currentRow }) => {
  console.log(currentRow, "test");

  let [isEdit, setEdit] = useState("");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {currentRow?.user} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="text"
                name=""
                value={currentRow?.user}
                placeholder="enter the userName"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="email"
                name=""
                value={currentRow?.useremail}
                placeholder="enter the email"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="password"
                name=""
                value={currentRow?.userpass}
                placeholder="enter the password"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="number"
                name=""
                value={currentRow?.phoneNo}
                placeholder="enter the phonenumber"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="number"
                name=""
                value={currentRow?.userAge}
                placeholder="enter the age"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <select name="" value={currentRow?.region}>
                <option value="select Region">select Region</option>
                <option> india </option>
                <option> others </option>
              </select>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <label htmlFor="gender">Gender</label>
              <span>
                {" "}
                <input type="radio" value="male" checked={""} /> male{" "}
              </span>
              <span>
                {" "}
                <input type="radio" value="male" checked={""} /> female{" "}
              </span>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <label htmlFor="Skills">Skills</label>
              <span>
                {" "}
                <input type="checkbox" value={currentRow?.skils} />
                html{" "}
              </span>
              <span>
                {" "}
                <input type="checkbox" value={currentRow?.skils} />
                css{" "}
              </span>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <label htmlFor="Address">Address</label>
              <textarea
                placeholder="Your Address"
                value={currentRow?.userText}
              ></textarea>
            </div>
          </Col>
          <Col lg={6}>
            <input type="file" />
          </Col>
        </Row>
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
