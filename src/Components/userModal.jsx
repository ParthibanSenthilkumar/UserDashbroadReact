import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
const UserModal = ({ show, handleClose, currentRow }) => {
  let { id } = useParams();
  console.log(id);
  console.log(currentRow, "test");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {currentRow?.user} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <div className="form-item">
              <input type="text" placeholder="Name" value={currentRow?.user} />
            </div>
          </Col>

          <Col lg={6}>
            <div className="form-item">
              <input
                type="email"
                placeholder="Email"
                value={currentRow?.useremail}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="form-item">
              <input
                type="password"
                placeholder="Password"
                value={currentRow?.userpass}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="form-item">
              <input
                type="number"
                placeholder="Age"
                value={currentRow?.userAge}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="number"
                placeholder="Phone Number"
                value={currentRow?.phoneNo}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <select value={currentRow?.region}>
                <option value="">Select Region</option>
                <option value="india">India</option>
                <option value="others">Others</option>
              </select>
            </div>
          </Col>

          <Col lg={6}>
            <div className="form-item">
              <label>Skills:</label>
              <span>
                <input type="checkbox" value={currentRow?.[""]} Html />
              </span>
              <span>
                <input type="checkbox" value={currentRow?.[""]} />
                CSS
              </span>
            </div>
          </Col>

          <Col lg={6}>
            <div className="form-item">
              <label>Gender:</label>
              <span>
                <input type="radio" value={currentRow?.gender} />
                Male
              </span>
              <span>
                <input type="radio" value={currentRow?.gender} />
                Female
              </span>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <textarea placeholder="Address" value={currentRow?.userText} />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input type="file" />
            </div>
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
