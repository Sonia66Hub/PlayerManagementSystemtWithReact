import React from 'react';
import { Modal } from 'react-bootstrap';
import ManagerForm from './ManagerForm';
import './ManagerFormModal.css'; // Optional: for custom styles

const ManagerFormModal = ({ show, handleClose, selectedManager, onSaved }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      scrollable
      dialogClassName="custom-modal-bg" // Custom background class
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {selectedManager ? '✏️ Edit Manager' : '➕ Add New Manager'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ManagerForm
          manager={selectedManager}
          onCancel={handleClose}
          onSave={() => {
            onSaved();
            handleClose();
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ManagerFormModal;
