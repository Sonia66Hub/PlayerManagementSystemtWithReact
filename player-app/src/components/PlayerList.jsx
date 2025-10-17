
import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Modal } from 'react-bootstrap';
import playerService from '../services/playerService';
import PlayerDetailModal from './PlayerDetailModal';
import PlayerFormModal from './PlayerFormModal';


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

export const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editPlayer, setEditPlayer] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);
  const handleViewDetails = (player) => {
  setSelectedPlayer(player);
  setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedPlayer(null);
    setShowDetailModal(false);
  };

  const handleAddPlayer = () => {
  setEditPlayer(null);
  setShowFormModal(true);
  };

  const handleEditPlayer = (player) => {
  setEditPlayer(player);
  setShowFormModal(true);
  };

  const fetchPlayers = async () => {
    try {
      const data = await playerService.getAllPlayers();
      setPlayers(data);
    } catch (error) {
      setError('Failed to fetch players.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (player) => {
    setPlayerToDelete(player);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (playerToDelete) {
      try {
        await playerService.deletePlayer(playerToDelete.playerId);
        fetchPlayers();
        setShowDeleteModal(false);
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Player Directory</h2>
        <Button variant="primary" onClick={handleAddPlayer}>+ Add Player</Button>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="row gy-4">
          {players.map(player => (
            <div key={player.playerId} className="col-12 col-md-6 col-lg-4">
              <div className="glass-card shadow-sm p-4 rounded-4">
                {/* Avatar and Name */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={player.imageName ? `http://localhost:5034${player.imageUrl}` : "https://ui-avatars.com/api/?name=" + player.firstName}
                    alt="Player"
                    className="rounded-circle me-3"
                    style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #ddd' }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{player.firstName} {player.lastName}</h5>
                    <small className="text-muted">DOB: {new Date(player.dateOfBirth).toLocaleDateString()}</small><br />
                    <small>{player.mobileNo}</small><br />
                    <small>{player.email}</small>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <span className="badge tag-badge bg-info me-2">{player.gender?.genderName}</span>
                  <span className="badge tag-badge bg-danger me-2">{player.bloodGroup?.groupName}</span>
                  <span className="badge tag-badge bg-warning text-dark">{player.sportsType?.typeName}</span>
                </div>

                {/* Trainings */}
                <div className="training-section">
                  {player.playerTrainingAssignments?.length > 0 ? (
                    player.playerTrainingAssignments.map((training, idx) => (
                      <div key={idx} className="training-item mb-2">
                        <strong className="text-primary">{training.trainingName}</strong><br />
                        <small className="text-muted">{new Date(training.trainingDate).toLocaleDateString()} – {training.duration}h at {training.venue}</small>
                      </div>
                    ))
                  ) : (
                    <small className="text-muted">No trainings assigned</small>
                  )}
                </div>

                {/* Actions */}
                <div className="text-end mt-3">
                    <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewDetails(player)}>
                      <i className="fas fa-eye"></i>
                    </Button>
                    <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEditPlayer(player)}>
                      <i className="fas fa-pen"></i>
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(player)}>
                      <i className="fas fa-trash"></i>
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
        itemName={`${playerToDelete?.firstName} ${playerToDelete?.lastName}`}
      />
      <PlayerDetailModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        player={selectedPlayer}
      />
      <PlayerFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        selectedPlayer={editPlayer}
        onSaved={fetchPlayers}
      />
    </div>
  );
};


