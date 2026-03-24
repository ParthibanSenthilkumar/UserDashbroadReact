import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { getPatch } from "../Services/Api";

const UserModal = ({ show, handleClose, currentRow }) => {
  console.log(currentRow, "test");

  let [isEdit, setEdit] = useState({});
  let [disabled, setdisabled] = useState(true);

  useEffect(() => {
    if (currentRow) {
      setEdit(currentRow);
    }
  }, [currentRow]);

  let handleEdit = async () => {
    setdisabled(false);
    const formdata = { ...isEdit };
    await getPatch(formdata, currentRow?.id);
    console.log(formdata, Editdata);
  };

  const handlecheck = (e) => {
    const { value, checked } = e.target;
    let updatedata = isEdit?.skils;
    if (checked) {
      updatedata = [...updatedata, value];
    } else {
      updatedata = updatedata.filter((item) => item !== value);
    }
    setEdit({ ...isEdit, skils: updatedata });
  };

  console.log(currentRow?.id, "id");
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
                name="user"
                disabled={disabled}
                value={currentRow?.user}
                placeholder="enter the userName"
                onChange={(e) => setEdit({ ...isEdit, user: e.target.value })}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="email"
                name=""
                disabled={disabled}
                value={currentRow?.useremail}
                placeholder="enter the email"
                onChange={(e) =>
                  setEdit({ ...isEdit, useremail: e.target.value })
                }
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="password"
                name=""
                disabled={disabled}
                value={currentRow?.userpass}
                placeholder="enter the password"
                onChange={(e) =>
                  setEdit({ ...isEdit, userpass: e.target.value })
                }
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="number"
                name=""
                disabled={disabled}
                value={currentRow?.phoneNo}
                placeholder="enter the phonenumber"
                onChange={(e) =>
                  setEdit({ ...isEdit, phoneNo: e.target.value })
                }
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="number"
                name=""
                disabled={disabled}
                value={currentRow?.userAge}
                placeholder="enter the age"
                onChange={(e) =>
                  setEdit({ ...isEdit, userAge: e.target.value })
                }
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <select
                name=""
                disabled={disabled}
                value={currentRow?.region}
                onChange={(e) => setEdit({ ...isEdit, region: e.target.value })}
              >
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
                <input
                  type="radio"
                  value="male"
                  disabled={disabled}
                  checked={isEdit?.gender === "male"}
                  onChange={(e) =>
                    setEdit({ ...isEdit, gender: e.target.value })
                  }
                />
                male
              </span>
              <span>
                <input
                  type="radio"
                  value="female"
                  disabled={disabled}
                  checked={isEdit?.gender === "female"}
                  onChange={(e) =>
                    setEdit({ ...isEdit, gender: e.target.value })
                  }
                />
                female
              </span>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <label htmlFor="Skills">Skills</label>
              <span>
                <input
                  type="checkbox"
                  disabled={disabled}
                  value={isEdit?.skils?.includes("html")}
                  onChange={handlecheck}
                />
                html
              </span>
              <span>
                <input
                  type="checkbox"
                  disabled={disabled}
                  value={isEdit?.skils?.includes("css")}
                  onChange={handlecheck}
                />
                css
              </span>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <label htmlFor="Address">Address</label>
              <textarea
                placeholder="Your Address"
                disabled={disabled}
                value={currentRow?.userText}
                onChange={(e) =>
                  setEdit({ ...isEdit, userText: e.target.value })
                }
              ></textarea>
            </div>
          </Col>
          <Col lg={6}>
            <label htmlFor="image mb-3">image</label>
            <div className="form-item">
              <input type="file" disabled={disabled} />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleEdit(currentRow.id)}>
          {isEdit ? "Edit" : "save"}
        </Button>

        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
