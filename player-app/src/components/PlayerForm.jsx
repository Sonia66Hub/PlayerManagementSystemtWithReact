import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import playerService from '../services/playerService';
import trainingService from '../services/trainingService';
import dropdownService from '../services/dropdownService';

const PlayerForm = ({ player, onCancel, onSave }) => 
{
  const [formData, setFormData] = useState({
    PlayerId: player?.playerId || 0,
    FirstName: player?.firstName || '',
    LastName: player?.lastName || '',
    DateOfBirth: player?.dateOfBirth?.substring(0, 10) || '',
    FathersName: player?.fathersName || '',
    MothersName: player?.mothersName || '',
    MobileNo: player?.mobileNo || '',
    NidNumber: player?.nidNumber || '',
    Email: player?.email || '',
    Height: player?.height || '',
    PlayerWeight: player?.playerWeight || '',
    LastEducationalQualification: player?.lastEducationalQualification || '',
    SportsTypeId: player?.sportsType?.sportsTypeId || '',
    BloodGroupId: player?.bloodGroup?.bloodGroupId || '',
    ReligionId: player?.religion?.religionId || '',
    GenderId: player?.gender?.genderId || '',
    ImageName: player?.imageName || '',
    pictureFile: null,
    PlayerTrainingAssignments: player?.playerTrainingAssignments || []
  });

  const [trainings, setTrainings] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sportsTypes, setSportsTypes] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [religions, setReligions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(player?.imageName ? `http://localhost:5034${player.imageUrl}` : null);


  useEffect(() => {
    const loadDropdowns = async () => {
      const [t, g, s, b, r] = await Promise.all([
        trainingService.getAllTrainings(),
        dropdownService.getGenders(),
        dropdownService.getSportsTypes(),
        dropdownService.getBloodGroups(),
        dropdownService.getReligions(),
      ]);
      setTrainings(t);
      setGenders(g);
      setSportsTypes(s);
      setBloodGroups(b);
      setReligions(r);
    };
    loadDropdowns();
  }, []);

  const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (files && files.length > 0) {
    const file = files[0];
    setFormData({ ...formData, pictureFile: file });

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.PlayerId > 0) {
        await playerService.updatePlayer(formData.PlayerId, formData);
      } else {
        await playerService.createPlayer(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save player', error);
    } finally {
      setLoading(false);
    }
  };

  const addTraining = () => {
    setFormData({
      ...formData,
      PlayerTrainingAssignments: [
        ...formData.PlayerTrainingAssignments,
        {
          trainingId: '',
          trainingName: '',
          trainingDate: '',
          duration: '',
          venue: ''
        }
      ]
    });
  };

  const removeTraining = (index) => {
    const updated = [...formData.PlayerTrainingAssignments];
    updated.splice(index, 1);
    setFormData({ ...formData, PlayerTrainingAssignments: updated });
  };

  const handleTrainingSelect = (index, trainingId) => {
  const selected = trainings.find(t => t.trainingId === trainingId);
  if (!selected) return;

  const updated = [...formData.PlayerTrainingAssignments];
  updated[index] = {
    ...updated[index],
    trainingId: selected.trainingId,
    trainingName: selected.trainingName || updated[index].trainingName || '',
    trainingDate: updated[index].trainingDate || selected.trainingDate || '',
    duration: updated[index].duration || selected.duration || '',
    venue: updated[index].venue || selected.venue || ''
  };

  setFormData({ ...formData, PlayerTrainingAssignments: updated });
};

const updateTrainingField = (index, field, value) => {
  const updated = [...formData.PlayerTrainingAssignments];

  updated[index] = {
    ...updated[index],
    [field]: field === 'duration' ? parseFloat(value) || 0 : value
  };

  setFormData({ ...formData, PlayerTrainingAssignments: updated });
};




  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <h5 className="fw-bold text-primary text-center">🧑 Player Information</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>First Name</Form.Label><Form.Control name="FirstName" value={formData.FirstName} onChange={handleChange} required /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Last Name</Form.Label><Form.Control name="LastName" value={formData.LastName} onChange={handleChange} required /></Form.Group></Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}><Form.Group><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} required /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Mobile No</Form.Label><Form.Control name="MobileNo" value={formData.MobileNo} onChange={handleChange} required /></Form.Group></Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control name="Email" value={formData.Email} onChange={handleChange} required /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>NID Number</Form.Label><Form.Control name="NidNumber" value={formData.NidNumber} onChange={handleChange} required /></Form.Group></Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}><Form.Group><Form.Label>Father's Name</Form.Label><Form.Control name="FathersName" value={formData.FathersName} onChange={handleChange} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Mother's Name</Form.Label><Form.Control name="MothersName" value={formData.MothersName} onChange={handleChange} /></Form.Group></Col>
      </Row>
      <Row className="mt-3">
        <Col md={4}><Form.Group><Form.Label>Height (cm)</Form.Label><Form.Control name="Height" value={formData.Height} onChange={handleChange} /></Form.Group></Col>
        <Col md={4}><Form.Group><Form.Label>Weight (kg)</Form.Label><Form.Control name="PlayerWeight" value={formData.PlayerWeight} onChange={handleChange} /></Form.Group></Col>
        <Col md={4}><Form.Group><Form.Label>Education</Form.Label><Form.Control name="LastEducationalQualification" value={formData.LastEducationalQualification} onChange={handleChange} /></Form.Group></Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}><Form.Group><Form.Label>Sports Type</Form.Label><Form.Select name="SportsTypeId" value={formData.SportsTypeId} onChange={handleChange} required><option value="">Select</option>{sportsTypes.map(s => (<option key={s.sportsTypeId} value={s.sportsTypeId}>{s.typeName}</option>))}</Form.Select></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Blood Group</Form.Label><Form.Select name="BloodGroupId" value={formData.BloodGroupId} onChange={handleChange} required><option value="">Select</option>{bloodGroups.map(b => (<option key={b.bloodGroupId} value={b.bloodGroupId}>{b.groupName}</option>))}</Form.Select></Form.Group></Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}><Form.Group><Form.Label>Religion</Form.Label><Form.Select name="ReligionId" value={formData.ReligionId} onChange={handleChange} required><option value="">Select</option>{religions.map(r => (<option key={r.religionId} value={r.religionId}>{r.religionName}</option>))}</Form.Select></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Gender</Form.Label><Form.Select name="GenderId" value={formData.GenderId} onChange={handleChange} required><option value="">Select</option>{genders.map(g => (<option key={g.genderId} value={g.genderId}>{g.genderName}</option>))}</Form.Select></Form.Group></Col>
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
                alt="Player Preview"
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
      <h5 className="fw-bold text-primary text-center">🏋️ Training Assignment</h5>
      {formData.PlayerTrainingAssignments.length === 0 && <p className="text-muted text-center">No training added.</p>}

      {formData.PlayerTrainingAssignments.map((training, index) => (
        <Row key={index} className="mb-3 align-items-end">
          <Col md={4}><Form.Group><Form.Label>Training</Form.Label><Form.Select value={training.trainingId} onChange={(e) => handleTrainingSelect(index, parseInt(e.target.value))}><option value="">Select Training</option>{trainings.map(t => (<option key={t.trainingId} value={t.trainingId}>{t.trainingName}</option>))}</Form.Select></Form.Group></Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={training.trainingDate?.substring(0, 10) || ''}
                onChange={(e) => updateTrainingField(index, 'trainingDate', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
            type="number"
            step="0.1" // ✅ Allow decimal input
            value={training.duration}
            onChange={(e) => updateTrainingField(index, 'duration', e.target.value)}
          />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                value={training.venue}
                onChange={(e) => updateTrainingField(index, 'venue', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={1}><Button variant="danger" onClick={() => removeTraining(index)} className="mt-2"><i className="fas fa-trash"></i></Button></Col>
        </Row>
      ))}

      <div className="d-flex justify-content-center mb-4">
        <Button variant="outline-primary" onClick={addTraining}>
          ➕ Add Training
        </Button>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Button variant="secondary" onClick={onCancel} className="me-2">Cancel</Button>
        <Button type="submit" variant="success" >
          {loading ? (
            <Spinner size="sm" animation="border" />
          ) : (
            formData.PlayerId > 0 ? 'Update Player' : 'Save Player'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default PlayerForm;
