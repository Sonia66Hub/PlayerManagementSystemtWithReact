import React from 'react';
import { Modal } from 'react-bootstrap';
import TrainerForm from './TrainerForm';
import './TrainerFormModal.css'; // Import your custom CSS

const TrainerFormModal = ({ show, handleClose, selectedTrainer, onSaved }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      scrollable
      dialogClassName="custom-modal-bg" // Custom class
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {selectedTrainer ? '✏️ Edit Trainer' : '➕ Add New Trainer'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TrainerForm
          trainer={selectedTrainer}
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

export default TrainerFormModal;
