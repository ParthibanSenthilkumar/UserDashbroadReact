import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import {QRCodeCanvas} from 'qrcode.react'

const Qrmodal = ({ show, handleClose, userdetails }) => {

  const qrValue = `
    name:${userdetails?.user},
    email:${userdetails?.useremail},
    phone:${userdetails?.phoneNo},
    region:${userdetails?.region},
    gender:${userdetails?.useradio},
    age:${userdetails?.userAge},
  `;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        
        <Modal.Header closeButton>
          <Modal.Title>User QR</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center mb-4">
            <QRCodeCanvas value={qrValue}  size={200} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Qrmodal