import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import matchService from '../services/matchService';
import evaluationCategoryService from '../services/evaluationCategoryService';
import trainerService from '../services/trainerService';
import playerService from '../services/playerService';
import playerEvaluationService from '../services/playerEvaluationService';
import evaluationTypeService from '../services/evaluationTypeService';

const PlayerEvaluationForm = ({ playerEvaluation, onCancel, onSave }) => 
{
  const [formData, setFormData] = useState({
    PlayerEvaluationId: playerEvaluation?.playerEvaluationId || 0,
    EvaluationDate: playerEvaluation?.evaluationDate?.substring(0, 10) || '',
    IsCompleted: playerEvaluation?.isCompleted || false,
    Remarks: playerEvaluation?.remarks || '',
    PlayerId: playerEvaluation?.player?.playerId || '',
    TrainerId: playerEvaluation?.trainer?.trainerId || '',
    
    PlayerEvaluationDetails: playerEvaluation?.playerEvaluationDetails || [],
  });

  const [evaluationTypes, setEvaluationTypes] = useState([]);
  const [players, setPlayers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [evaluationCategories, setEvaluationCategories] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDropdowns = async () => {
      const [e, p, t, c, m] = await Promise.all([
        evaluationTypeService.getAllEvaluationTypes(),
        playerService.getAllPlayers(),
        trainerService.getAllTrainers(),
        evaluationCategoryService.getAllEvaluationCategories(),
        matchService.getAllMatches(),
      ]);
      setEvaluationTypes(e);
      setPlayers(p);
      setTrainers(t);
      setEvaluationCategories(c);
      setMatches(m);
      
    };
    loadDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox change correctly
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.PlayerEvaluationId > 0) {
        await playerEvaluationService.updatePlayerEvaluation(formData.PlayerEvaluationId, formData);
      } else {
        await playerEvaluationService.createPlayerEvaluation(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save player evaluation', error);
    } finally {
      setLoading(false);
    }
  };

  const addEvaluationType = () => {
    setFormData({
      ...formData,
      PlayerEvaluationDetails: [
        ...formData.PlayerEvaluationDetails,
        {
          evaluationTypeId: '',
          typeName: '',
          matchId: null,
          title: '',
          evaluationCategoryId: '',
          categoryName: '',
          
          overNumber: null,
          ballNumber: null,
          runsScored: null,
          ballsFaced: null,
          boundaries: null,
          isOut: null,
          dismissalType: '',

          ballsBowled: null,
          runsConceded: null,
          wicketsTaken: null,
          noBalls: null,
          wides: null,
          isBoundary: null,

          catchesTaken: null,
          runOuts: null,
          misfields: null,
          stumpings: null
        }
      ]
    });
  };

  const removeEvaluationType = (index) => {
    const updated = [...formData.PlayerEvaluationDetails];
    updated.splice(index, 1);
    setFormData({ ...formData, PlayerEvaluationDetails: updated });
  };

  const updateEvaluationTypeField = (index, field, value) => {
    const updated = [...formData.PlayerEvaluationDetails];
    let processedValue = value;

    const numberFields = ['overNumber', 'ballNumber', 'runsScored', 'ballsFaced', 'boundaries', 'ballsBowled', 'runsConceded', 'wicketsTaken', 'noBalls', 'wides', 'catchesTaken', 'runOuts', 'misfields', 'stumpings'];

    if (numberFields.includes(field)) {
      processedValue = value === '' ? null : parseInt(value, 10);
      if (isNaN(processedValue)) {
        processedValue = null;
      }
    }

    updated[index] = { ...updated[index], [field]: processedValue };
    setFormData({ ...formData, PlayerEvaluationDetails: updated });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5 className="fw-bold text-primary text-center">📝 Evaluation Information</h5>
      
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Player Name</Form.Label>
            <Form.Select name="PlayerId" value={formData.PlayerId} onChange={handleChange} required>
              <option value="">Select</option>
              {players.map(p => (<option key={p.playerId} value={p.playerId}>{`${p.firstName} ${p.lastName}`}</option>))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Trainer Name</Form.Label>
            <Form.Select name="TrainerId" value={formData.TrainerId} onChange={handleChange} required>
              <option value="">Select</option>
              {trainers.map(t => (<option key={t.trainerId} value={t.trainerId}>{t.trainerName}</option>))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Evaluation Date</Form.Label>
            <Form.Control type="date" name="EvaluationDate" value={formData.EvaluationDate} onChange={handleChange} required />
          </Form.Group>
        </Col>
        </Row>        
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formIsCompleted">
            <Form.Check type="checkbox" label="Is Completed?" name="IsCompleted"
              checked={formData.IsCompleted} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Remarks</Form.Label>
            <Form.Control as="textarea" rows={3} name="Remarks" value={formData.Remarks} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>      
      
      <hr className="my-4" />
      <h5 className="fw-bold text-primary text-center">Evaluation Details</h5>
      {formData.PlayerEvaluationDetails.length === 0 && <p className="text-muted text-center">No evaluation added.</p>}

      {/* Corrected map function */}
      {formData.PlayerEvaluationDetails.map((evaluationDetail, index) => {
        // Find the selected types to conditionally render
        const selectedEvaluationType = evaluationTypes.find(t => t.evaluationTypeId === evaluationDetail.evaluationTypeId);
        const selectedEvaluationCategory = evaluationCategories.find(c => c.evaluationCategoryId === evaluationDetail.evaluationCategoryId);

        return (
          <Row key={index} className="mb-3 align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Evaluation Type</Form.Label>
                <Form.Select value={evaluationDetail.evaluationTypeId || ''} onChange={(e) => updateEvaluationTypeField(index, 'evaluationTypeId', parseInt(e.target.value, 10))}>
                  <option value="">Select Evaluation Type</option>
                  {evaluationTypes.map(e => (<option key={e.evaluationTypeId} value={e.evaluationTypeId}>{e.typeName}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            {/* Conditional Rendering for Match dropdown */}
            {selectedEvaluationType?.typeName === 'Match' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Match Name</Form.Label>
                  <Form.Select value={evaluationDetail.matchId || ''} onChange={(e) => updateEvaluationTypeField(index, 'matchId', parseInt(e.target.value, 10))}>
                    <option value="">Select Match</option>
                    {matches.map(m => (<option key={m.matchId} value={m.matchId}>{m.title}</option>))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            <Col md={3}>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Select value={evaluationDetail.evaluationCategoryId || ''} onChange={(e) => updateEvaluationTypeField(index, 'evaluationCategoryId', parseInt(e.target.value, 10))}>
                  <option value="">Select Category</option>
                  {evaluationCategories.map(e => (<option key={e.evaluationCategoryId} value={e.evaluationCategoryId}>{e.categoryName}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Now, the over and ball numbers are always visible */}
            <Col md={2}>
                <Form.Group>
                    <Form.Label>Over No.</Form.Label>
                    <Form.Control
                        type="number"
                        value={evaluationDetail.overNumber || ''}
                        onChange={(e) => updateEvaluationTypeField(index, 'overNumber', e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group>
                    <Form.Label>Ball No.</Form.Label>
                    <Form.Control
                        type="number"
                        value={evaluationDetail.ballNumber || ''}
                        onChange={(e) => updateEvaluationTypeField(index, 'ballNumber', e.target.value)}
                    />
                </Form.Group>
            </Col>

            {/* Conditional Rendering for Category-specific fields */}
            {selectedEvaluationCategory?.categoryName === 'Batting' && (
              <>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Runs</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.runsScored || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'runsScored', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Balls Faced</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.ballsFaced || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'ballsFaced', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Boundaries</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.boundaries || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'boundaries', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Is Out?</Form.Label>
                    <Form.Control
                      as="select"
                      value={evaluationDetail.isOut}
                      onChange={(e) => updateEvaluationTypeField(index, 'isOut', e.target.value === 'true')}
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Dismissal Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={evaluationDetail.dismissalType || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'dismissalType', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            {selectedEvaluationCategory?.categoryName === 'Bowling' && (
              <>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Balls Bowled</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.ballsBowled || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'ballsBowled', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Runs Conceded</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.runsConceded || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'runsConceded', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Wickets</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.wicketsTaken || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'wicketsTaken', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>No Balls</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.noBalls || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'noBalls', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Wides</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.wides || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'wides', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Is Boundary?</Form.Label>
                    <Form.Control
                      as="select"
                      value={evaluationDetail.isBoundary}
                      onChange={(e) => updateEvaluationTypeField(index, 'isBoundary', e.target.value === 'true')}
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </>
            )}
            {selectedEvaluationCategory?.categoryName === 'Fielding' && (
              <>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Catches Taken</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.catchesTaken || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'catchesTaken', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Run Outs</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.runOuts || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'runOuts', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Misfields</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.misfields || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'misfields', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Stumpings</Form.Label>
                    <Form.Control
                      type="number"
                      value={evaluationDetail.stumpings || ''}
                      onChange={(e) => updateEvaluationTypeField(index, 'stumpings', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            <Col xs={12} className="d-flex justify-content-end">
              <Button variant="danger" onClick={() => removeEvaluationType(index)} className="mt-2">
                <i className="fas fa-trash"></i>
              </Button>
            </Col>
          </Row>
        );
      })}

      <div className="d-flex justify-content-center mb-4">
        <Button variant="outline-primary" onClick={addEvaluationType}>
          ➕ Add Evaluation
        </Button>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Button variant="secondary" onClick={onCancel} className="me-2">Cancel</Button>
        <Button type="submit" variant="success" >
          {loading ? (
            <Spinner size="sm" animation="border" />
          ) : (
            formData.PlayerEvaluationId > 0 ? 'Update Player Evaluation' : 'Save Player Evaluation'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default PlayerEvaluationForm;
