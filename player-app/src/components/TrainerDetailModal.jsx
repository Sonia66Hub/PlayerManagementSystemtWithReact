import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TrainerDetailModal = ({ show, handleClose, trainer }) => {
  if (!trainer) return null;

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const bgClass = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  const sectionTitleClass = isDarkMode ? 'text-info' : 'text-primary';
  const mutedTextClass = isDarkMode ? 'text-light-emphasis' : 'text-muted';

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className={bgClass + ' border-0'}>
        <Modal.Title className={`fw-bold ${sectionTitleClass} w-100 text-center`}>
          👤 Trainer Profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={`${bgClass} rounded-3`}>
        <div className="d-flex flex-column flex-md-row">
          {/* Profile Image */}
          <div className="text-center p-3 flex-shrink-0" style={{ width: '260px' }}>
            <img
              src={
                trainer.picture
                  ? `http://localhost:5034/images/${trainer.picture}`
                  : `https://ui-avatars.com/api/?name=${trainer.trainerName}`
              }
              alt="Trainer"
              className="rounded-circle shadow"
              style={{ width: 120, height: 120, objectFit: 'cover', border: '4px solid #fff' }}
            />
            <h5 className="mt-3 mb-1 fw-bold">{trainer.trainerName}</h5>
            <small className={mutedTextClass}>{trainer.email}</small>
            <div className="mt-3">
              {trainer.isExperienced && <span className="badge bg-success">Experienced</span>}
            </div>
          </div>

          {/* Details */}
          <div className="p-3 flex-grow-1">
            <div className="row mb-2">
              <div className="col-md-6"><strong>DOB:</strong><br />{new Date(trainer.dateOfBirth).toLocaleDateString()}</div>
              <div className="col-md-6"><strong>Mobile:</strong><br />{trainer.mobileNo}</div>
            </div>
            <div className="mb-3"><strong>Email:</strong><br />{trainer.email}</div>

            <hr className="my-3" />

            <h6 className={`${sectionTitleClass} fw-semibold`}>🏋️ Skills</h6>
            {trainer.trainerSkills?.length > 0 ? (
              trainer.trainerSkills.map((skill, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{skill.skillName}</strong><br />
                  <small className={mutedTextClass}>{skill.experience} years</small>
                </div>
              ))
            ) : (
              <p className={mutedTextClass}>No skills added</p>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={`${bgClass} border-0`}>
        <Button variant={isDarkMode ? 'outline-light' : 'secondary'} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TrainerDetailModal;
