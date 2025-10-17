import React, { useState, useEffect } from "react";
import {Form,Button,Row,Col,Spinner,} from "react-bootstrap";
import trainerService from "../services/trainerService";
import managerService from "../services/managerService";

const ManagerForm = ({ manager, onCancel, onSave }) => 
{
  const [formData, setFormData] = useState({
    ManagerId: manager?.managerId || 0,
    Name: manager?.name || '',
    Dob: manager?.dob?.substring(0, 10) || '',
    ContactNumber: manager?.contactNumber || '',
    Email: manager?.email || '',
    IsActive: manager?.isActive || false,
    ImageUrl: manager?.imageUrl || '',
    pictureFile: null,
    ManagerTrainerAssignments: manager?.ManagerTrainerAssignments || []
  });

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(manager?.imageUrl ? `http://localhost:5034${manager.imageUrl}` : null);


  useEffect(() => {
    const loadDropdowns = async () => {
      const [t] = await Promise.all([
        trainerService.getAllTrainers(),      
      ]);
      setTrainers(t);
    };
    loadDropdowns();
  }, []);

    const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, pictureFile: file }); // এখানে পরিবর্তন করা হয়েছে

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.ManagerId > 0) {
        await managerService.updateManager(formData.ManagerId, formData);
      } else {
        await managerService.createManager(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save manager', error);
    } finally {
      setLoading(false);
    }
  };

  const addTrainer = () => {
    setFormData({
      ...formData,
      ManagerTrainerAssignments: [
        ...formData.ManagerTrainerAssignments,
        {
          trainerId: '',
          trainerName: '',
          joiningDate: ''         
        }
      ]
    });
  };

  const removeTrainer = (index) => {
    const updated = [...formData.ManagerTrainerAssignments];
    updated.splice(index, 1);
    setFormData({ ...formData, ManagerTrainerAssignments: updated });
  };

  const handleTrainerSelect = (index, trainerId) => {
    const selected = trainers.find(t => t.trainerId === trainerId);
    if (!selected) return;

    const updated = [...formData.ManagerTrainerAssignments];
    updated[index] = {
        ...updated[index],
        trainerId: selected.trainerId,
    trainerName: selected.trainerName || updated[index].trainerName || '',
    joiningDate: updated[index].joiningDate || selected.joiningDate || '' // <--- Add this line
    };
    setFormData({ ...formData, ManagerTrainerAssignments: updated });
};

const updateTrainerField = (index, field, value) => {
  const updated = [...formData.ManagerTrainerAssignments];
  updated[index] = {
    ...updated[index],
    [field]: value, // Correctly update the specific field
  };
  setFormData({ ...formData, ManagerTrainerAssignments: updated });
};




  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <h5 className="fw-bold text-primary text-center">👨‍⚖️ Manager Information</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Manager Name</Form.Label><Form.Control name="Name" value={formData.Name} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="Dob" value={formData.Dob} onChange={handleChange} required /></Form.Group></Col>
      </Row>
      <Row className="mt-3">
       <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control name="Email" value={formData.Email} onChange={handleChange} required /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Contact No</Form.Label><Form.Control name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} required /></Form.Group></Col>
      </Row>   
      <Row className="mt-3">
         <Col md={6}>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Is Active"
                      name="IsActive" 
                      checked={formData.IsActive}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
      </Row>                     
     
      <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" name="pictureFile" onChange={handleChange} />
              </Form.Group>
      
              {previewUrl && (
              <div className="mt-3">
                <strong>Preview:</strong>
                <div
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    border: '1px solid #e3e3e3',
                    cursor: 'zoom-in',
                    }}>
                    <img
                      src={previewUrl}
                      alt="Manager Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
                  </div>
              </div>
              )}
              </Col>
              </Row>

      <hr className="my-4" />
      <h5 className="fw-bold text-primary text-center">🏋️ Trainer Assignment</h5>
      {formData.ManagerTrainerAssignments.length === 0 && <p className="text-muted text-center">No trainer added.</p>}

      {formData.ManagerTrainerAssignments.map((trainer, index) => (
        <Row key={index} className="mb-3 align-items-end">
          <Col md={4}><Form.Group><Form.Label>Trainer</Form.Label><Form.Select value={trainer.trainerId} onChange={(e) => handleTrainerSelect(index, parseInt(e.target.value))}><option value="">Select Trainer</option>{trainers.map(t => (<option key={t.trainerId} value={t.trainerId}>{t.trainerName}</option>))}</Form.Select></Form.Group></Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
    type="date"
    value={trainer.joiningDate?.substring(0, 10) || ''}
    onChange={(e) => updateTrainerField(index, 'joiningDate', e.target.value)}
/>
            </Form.Group>
          </Col>
          
          <Col md={1}><Button variant="danger" onClick={() => removeTrainer(index)} className="mt-2"><i className="fas fa-trash"></i></Button></Col>
        </Row>
      ))}

      <div className="d-flex justify-content-center mb-4">
        <Button variant="outline-primary" onClick={addTrainer}>
          ➕ Add Trainer
        </Button>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Button variant="secondary" onClick={onCancel} className="me-2">Cancel</Button>
        <Button type="submit" variant="success" >
          {loading ? (
            <Spinner size="sm" animation="border" />
          ) : (
            formData.ManagerId > 0 ? 'Update Manager' : 'Save Manager'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default ManagerForm;


