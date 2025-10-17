import React from 'react';
import { Modal } from 'react-bootstrap';
import './PlayerEvaluationFormModal.css';
import PlayerEvaluationForm from './PlayerEvaluationForm';


const PlayerEvaluationFormModal = ({ show, handleClose, selectedPlayerEvaluation, onSaved }) => {
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
          {selectedPlayerEvaluation ? '✏️ Edit Player Evaluation' : '➕ Add New Player Evaluation'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlayerEvaluationForm
          playerEvaluation={selectedPlayerEvaluation}
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

export default PlayerEvaluationFormModal;
