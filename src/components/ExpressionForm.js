// ExpressionForm.js

import React, { useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import './styles.css'; // Import the CSS file

const ExpressionForm = () => {
    const initialRule = {
        key: 'age',
        output: {
            value: 60,
            operator: '>=',
            score: 50,
        },
    };
    const [rules, setRules] = useState([initialRule]);
    const [combinator, setCombinator] = useState('and');
    const [data, setData] = useState(false);


    const handleAddExpression = () => {
        setRules([...rules,
        {
            key: 'age',
            output: {
                value: 0,
                operator: '>=',
                score: 0,
            },
        }
        ]);
    };

    const handleDeleteExpression = (index) => {
        if (rules.length === 1) {
            alert('You are not allowed to delete first rule');
            return;
        }
        const updatedRules = [...rules];
        updatedRules.splice(index, 1);
        setRules(updatedRules);
    };

    const handleInputChange = (index, field, value) => {
        const updatedRules = [...rules];
        updatedRules[index][field] = value;
        setRules(updatedRules);
    };

    const handleOutputChange = (index, field, value) => {
        const updatedRules = [...rules];
        updatedRules[index].output[field] = value;
        setRules(updatedRules);
    };

    const handleCombinatorChange = (value) => {
        setCombinator(value);
    };

    const handleSubmit = () => {

        const filteredRules = rules.filter((rule) => rule.key !== '');

        if (filteredRules.length === 0) {
            alert('You will have to add at least one expression before submitting.');
            return;
        }

        const output = {
            rules: filteredRules,
            combinator: combinator || 'and',
        };

        console.log(output);
        setData(true)
    };

    return (
        <Container >
            <Form>
                {rules.map((rule, index) => (
                    <Row key={index} className="d-flex justify-content-center align-items-center expression-form-row">
                        <Col xs={12} sm={6} md={4} lg={2} className="expression-form-col">
                            <Form.Group controlId={`ruleType-${index}`}>
                                <div className='mb-3'>
                                    <Form.Label className='fw-bold expression-form-label'>Rule Type</Form.Label>
                                    <Form.Select
                                        value={rule.key}
                                        onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                                        className="expression-form-select"
                                    >
                                        
                                        <option value="age">Age</option>
                                        <option value="credit_score">Credit Score</option>
                                        <option value="account_balance">Account Balance</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2} className="expression-form-col">
                            <Form.Group controlId={`operator-${index}`}>
                                <div className="mb-3">
                                    <Form.Label className='fw-bold expression-form-label'>Operator</Form.Label>
                                    <Form.Select
                                        value={rule.output.operator}
                                        onChange={(e) => handleOutputChange(index, 'operator', e.target.value)}
                                        className="expression-form-select"
                                    >
                                        
                                        <option value=">">{">"}</option>
                                        <option value="<">{"<"}</option>
                                        <option value=">=">{">="}</option>
                                        <option value="<=">{"<="}</option>
                                        <option value="=">{"="}</option>
                                    </Form.Select>
                                </div>

                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2} className="expression-form-col">
                            <Form.Group controlId={`value-${index}`}>
                                <div className="mb-3">
                                    <Form.Label className='fw-bold expression-form-label' >Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={rule.output.value}
                                        onChange={(e) => handleOutputChange(index, 'value', e.target.value)}
                                        className="expression-form-input"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2} className="expression-form-col">
                            <Form.Group controlId={`score-${index}`}>
                                <div className="mb-3">
                                    <Form.Label className='fw-bold expression-form-label'>Score</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={rule.output.score}
                                        onChange={(e) => handleOutputChange(index, 'score', e.target.value)}
                                        className="expression-form-input"
                                    />
                                </div>

                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2} className="expression-form-col">
                            <Button variant="danger" className='mt-3 expression-form-btn' onClick={() => handleDeleteExpression(index)}>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Row className='mt-4 d-flex justify-content-center'>
                    <Col xs={12} sm={12} md={6} lg={4}>
                        <Form.Group controlId="combinator">
                            <Form.Label className='fw-bold expression-form-label'>Connector Type</Form.Label>
                            <Form.Select
                                className="w-100  mb-3 expression-form-select"
                                value={combinator}
                                onChange={(e) => handleCombinatorChange(e.target.value)}
                            >
                                <option value="and">AND</option>
                                <option value="or">OR</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col className='d-flex justify-content-center  '>
                        <Button variant="primary" className='me-2 me-md-4 expression-form-btn' onClick={handleAddExpression}>
                            Add Expression
                        </Button>
                        <Button variant="success" onClick={handleSubmit} className='expression-form-btn'>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Data Display */}
            {data && (
                <div className="mt-4 mb-4">
                    <h2 className='text-center'>Generated Output</h2>
                    <div className='bg-light p-3 rounded rounded-2 shadow'>
                        <pre>{JSON.stringify({ rules, combinator }, null, 2)}</pre>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default ExpressionForm;
