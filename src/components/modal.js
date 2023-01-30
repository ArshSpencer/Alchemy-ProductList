import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteItem } from "../redux/actions/productActions";

const ConfirmationModal = (props) => {
    const { show, handleClose, handleIsCheck, count, ids } = props;

    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteItem(ids));
        handleClose();
        handleIsCheck()
    }

    return (
        <div> <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete {count} product(s) ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={confirmAction}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal></div>
    )
}

export default ConfirmationModal