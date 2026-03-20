import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';

const UserModal = ( {show,handleClose,userinfo} ) => {


let [isEdit,setEdit] = useState('')

  return (
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{userinfo?.user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="text"
                          placeholder="Name"
                          value={userinfo?.user}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="email"
                          placeholder="Email"
                          value={userinfo?.useremail}
                          
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="password"
                          placeholder="Password"
                          value={userinfo?.userpass}
                          
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="number"
                          placeholder="Age"
                          value={userinfo?.userAge}
                          
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="number"
                          placeholder="Phone Number"
                          value={userinfo?.phoneNo}
                          
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <select
                          value={userinfo?.region}
                          
                        >
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
                          <input
                            type="checkbox"
                            value={''}
                            
                          />
                          HTML
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            value="css"
                          
                          />
                          CSS
                        </span>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <label>Gender:</label>
                        <span>
                          <input
                            type="radio"
                            value="male"
                            checked={''}
                            
                          />
                          Male
                        </span>
                        <span>
                          <input
                            type="radio"
                            value="female"
                            checked={''}
                            
                          />
                          Female
                        </span>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <textarea
                          placeholder="Address"
                          value={userinfo?.userText}
                          
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="file"
                        />
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
  )
}

export default UserModal