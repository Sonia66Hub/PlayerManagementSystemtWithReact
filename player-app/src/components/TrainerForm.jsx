import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import trainerService from "../services/trainerService";
import skillService from "../services/skillService";

const TrainerForm = ({ trainer, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    trainerId: trainer?.trainerId || 0, // এখানে পরিবর্তন করা হয়েছে
    trainerName: trainer?.trainerName || "", // এখানে পরিবর্তন করা হয়েছে
    dateOfBirth: trainer?.dateOfBirth?.substring(0, 10) || "", // এখানে পরিবর্তন করা হয়েছে
    mobileNo: trainer?.mobileNo || "", // এখানে পরিবর্তন করা হয়েছে
    email: trainer?.email || "", // এখানে পরিবর্তন করা হয়েছে
    isExperienced: trainer?.isExperienced || false, // এখানে পরিবর্তন করা হয়েছে
    picture: trainer?.picture || "", // এখানে পরিবর্তন করা হয়েছে (PictureName থেকে picture)
    pictureFile: null, // এখানে পরিবর্তন করা হয়েছে (PictureFile থেকে pictureFile)
    trainerSkills: trainer?.trainerSkills || [], // এখানে পরিবর্তন করা হয়েছে
  });

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    trainer?.picture ? `http://localhost:5034/images/${trainer.picture}` : null
  );

  useEffect(() => {
    const loadSkills = async () => {
      const data = await skillService.getAllSkills();
      setSkills(data || []);
    };
    loadSkills();
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
      // API তে পাঠানোর জন্য সঠিক ফরম্যাটে ডেটা তৈরি
      const apiData = {
        trainerId: formData.trainerId,
        trainerName: formData.trainerName,
        dateOfBirth: formData.dateOfBirth,
        mobileNo: formData.mobileNo,
        email: formData.email,
        isExperienced: formData.isExperienced,
        picture: formData.picture,
        pictureFile: formData.pictureFile,
        trainerSkills: formData.trainerSkills,
      };

      if (formData.trainerId > 0) {
        await trainerService.updateTrainer(formData.trainerId, apiData);
      } else {
        await trainerService.createTrainer(apiData); // apiData পাঠানো হচ্ছে
      }
      onSave();
    } catch (err) {
      console.error("Failed to save trainer", err);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      trainerSkills: [
        ...formData.trainerSkills,
        { skillId: "", skillName: "", experience: 0 },
      ],
    });
  };

  const removeSkill = (index) => {
    const updated = [...formData.trainerSkills];
    updated.splice(index, 1);
    setFormData({ ...formData, trainerSkills: updated });
  };

  const handleSkillSelect = (index, skillId) => {
    const selected = skills.find((s) => s.skillId === skillId);
    if (!selected) return;

    const updated = [...formData.trainerSkills];
    updated[index] = {
      ...updated[index],
      skillId: selected.skillId,
      skillName: selected.skillName || "",
    };
    setFormData({ ...formData, trainerSkills: updated });
  };

  const updateSkillField = (index, field, value) => {
    const updated = [...formData.trainerSkills];
    updated[index] = {
      ...updated[index],
      [field]: field === "experience" ? parseFloat(value) || 0 : value,
    };
    setFormData({ ...formData, trainerSkills: updated });
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <h5 className="fw-bold text-primary text-center">👨‍💻 Trainer Information</h5>

      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="trainerName" // এখানে পরিবর্তন করা হয়েছে
              value={formData.trainerName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth" // এখানে পরিবর্তন করা হয়েছে
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              name="mobileNo" // এখানে পরিবর্তন করা হয়েছে
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email" // এখানে পরিবর্তন করা হয়েছে
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Experienced"
              name="isExperienced" // এখানে পরিবর্তন করা হয়েছে
              checked={formData.isExperienced}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Picture</Form.Label>
            <Form.Control type="file" name="pictureFile" onChange={handleChange} /> {/* এখানে পরিবর্তন করা হয়েছে */}
          </Form.Group>
          {previewUrl && (
            <div className="mt-2">
              <strong>Preview:</strong>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: "1px solid #e3e3e3",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Trainer Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          )}
        </Col>
      </Row>

      <hr className="my-4" />
      <h5 className="fw-bold text-primary text-center">🏋️ Trainer Skills</h5>
      {formData.trainerSkills.length === 0 && (
        <p className="text-muted text-center">No skills added.</p>
      )}

      {formData.trainerSkills.map((skill, index) => (
        <Row key={index} className="mb-3 align-items-end">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Skill</Form.Label>
              <Form.Select
                value={skill.skillId}
                onChange={(e) => handleSkillSelect(index, parseInt(e.target.value))}
              >
                <option value="">Select Skill</option>
                {skills.map((s) => (
                  <option key={s.skillId} value={s.skillId}>
                    {s.skillName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={skill.experience}
                onChange={(e) =>
                  updateSkillField(index, "experience", e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Button variant="danger" onClick={() => removeSkill(index)}>
              <i className="fas fa-trash"></i>
            </Button>
          </Col>
        </Row>
      ))}

      <div className="d-flex justify-content-center mb-4">
        <Button variant="outline-primary" onClick={addSkill}>
          ➕ Add Skill
        </Button>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button type="submit" variant="success">
          {loading ? <Spinner size="sm" animation="border" /> : formData.trainerId > 0 ? "Update Trainer" : "Save Trainer"}
        </Button>
      </div>
    </Form>
  );
};

export default TrainerForm;
