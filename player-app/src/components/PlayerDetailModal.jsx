import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PlayerDetailModal = ({ show, handleClose, player }) => {
  if (!player) return null;

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const bgClass = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  const sectionTitleClass = isDarkMode ? 'text-info' : 'text-primary';
  const mutedTextClass = isDarkMode ? 'text-light-emphasis' : 'text-muted';

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className={bgClass + ' border-0'}>
        <Modal.Title className={`fw-bold ${sectionTitleClass} w-100 text-center`}>👤 Player Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${bgClass} rounded-3`}>
        <div className="d-flex flex-column flex-md-row">
          {/* Profile Image */}
          <div className="text-center p-3 flex-shrink-0" style={{ width: '260px' }}>
            <img
              src={
                player.imageName
                  ? `http://localhost:5034${player.imageUrl}`
                  : `https://ui-avatars.com/api/?name=${player.firstName}`
              }
              alt="Player"
              className="rounded-circle shadow"
              style={{ width: 120, height: 120, objectFit: 'cover', border: '4px solid #fff' }}
            />
            <h5 className="mt-3 mb-1 fw-bold">{player.firstName} {player.lastName}</h5>
            <small className={mutedTextClass}>{player.email}</small>
            <div className="mt-3">
              <span className="badge bg-info me-1">{player.gender?.genderName}</span>
              <span className="badge bg-danger me-1">{player.bloodGroup?.groupName}</span>
              <span className="badge bg-warning text-dark">{player.sportsType?.typeName}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-3 flex-grow-1">
            <div className="row mb-2">
              <div className="col-md-6"><strong>DOB:</strong><br />{new Date(player.dateOfBirth).toLocaleDateString()}</div>
              <div className="col-md-6"><strong>Mobile:</strong><br />{player.mobileNo}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Father:</strong><br />{player.fathersName}</div>
              <div className="col-md-6"><strong>Mother:</strong><br />{player.mothersName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>NID:</strong><br />{player.nidNumber}</div>
              <div className="col-md-6"><strong>Religion:</strong><br />{player.religion?.religionName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Height:</strong><br />{player.height} cm</div>
              <div className="col-md-6"><strong>Weight:</strong><br />{player.playerWeight} kg</div>
            </div>
            <div className="mb-3"><strong>Education:</strong><br />{player.lastEducationalQualification}</div>

            <hr className="my-3" />

            <h6 className={`${sectionTitleClass} fw-semibold`}>🏋️ Trainings</h6>
            {player.playerTrainingAssignments?.length > 0 ? (
              player.playerTrainingAssignments.map((training, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{training.trainingName}</strong><br />
                  <small className={mutedTextClass}>
                    {new Date(training.trainingDate).toLocaleDateString()} – {training.duration}h at {training.venue}
                  </small>
                </div>
              ))
            ) : (
              <p className={mutedTextClass}>No trainings assigned</p>
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

export default PlayerDetailModal;


