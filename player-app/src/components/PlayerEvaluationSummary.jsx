import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Accordion } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import playerEvaluationService from '../services/playerEvaluationService';

const PlayerEvaluationSummary = () => {
    const { playerEvaluationId } = useParams();
    const navigate = useNavigate();
    const [evaluationData, setEvaluationData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const data = await playerEvaluationService.getPlayerEvaluationById(playerEvaluationId);
                setEvaluationData(data);
            } catch (error) {
                console.error('Failed to fetch player evaluation summary', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluation();
    }, [playerEvaluationId]);

    const goBackToList = () => {
        navigate('/playerEvaluations');
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!evaluationData) {
        return <p className="text-center mt-5">No evaluation data found.</p>;
    }

    const { player, trainer, evaluationDate, remarks, isCompleted, PlayerEvaluationDetails } = evaluationData;

    // Aggregate overall summary statistics
    const summary = (PlayerEvaluationDetails || []).reduce((acc, detail) => {
        const category = detail.categoryName?.toLowerCase();
        if (category === 'fielding') {
            acc.fielding.catchesTaken += detail.catchesTaken || 0;
            acc.fielding.runOuts += detail.runOuts || 0;
            acc.fielding.misfields += detail.misfields || 0;
            acc.fielding.stumpings += detail.stumpings || 0;
        } else if (category === 'batting') {
            acc.batting.ballsFaced += detail.ballsFaced || 0;
            acc.batting.runsScored += detail.runsScored || 0;
            acc.batting.boundaries += detail.boundaries || 0;
            if (detail.isOut) {
                acc.batting.dismissals += 1;
            }
        } else if (category === 'bowling') {
            acc.bowling.ballsBowled += detail.ballsBowled || 0;
            acc.bowling.runsConceded += detail.runsConceded || 0;
            acc.bowling.wicketsTaken += detail.wicketsTaken || 0;
            acc.bowling.noBalls += detail.noBalls || 0;
            acc.bowling.wides += detail.wides || 0;
            if (detail.isBoundary) {
                acc.bowling.boundariesConceded += 1;
            }
        }
        return acc;
    }, {
        fielding: { catchesTaken: 0, runOuts: 0, misfields: 0, stumpings: 0 },
        batting: { ballsFaced: 0, runsScored: 0, boundaries: 0, dismissals: 0 },
        bowling: { ballsBowled: 0, runsConceded: 0, wicketsTaken: 0, noBalls: 0, wides: 0, boundariesConceded: 0 },
    });

    // Group evaluation details by type and then by match
    const groupedDetails = (PlayerEvaluationDetails || []).reduce((acc, detail) => {
        const typeKey = detail.typeName;
        const matchTitle = detail.match?.title || 'No Match';
        const categoryKey = detail.categoryName;

        if (!acc[typeKey]) {
            acc[typeKey] = {};
        }
        if (!acc[typeKey][matchTitle]) {
            acc[typeKey][matchTitle] = {};
        }
        if (!acc[typeKey][matchTitle][categoryKey]) {
            acc[typeKey][matchTitle][categoryKey] = [];
        }

        acc[typeKey][matchTitle][categoryKey].push(detail);
        return acc;
    }, {});
    
    // Sort keys to ensure 'Admission' and 'Training' come before 'Match'
    const sortedTypes = Object.keys(groupedDetails).sort((a, b) => {
        if (a === 'Admission') return -1;
        if (b === 'Admission') return 1;
        if (a === 'Training') return -1;
        if (b === 'Training') return 1;
        return 0;
    });

    return (
        <Container className="my-5">
            <Card className="shadow-lg p-4">
                <h3 className="text-center text-primary fw-bold">Player Evaluation Summary</h3>
                <hr />
                <Row className="mb-4 text-center">
                    <Col>
                        <strong>Player:</strong> {player?.firstName} {player?.lastName}
                    </Col>
                    <Col>
                        <strong>Trainer:</strong> {trainer?.trainerName}
                    </Col>
                    <Col>
                        <strong>Date:</strong> {new Date(evaluationDate).toLocaleDateString()}
                    </Col>
                    <Col>
                        <strong>Status:</strong> <span className={`badge ${isCompleted ? 'bg-success' : 'bg-warning'}`}>{isCompleted ? 'Completed' : 'In Progress'}</span>
                    </Col>
                    <Col>
                        <strong>Remarks:</strong> {remarks || 'N/A'}
                    </Col>
                </Row>
                
                {/* Use Accordion to group summary information */}
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Overall Summary</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col md={4}>
                                    <h6 className="text-info">Fielding 🎽</h6>
                                    <p><strong>Catches Taken:</strong> {summary.fielding.catchesTaken}</p>
                                    <p><strong>Run Outs:</strong> {summary.fielding.runOuts}</p>
                                    <p><strong>Misfields:</strong> {summary.fielding.misfields}</p>
                                    <p><strong>Stumpings:</strong> {summary.fielding.stumpings}</p>
                                </Col>
                                <Col md={4}>
                                    <h6 className="text-info">Batting 🏏</h6>
                                    <p><strong>Balls Faced:</strong> {summary.batting.ballsFaced}</p>
                                    <p><strong>Runs Scored:</strong> {summary.batting.runsScored}</p>
                                    <p><strong>Boundaries:</strong> {summary.batting.boundaries}</p>
                                    <p><strong>Dismissals:</strong> {summary.batting.dismissals}</p>
                                </Col>
                                <Col md={4}>
                                    <h6 className="text-info">Bowling 🎳</h6>
                                    <p><strong>Balls Bowled:</strong> {summary.bowling.ballsBowled}</p>
                                    <p><strong>Runs Conceded:</strong> {summary.bowling.runsConceded}</p>
                                    <p><strong>Wickets Taken:</strong> {summary.bowling.wicketsTaken}</p>
                                    <p><strong>No Balls:</strong> {summary.bowling.noBalls}</p>
                                    <p><strong>Wides:</strong> {summary.bowling.wides}</p>
                                    <p><strong>Boundaries Conceded:</strong> {summary.bowling.boundariesConceded}</p>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    
                    {/* Map through sorted types to create collapsible sections */}
                    {sortedTypes.map((type, index) => (
                        <Accordion.Item key={type} eventKey={`${index + 1}`}>
                            <Accordion.Header>{type} Summaries</Accordion.Header>
                            <Accordion.Body>
                                {Object.keys(groupedDetails[type]).map(matchTitle => (
                                    <div key={matchTitle} className="mb-3">
                                        <h6 className="text-primary">{matchTitle}</h6>
                                        {Object.keys(groupedDetails[type][matchTitle]).map(category => (
                                            <div key={category} className="mb-2 ms-4">
                                                <h6 className="text-success">{category}</h6>
                                                <ul className="list-unstyled">
                                                    {groupedDetails[type][matchTitle][category].map((detail, detailIndex) => (
                                                        <li key={detailIndex} className="mb-1">
                                                            <small>
                                                                {detail.overNumber !== null && `Over: ${detail.overNumber}, `}
                                                                {detail.ballNumber !== null && `Ball: ${detail.ballNumber}, `}
                                                                {category === 'Batting' && `Runs: ${detail.runsScored}, Balls Faced: ${detail.ballsFaced}, Dismissal: ${detail.isOut ? detail.dismissalType || 'Out' : 'Not Out'}`}
                                                                {category === 'Bowling' && `Runs: ${detail.runsConceded}, Wickets: ${detail.wicketsTaken}, No Balls: ${detail.noBalls}, Wides: ${detail.wides}`}
                                                                {category === 'Fielding' && `Catches: ${detail.catchesTaken}, Run Outs: ${detail.runOuts}, Misfields: ${detail.misfields}, Stumpings: ${detail.stumpings}`}
                                                            </small>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <div className="d-flex justify-content-center mt-4">
                    <Button variant="secondary" onClick={goBackToList}>
                        Back to List
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default PlayerEvaluationSummary;