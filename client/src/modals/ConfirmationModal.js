import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as strings from "../text/strings";

export default function ConfirmationModal({show, handleClose, onConfirm, title, message}) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        {strings.NO}
                    </Button>
                    <Button variant="outline-info" onClick={onConfirm}>
                        {strings.YES}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}