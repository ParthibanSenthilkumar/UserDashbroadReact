import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { delRequest, getPatch } from "../Services/Api";
import { successToast } from "./Toaster";

const Modaluser = ({ show, handleClose, currentRow }) => {
    console.log(currentRow, "test");

  let [isEdit, setEdit] = useState({});
  let [disabled, setdisabled] = useState(true);
  
  
  useEffect(() => {
    if (currentRow) {        
      setEdit(currentRow);
    }
  }, [currentRow]);

  console.log(isEdit,'isedit');

  let handleEdit = async () => {
    if(disabled){
      setdisabled(false);
    }
    else{
      const formdata = { ...isEdit };
      await getPatch(formdata, currentRow?.id);
      console.log(formdata, 'Editdata');
      successToast('Data Update Successfully')
      setdisabled(true);
      handleClose()
    }
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
  // skils: updatedata -> to change name in  update data


  const hangleDelete = async()=>{
    await delRequest(currentRow.id)
    successToast('User Data Delete Successfully')
    handleClose()
  }

  console.log(currentRow?.id, "id");
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {isEdit?.user} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <div className="form-item">
              <input
                type="text"
                name="user"
                disabled={disabled}
                value={isEdit?.user}
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
                value={isEdit?.useremail}
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
                value={isEdit?.userpass}
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
                value={isEdit?.phoneNo}
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
                value={isEdit?.userAge}
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
                value={isEdit?.region}
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
              <label>Role</label>
              <select
                disabled={disabled}
                value={isEdit?.role || "User"}
                onChange={(e) =>
                  setEdit({ ...isEdit, role: e.target.value })
                }
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-item">
              <label htmlFor="Address">Address</label>
              <textarea
                placeholder="Your Address"
                disabled={disabled}
                value={isEdit?.userText}
                onChange={(e) =>
                  setEdit({ ...isEdit, userText: e.target.value })
                }
              ></textarea>
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
                  checked={isEdit?.useradio === "male"}
                  onChange={(e) =>
                    setEdit({ ...isEdit, useradio: e.target.value })
                  }
                />
                male
              </span>
              <span>
                <input
                  type="radio"
                  value="female"
                  disabled={disabled}
                  checked={isEdit?.useradio === "female"}
                  onChange={(e) =>
                    setEdit({ ...isEdit, useradio: e.target.value })
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
                  value='html'
                  checked={isEdit?.skils?.includes("html")}
                  onChange={handlecheck}
                />
                html
              </span>
              <span>
                <input
                  type="checkbox"
                  disabled={disabled}
                  value='css'
                  checked={isEdit?.skils?.includes("css")}
                  onChange={handlecheck}
                />
                css
              </span>
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
          {disabled ? "Edit" : "save"}
        </Button>
        <Button variant="danger" onClick={()=>hangleDelete(currentRow.id)}>
          Delete
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default Modaluser

