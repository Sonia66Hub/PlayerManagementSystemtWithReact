import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';

import managerService from '../services/managerService';
import ManagerDetailModal from './ManagerDetailModal';
import ManagerFormModal from './ManagerFormModal';

// This is the same ConfirmDeleteModal from PlayerList.jsx
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

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editManager, setEditManager] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);
const handleViewDetails = (manager) => {
  setSelectedManager(manager);
  setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedManager(null);
    setShowDetailModal(false);
  };

  const handleAddManager = () => {
  setEditManager(null);
  setShowFormModal(true);
  };

  const handleEditManager = (manager) => {
  setEditManager(manager);
  setShowFormModal(true);
  };

  const fetchManagers = async () => {
    try {
      const data = await managerService.getAllManagers();
      setManagers(data);
    } catch (err) {
      setError('Failed to fetch managers. Please check if the API is running and accessible.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (manager) => {
    setManagerToDelete(manager);
    setShowDeleteModal(true);
  };

  const handleShowDetails = (manager) => {
    setSelectedManager(manager);
    setShowDetailModal(true);
  };
  const confirmDelete = async () => {
    if (managerToDelete) {
      try {
        await managerService.deleteManager(managerToDelete.managerId);
        fetchManagers();
        setShowDeleteModal(false);
        
      } catch (err) {
        setError(`Error: ${err.message}`);      
      
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="mt-5">Error: {error}</Alert>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Manager Directory</h2>
          <Button variant="primary" onClick={handleAddManager}>+ Add Manager</Button>        
      </div>

    {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (

        <div className="row gy-4">
          {managers.map((manager) => (
            <div key={manager.managerId} className="col-12 col-md-6 col-lg-4">
              <div className="glass-card shadow-sm p-4 rounded-4">
                {/* Avatar and Name */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={`http://localhost:5034/images/${manager.imageUrl}`}
                    alt={manager.name}
                    className="rounded-circle me-3"
                    style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #ddd' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?name=" + manager.name.split(' ').join('+');
                    }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{manager.name}</h5>
                    <small className="text-muted">DOB: {new Date(manager.dob).toLocaleDateString()}</small><br />
                    <small>{manager.contactNumber}</small><br />
                    <small>{manager.email}</small>
                  </div>
                </div>

                {/* Status Tags */}
                <div className="mb-3">
                  <span className={`badge tag-badge me-2 ${manager.isActive ? "bg-success" : "bg-secondary"}`}>
                    {manager.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Trainer Assignments */}

                <div className="training-section">
                  {manager.managerTrainerAssignments?.length > 0 ? (
                    manager.managerTrainerAssignments.map((trainer, idx) => (
                      <div key={idx} className="training-item mb-2">
                        <strong className="text-primary">{trainer.trainerName}</strong><br />
                        <small className="text-muted">{new Date(trainer.joiningDate).toLocaleDateString()}</small>
                      </div>
                    ))
                  ) : (
                    <small className="text-muted">No trainers assigned</small>
                  )}
                </div>

                {/* Actions */}
                   
                <div className="text-end mt-3">
                  <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewDetails(manager)}><i className="fas fa-eye"></i>
                  </Button>
                  <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEditManager(manager)}> <i className="fas fa-pen"></i>
                  </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(manager)}><i className="fas fa-trash"></i>
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
        itemName={managerToDelete?.name}
      />
      <ManagerDetailModal
        show={showDetailModal}
        handleClose={() => setShowDetailModal(false)}
        manager={selectedManager}
      />
      <ManagerFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        selectedManager={editManager}
        onSaved={fetchManagers}
      />
    </div>
  );
};

export default ManagerList;


