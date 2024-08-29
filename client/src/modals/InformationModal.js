import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as strings from "../text/strings";

export default function InformationModal({show, handleClose, title, message}) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={handleClose}>
                        {strings.OK}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}