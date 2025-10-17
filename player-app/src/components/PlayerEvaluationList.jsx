import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import PlayerDetailModal from './PlayerDetailModal';

import PlayerEvaluationFormModal from './PlayerEvaluationFormModal';
import playerEvaluationService from '../services/playerEvaluationService';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm, itemName }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Delete Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete <strong>{itemName}</strong>?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="danger" onClick={handleConfirm}>Delete</Button>
    </Modal.Footer>
  </Modal>
);

export const PlayerEvaluationList = () => {
  const [playerEvaluations, setPlayerEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playerEvaluationToDelete, setPlayerEvaluationToDelete] = useState(null);
  const [selectedPlayerEvaluation, setSelectedPlayerEvaluation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editPlayerEvaluation, setEditPlayerEvaluation] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPlayerEvaluations();
  }, []);
  const handleViewDetails = (playerEvaluation) => {
  setSelectedPlayerEvaluation(playerEvaluation);
  setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedPlayer(null);
    setShowDetailModal(false);
  };

  const handleAddPlayerEvaluation = () => {
  setEditPlayerEvaluation(null);
  setShowFormModal(true);
  };

  const handleEditPlayerEvaluation = (playerEvaluation) => {
  setEditPlayerEvaluation(playerEvaluation);
  setShowFormModal(true);
  };

  const fetchPlayerEvaluations = async () => {
    try {
      const data = await playerEvaluationService.getAllPlayerEvaluations();
      setPlayerEvaluations(data);
    } catch (error) {
      setError('Failed to fetch player evaluations.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (playerEvaluation) => {
    setPlayerEvaluationToDelete(playerEvaluation);
    setShowDeleteModal(true);
  };

  const handleViewSummary = (playerEvaluationId) => {
        navigate(`/playerEvaluations/${playerEvaluationId}`);
    };

  const confirmDelete = async () => {
    if (playerEvaluationToDelete) {
      try {
        await playerEvaluationService.deletePlayerEvaluation(playerEvaluationToDelete.playerEvaluationId);
        fetchPlayerEvaluations();
        setShowDeleteModal(false);
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Player Evaluation Directory</h2>
        <Button variant="primary" onClick={handleAddPlayerEvaluation}>+ Add Player Evaluation</Button>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="row gy-4">
          {playerEvaluations.map(playerEvaluation => (
            <div key={playerEvaluation.playerEvaluationId} className="col-12 col-md-6 col-lg-4">
              <div className="glass-card shadow-sm p-4 rounded-4">
  <div className="d-flex justify-content-between align-items-start mb-3">
    {/* Left-aligned content: Date, Status, Remarks */}
    <div className="d-flex flex-column">
      <strong className="text-muted">Evaluation Date: {new Date(playerEvaluation.evaluationDate).toLocaleDateString()}</strong>
        <small className="text-muted mt-1">
                      {playerEvaluation.isCompleted ? 'Completed' : 'Progressing'}
                    </small>
                    {playerEvaluation.remarks && (
                      <small className="text-muted fst-italic mt-1">"{playerEvaluation.remarks}"</small>
                    )}
     
    </div>

    {/* Right-aligned content: Full Name and Trainer Name Tags */}
    <div className="d-flex flex-column align-items-end">
      <span className="badge tag-badge bg-info mb-1">{playerEvaluation.player?.fullName}</span>
      <span className="badge tag-badge bg-danger">{playerEvaluation.trainer?.trainerName}</span>
    </div>
  </div>

  {/* Evaluations Section (using the same existing structure) */}
  <div className="playerEvaluation-section border-top pt-3">
    {playerEvaluation.playerEvaluationDetails?.length > 0 ? (
      playerEvaluation.playerEvaluationDetails.map((evaluation, idx) => (
        <div key={idx} className="playerEvaluation-item mb-2">
          <strong className="text-primary d-block">{evaluation.typeName}</strong>
          <small className="text-muted"> {evaluation.categoryName}</small>
          {evaluation.title && <small className="text-muted"> ({evaluation.title})</small>}
        </div>
      ))
    ) : (
      <small className="text-muted">No evaluation assigned</small>
    )}
  </div>

  {/* Actions */}
  <div className="text-end mt-3">
    <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewDetails(playerEvaluation)}>
      <i className="fas fa-eye"></i>
    </Button>
    <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEditPlayerEvaluation(playerEvaluation)}>
      <i className="fas fa-pen"></i>
    </Button>
    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(playerEvaluation)}>
      <i className="fas fa-trash"></i>
    </Button>

    <Button 
        variant="outline-primary" 
        size="sm" 
        className="ms-2" 
        onClick={() => handleViewSummary(playerEvaluation.playerEvaluationId)}
    >
        <i className="fas fa-chart-bar"></i> Summary
    </Button>

  </div>
</div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
        itemName={playerEvaluationToDelete?.player.fullName} 
      />
      {/* <PlayerEvaluationDetailModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        playerEvaluation={selectedPlayerEvaluation}
      /> */}
      <PlayerEvaluationFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        selectedPlayerEvaluation={editPlayerEvaluation}
        onSaved={fetchPlayerEvaluations}
      />
    </div>
  );
};

export default PlayerEvaluationList;