import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import matchService from "../services/matchService";
import matchFormatService from "../services/matchFormatService";

const MatchForm = ({ match, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    MatchId: match?.matchId || 0,
    Title: match?.title || "",
    MatchDate: match?.matchDate?.substring(0, 10) || "",
    Venue: match?.venue || "",
    TeamA: match?.teamA || "",
    TeamB: match?.teamB || "",
    Result: match?.result || "",
    MatchFormatId: match?.matchFormat?.matchFormatId || "",
  });

  const [matchFormats, setMatchFormats] = useState([]);
  const [loading, setLoading] = useState(false);
useEffect(() => {
    const loadDropdowns = async () => {
      const [m] = await Promise.all([
        matchFormatService.getAllMatchFormats()        
      ]);
      setMatchFormats(m);      
    };
    loadDropdowns();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.MatchId > 0) {
        await matchService.updateMatch(formData.MatchId, formData);
      } else {
        await matchService.createMatch(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save Match', error);
    } finally {
      setLoading(false);
    }
  };
  

   return (
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <h5 className="fw-bold text-primary text-center">🏟️ Match Information</h5>
        <Row>
          <Col md={6}><Form.Group><Form.Label>Match Title</Form.Label><Form.Control name="Title" value={formData.Title} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Venue Name</Form.Label><Form.Control name="Venue" value={formData.Venue} onChange={handleChange} required /></Form.Group></Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}><Form.Group><Form.Label>Match Date </Form.Label><Form.Control type="date" name="MatchDate" value={formData.MatchDate} onChange={handleChange} required /></Form.Group></Col>        
        </Row>
        <Row className="mt-3">
          <Col md={6}><Form.Group><Form.Label>Team A</Form.Label><Form.Control name="TeamA" value={formData.TeamA} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Team B</Form.Label><Form.Control name="TeamB" value={formData.TeamB} onChange={handleChange} required /></Form.Group></Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}><Form.Group><Form.Label>Result</Form.Label><Form.Control name="Result" value={formData.Result} onChange={handleChange} /></Form.Group></Col>        
        </Row>
       
        <Row className="mt-3">
          <Col md={6}><Form.Group><Form.Label>Match Format</Form.Label><Form.Select name="MatchFormatId" value={formData.MatchFormatId} onChange={handleChange} required><option value="">Select</option>{matchFormats.map(r => (<option key={r.matchFormatId} value={r.matchFormatId}>{r.formatName}</option>))}</Form.Select></Form.Group></Col>       
        </Row>            
  
        <div className="d-flex justify-content-end mb-2">
             <Button variant="secondary" onClick={onCancel} className="me-2" type="button">Cancel</Button>
          <Button type="submit" variant="success" >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              formData.MatchId > 0 ? 'Update Match' : 'Save Match'
            )}
          </Button>
        </div>
      </Form>
    );
};

export default MatchForm;
