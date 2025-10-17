import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Modal } from 'react-bootstrap';
import trainerService from '../services/trainerService';
import TrainerFormModal from './TrainerFormModal';
import TrainerDetailModal from './TrainerDetailModal';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm, itemName }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Delete Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete <strong>{itemName}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="danger" onClick={handleConfirm}>Delete</Button>
    </Modal.Footer>
  </Modal>
);

export const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editTrainer, setEditTrainer] = useState(null);

  const IMAGE_BASE_URL = 'http://localhost:5034/images/';

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const data = await trainerService.getAllTrainers();
      setTrainers(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch trainers.');
      setTrainers([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (trainer) => {
    setSelectedTrainer(trainer);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedTrainer(null);
    setShowDetailModal(false);
  };

  const handleAddTrainer = () => {
    setEditTrainer(null);
    setShowFormModal(true);
  };

  const handleEditTrainer = (trainer) => {
    setEditTrainer(trainer);
    setShowFormModal(true);
  };

  const handleDeleteClick = (trainer) => {
    setTrainerToDelete(trainer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!trainerToDelete) return;
    try {
      await trainerService.deleteTrainer(trainerToDelete.trainerId);
      fetchTrainers();
      setShowDeleteModal(false);
    } catch (err) {
      setError(`Failed to delete trainer: ${err.message}`);
      console.error(err);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTrainerToDelete(null);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Trainer Directory</h2>
        <Button variant="primary" onClick={handleAddTrainer}>+ Add Trainer</Button>
      </div>

      <div className="row gy-4">
        {trainers.length === 0 && <Alert variant="info">No trainers found.</Alert>}
        {trainers.map((trainer) => (
          <div key={trainer.trainerId} className="col-12 col-md-6 col-lg-4">
            <div className="glass-card shadow-sm p-4 rounded-4">
              {/* Avatar and Name */}
              <div className="d-flex align-items-center mb-3">
                <img
                  src={trainer.picture && trainer.picture !== 'noimage.png'
                    ? `${IMAGE_BASE_URL}${trainer.picture}`
                    : `https://ui-avatars.com/api/?name=${trainer.trainerName}`}
                  alt="Trainer"
                  className="rounded-circle me-3"
                  style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #ddd' }}
                />
                <div>
                  <h5 className="mb-0 fw-bold">{trainer.trainerName}</h5>
                  <small className="text-muted">DOB: {trainer.dateOfBirth ? new Date(trainer.dateOfBirth).toLocaleDateString() : 'N/A'}</small><br />
                  <small>{trainer.mobileNo}</small><br />
                  <small>{trainer.email}</small>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-3">
                {trainer.trainerSkills?.length > 0 ? (
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: 0 }}>
                    {trainer.trainerSkills.map((skill, idx) => (
                      <li key={idx}>{skill.skillName} ({skill.experience || 0} yrs)</li>
                    ))}
                  </ul>
                ) : (
                  <small className="text-muted">No skills</small>
                )}
              </div>

              {/* Actions */}
              <div className="text-end mt-3">
                <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewDetails(trainer)}>
                  <i className="fas fa-eye"></i>
                </Button>
                <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEditTrainer(trainer)}>
                  <i className="fas fa-pen"></i>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(trainer)}>
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={confirmDelete}
        itemName={trainerToDelete?.trainerName}
      />
      <TrainerDetailModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        trainer={selectedTrainer}
      />
      <TrainerFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        selectedTrainer={editTrainer}
        onSaved={fetchTrainers}
      />
    </div>
  );
};

export default TrainerList;
