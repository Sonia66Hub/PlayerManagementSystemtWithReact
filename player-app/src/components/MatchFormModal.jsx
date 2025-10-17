import React from 'react';
import { Modal } from 'react-bootstrap';
import MatchForm from './MatchForm';
import './MatchFormModal.css'; // Custom CSS for Match modal

const MatchFormModal = ({ show, handleClose, selectedMatch, onSaved }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      scrollable
      dialogClassName="custom-modal-bg" // Optional custom modal class
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {selectedMatch ? '✏️ Edit Match' : '➕ Add New Match'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MatchForm
          match={selectedMatch}
          onCancel={handleClose}
          onSave={() => {
            onSaved();     // Refresh match list
            handleClose(); // Close modal
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default MatchFormModal;
