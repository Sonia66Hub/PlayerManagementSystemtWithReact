import React from 'react';
import { Modal } from 'react-bootstrap';
import PlayerForm from './PlayerForm';
import './PlayerFormModal.css'; // Import your custom CSS

const PlayerFormModal = ({ show, handleClose, selectedPlayer, onSaved }) => {
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
          {selectedPlayer ? '✏️ Edit Player' : '➕ Add New Player'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlayerForm
          player={selectedPlayer}
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

export default PlayerFormModal;
