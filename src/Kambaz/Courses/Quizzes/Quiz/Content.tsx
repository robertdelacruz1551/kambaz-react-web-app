/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { Button, Card, Col, Form, FormControl, ListGroup, Row } from "react-bootstrap";
import { CgDanger } from "react-icons/cg";
import { CiCircleQuestion } from "react-icons/ci";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { PiXCircleLight } from "react-icons/pi";

export default function Content(
  { quiz, handleTrueFalseAnswer, handleMultiChoiceAnswer, handleFillInBlankAnswer, handleSubmitQuiz }:
  { 
    quiz: {
      _id: any, 
      details: any, 
      questions: any[]
    };
    handleTrueFalseAnswer: (id: any, index: any, answer: any) => void;
    handleMultiChoiceAnswer: (id: any, index: any, answer: any) => void;
    handleFillInBlankAnswer: (id: any, index: any, answer: any) => void;
    handleSubmitQuiz: () => void;
  }
) {
  const [ active, setActive ] = useState(0);

  return (
    <div className="col-sm-8">
      <br />
      <h1>{quiz.details.title}</h1>

      <span className="badge text-bg-warning">
        <CgDanger /> This is a preview of the published version of the quiz
      </span>
      <br />

      <small>Started: { Date().toString() }</small>

      <br />
      <h2>Quiz Instructions</h2>
      <p>{quiz.details.description}</p>
      <hr></hr>
      <br />


      { quiz.questions
            .filter((_: any, index: any) => index === active)
            .map((question: any) => (
        <Card>
          <Card.Header>
            <div className="d-grid gap-2 d-md-flex">
            </div>

              <Row>
                <Col sm={6}>
                  <strong className="text-start">Question {active + 1}</strong>
                </Col>
                <Col sm={6} className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <strong className="text-end">{question.points} pts</strong>
                </Col>
              </Row>
          </Card.Header>
          <Card.Body>
            <p>{question.text}</p>
            <hr></hr>

            <ListGroup>
              {question.options.map((option: any, index: any) => (
                <ListGroup.Item>
                  {question.type === 'True-False' &&
                    <Form.Check type="radio" label={option} name={question._id}
                      defaultChecked={question.answers[0] === option}
                      onChange={() => handleTrueFalseAnswer(question._id, index, option)}
                    />}

                  {question.type === 'Multiple Choice' &&
                    <Form.Check type="checkbox" label={option} name={question._id}
                      defaultChecked={question.answers[index] === option}
                      onChange={(e) => handleMultiChoiceAnswer(question._id, index, e.target.checked ? option : null)}
                    />}

                  {question.type === 'Fill In The Blank' && 
                    <FormControl type="text" value={question.answers[index]} name={question._id}
                      onChange={(e) => handleFillInBlankAnswer(question._id, index, e.target.value)}
                    />}
                    
                  {question.answers[index] !== null &&
                    (
                      option === question.correct[index] ? 
                        <IoCheckmarkCircleSharp className="wd-icon wd-edit"/>:
                        <PiXCircleLight className="wd-icon wd-edit"/>
                    )}
                    
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
      <br />

      <Row>
        <Col sm={6}>
          <Button variant="secondary" onClick={() => setActive(active > 0 ? active - 1 : 0)}>
            Back
          </Button>        
        </Col>
        <Col sm={6} className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="secondary" onClick={() => setActive(active < quiz.questions.length -1 ? active + 1 : active)}>
            Next
          </Button>
        </Col>
      </Row>
      <br />

      <Card>
        <Card.Body>
          <Row>
            <Col className="d-grid gap-2 d-md-flex justify-content-md-end">
              <p>Quiz saved at 8:19 am</p>
              <Button variant="secondary" onClick={() => handleSubmitQuiz()}> 
                Summit Quiz 
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
      <Row>
        <h3>Questions</h3>
        <ul>
          {quiz.questions.map((_:any, index: any) => 
            <li>
              {index === active && 
                <strong className="text-danger">
                  <CiCircleQuestion /> Question {index + 1}</strong>}
              {index !== active && 
                <span className="text-danger" onClick={() => setActive(index)}>
                  <CiCircleQuestion /> Question {index + 1}</span>}
            </li>
          )}
        </ul>
      </Row>
    </div>
  );
}
