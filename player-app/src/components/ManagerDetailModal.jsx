// import React from 'react';
// import { Modal, Button, Card, ListGroup, Image, Alert } from 'react-bootstrap';

// const ManagerDetailModal = ({ show, handleClose, manager }) => {
//   if (!manager) return null;

//   const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

//   const bgClass = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark';
//   const sectionTitleClass = isDarkMode ? 'text-info' : 'text-primary';
//   const mutedTextClass = isDarkMode ? 'text-light-emphasis' : 'text-muted';

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" centered>
//       <Modal.Header closeButton className={`${bgClass} border-0`}>
//         <Modal.Title className={`fw-bold ${sectionTitleClass} w-100 text-center`}>
//           👨‍🏫 Manager Profile
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body className={`${bgClass} rounded-3`}>
//         <div className="d-flex flex-column flex-md-row">
//           {/* Profile Image */}
//           <div className="text-center p-3 flex-shrink-0" style={{ width: '260px' }}>
//             <Image
//               src={
//                 manager.imageUrl
//                   ? `http://localhost:5034/images/${manager.imageUrl}`
//                   : `https://ui-avatars.com/api/?name=${manager.name}`
//               }
//               alt="Manager"
//               className="rounded-circle shadow"
//               style={{ width: 120, height: 120, objectFit: 'cover', border: '4px solid #fff' }}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://placehold.co/200x200/cccccc/000000?text=No+Image';
//               }}
//             />
//             <h5 className="mt-3 mb-1 fw-bold">{manager.name}</h5>
//             <div className="mt-2">
//               <span className="badge bg-success">{manager.isActive ? 'Active' : 'Inactive'}</span>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="p-3 flex-grow-1">
//             <div className="row mb-2">
//               <div className="col-md-6"><strong>Manager ID:</strong><br />{manager.managerId}</div>
//               <div className="col-md-6"><strong>DOB:</strong><br />{new Date(manager.dob).toLocaleDateString()}</div>
//             </div>
//             <div className="row mb-2">
//               <div className="col-md-6"><strong>Mobile:</strong><br />{manager.contactNumber}</div>
//               <div className="col-md-6"><strong>Email:</strong><br />{manager.email}</div>
//             </div>

//             <hr className="my-3" />

//             <h6 className={`${sectionTitleClass} fw-semibold`}>🧑 Trainer Assignments</h6>
//             {manager.managerTrainerAssignments && manager.managerTrainerAssignments.length > 0 ? (
//               <ListGroup variant="flush">
//                 {manager.managerTrainerAssignments.map((trainer, index) => (
//                   <ListGroup.Item key={index} className={bgClass}>
//                     <strong>{trainer.trainerName}</strong><br />
//                     <small className={mutedTextClass}>
//                       ID: {trainer.trainerId} | Skill: {trainer.skillName} <br />
//                       Joined: {new Date(trainer.joiningDate).toLocaleDateString()}
//                     </small>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             ) : (
//               <p className={mutedTextClass}>No trainers assigned.</p>
//             )}
//           </div>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className={`${bgClass} border-0`}>
//         <Button variant={isDarkMode ? 'outline-light' : 'secondary'} onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ManagerDetailModal;

import React from 'react';
import { Modal, Button, Card, ListGroup, Image, Alert } from 'react-bootstrap';

const ManagerDetailModal = ({ show, handleClose, manager }) => {
  if (!manager) return null;

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const bgClass = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  const sectionTitleClass = isDarkMode ? 'text-info' : 'text-primary';
  const mutedTextClass = isDarkMode ? 'text-light-emphasis' : 'text-muted';

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className={`${bgClass} border-0`}>
        <Modal.Title className={`fw-bold ${sectionTitleClass} w-100 text-center`}>
          🧑‍💼 Manager Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${bgClass} rounded-3`}>
        <div className="d-flex flex-column flex-md-row">
          {/* Profile Image */}
          <div className="text-center p-3 flex-shrink-0" style={{ width: '260px' }}>
            <Image
              src={
                manager.imageUrl
                  ? `http://localhost:5055/images/${manager.imageUrl}`
                  : `https://ui-avatars.com/api/?name=${manager.name}`
              }
              alt="Manager"
              className="rounded-circle shadow"
              style={{ width: 120, height: 120, objectFit: 'cover', border: '4px solid #fff' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/200x200/cccccc/000000?text=No+Image';
              }}
            />
            <h5 className="mt-3 mb-1 fw-bold">{manager.name}</h5>
            <div className="mt-2">
              <span className="badge bg-success">{manager.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-3 flex-grow-1">
            <div className="row mb-2">
              <div className="col-md-6"><strong>Manager ID:</strong><br />{manager.managerId}</div>
              <div className="col-md-6"><strong>DOB:</strong><br />{new Date(manager.dob).toLocaleDateString()}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Mobile:</strong><br />{manager.contactNumber}</div>
              <div className="col-md-6"><strong>Email:</strong><br />{manager.email}</div>
            </div>

            <hr className="my-3" />

            <h6 className={`${sectionTitleClass} fw-semibold`}>🧑 Trainer Assignments</h6>
            {manager.managerTrainerAssignments && manager.managerTrainerAssignments.length > 0 ? (
              <ListGroup variant="flush">
                {manager.managerTrainerAssignments.map((trainer, index) => (
                  <ListGroup.Item key={index} className={bgClass}>
                    <strong>{trainer.name}</strong><br />
                    <small className={mutedTextClass}>
                      ID: {trainer.trainerId} | Skill: {trainer.skillName} <br />
                      Joined: {new Date(trainer.joiningDate).toLocaleDateString()}
                    </small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className={mutedTextClass}>No trainers assigned.</p>
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

export default ManagerDetailModal;

