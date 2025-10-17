import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Modal } from 'react-bootstrap';
import matchService from '../services/matchService';
import MatchFormModal from './MatchFormModal';
// import MatchDetailModal from './MatchDetailModal';

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

export const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState(null);
  // const [selectedMatch, setSelectedMatch] = useState(null);
  // const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editMatch, setEditMatch] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);
const handleViewDetails = (match) => {
  setSelectedMatch(match);
  setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedMatch(null);
    setShowDetailModal(false);
  };

  const handleAddMatch= () => {
  setEditMatch(null);
  setShowFormModal(true);
  };

  const handleEditMatch = (match) => {
  setEditMatch(match);
  setShowFormModal(true);
  };
const fetchMatches = async () => {
    try {
      const data = await matchService.getAllMatches();
      setMatches(data);
    } catch (error) {
      setError('Failed to fetch matches.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteClick = (match) => {
    setMatchToDelete(match);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!matchToDelete) return;
    try {
      await matchService.deleteMatch(matchToDelete.matchId);
      fetchMatches();
      setShowDeleteModal(false);
    } catch (err) {
      setError(`Failed to delete match: ${err.message}`);
      console.error(err);
    }
  };


  return (
    <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Match Directory</h2>
            <Button variant="primary" onClick={handleAddMatch}>+ Add Match</Button>
          </div>
    
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="row gy-4">
              {matches.map(match => (
                <div key={match.matchId} className="col-12 col-md-6 col-lg-4">
                  <div className="glass-card shadow-sm p-4 rounded-4">
                    {/* Avatar and Name */}
                    <div className="d-flex align-items-center mb-3">                      
                      <div>
                        <h5 className="mb-0 fw-bold">{match.title}</h5>
                        <small className="text-muted">Match Date: {new Date(match.matchDate).toLocaleDateString()}</small><br />
                        <small>{match.venue}</small><br />
                        <small>{match.teamA} || {match.teamB}</small> <br />
                        <small>{match.result}</small>
                      </div>
                    </div>
    
                    {/* Tags */}
                    <div className="mb-3">
                      <span className="badge tag-badge bg-info me-2">{match.matchFormat?.formatName}</span>                      
                    </div>                    
    
                    {/* Actions */}
                    <div className="text-end mt-3">
                        <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewDetails(match)}>
                          <i className="fas fa-eye"></i>
                        </Button>
                        <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEditMatch(match)}>
                          <i className="fas fa-pen"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(match)}>
                          <i className="fas fa-trash"></i>
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
       itemName={matchToDelete?.title}
      />
      {/* <MatchDetailModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        match={selectedMatch}
      /> */}
      <MatchFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        selectedMatch={editMatch}
        onSaved={fetchMatches}
      />
    </div>
  );
};

export default MatchList;
