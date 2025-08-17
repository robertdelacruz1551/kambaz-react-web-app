/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { Button, Card, Col, Form, FormControl, ListGroup, Modal, Row } from "react-bootstrap";
import { CgDanger } from "react-icons/cg";
import { CiCircleQuestion } from "react-icons/ci";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { PiXCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Content(
  { quiz, handleAnswerReceived, handleSubmitQuiz }:
  { 
    quiz: {
      _id: any,
      quizId: any,
      userId: any,
      published: any,
      final: any, 
      created: any,
      updated: any,
      details: any, 
      score: any | undefined,
      questions: any[],
      preview: boolean
    };
    handleAnswerReceived: (questionId: any, answer: any) => void;
    handleSubmitQuiz: (final: boolean) => void;
  }
) {
  const [ active, setActive ] = useState(0);
  const [quizSaveModelShow, setQuizSaveModelShow] = useState(false);
  const [quizExitModelShow, setQuizExitModelShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmitQuizInternal = () => {
    handleSubmitQuiz(true);
    setQuizSaveModelShow(false);
  }

  return (
    <div className="col-sm-8">
      <br />
      <h1>{quiz.details.title}</h1>

      {quiz.preview &&
        <span className="badge text-bg-warning">
          <CgDanger /> This is a preview of the published version of the quiz
        </span>}
      <br />

      <small>Started: { Date().toString() }</small>

      <br />

      {!quiz.final ? 
        <>
          <h2>Quiz Instructions</h2>
          <p>{quiz.details.description}</p> 
        </> :
        <>
          <h2>Quiz Results</h2>
          <h3 className="text-danger">{quiz.score || 0}% Score</h3>
        </>    
      }
      
      <hr></hr>
      <br />   

      { quiz.questions
            .filter((_: any, index: any) => index === active || quiz.final)
            .map((question: any) => (
        <>
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
                {question.options.map((option: any) => (
                  <ListGroup.Item>
                    {question.type === 'True-False' &&
                      <Form.Check type="radio" label={option.text} name={question._id} disabled={quiz.final}
                        defaultChecked={option.answer !== null}
                        onChange={() => handleAnswerReceived(question._id, {...option, answer: option.text})}
                      />}

                    {question.type === 'Multiple Choice' &&
                      <Form.Check type="checkbox" label={option.text} name={question._id} disabled={quiz.final}
                        defaultChecked={option.answer !== null}
                        onChange={(e) => handleAnswerReceived(question._id, {...option, answer: e.target.checked ? option.text : null})}
                      />}

                    {question.type === 'Fill In The Blank' && 
                      <FormControl type="text" value={option.answer} name={question._id} disabled={quiz.final}
                        onChange={(e) => handleAnswerReceived(question._id, {...option, answer: e.target.value})}
                      />}
                      
                    {(quiz.final) && 
                      (option.text === option.answer && option.correct? 
                        <IoCheckmarkCircleSharp className="wd-icon wd-edit"/>:
                        <PiXCircleLight className="wd-icon wd-edit"/>)}
                      
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <br />        
        </>
      ))}
      <br />

      {!quiz.final && 
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
        </Row>}

      <br />

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Button variant="primary"  onClick={() => setQuizExitModelShow(true)}> 
                Exit 
              </Button>
              <Modal show={quizExitModelShow} onHide={() => setQuizExitModelShow(false)}>
                <Modal.Body>Are you sure you want to exit this quiz?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setQuizExitModelShow(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger"  onClick={() => navigate(`/Kambaz/Courses/${quiz.details.course}/Quiz/${quiz.quizId}/View`)}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col className="d-grid gap-2 d-md-flex justify-content-md-end">
              <p>Quiz saved at 8:19 am</p>
              <Button variant="danger"  disabled={quiz.final} onClick={() => setQuizSaveModelShow(true)}> 
                Summit Quiz 
              </Button>

              <Modal show={quizSaveModelShow} onHide={() => setQuizSaveModelShow(false)}>
                <Modal.Body>Are you sure you want to submit this quiz?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setQuizSaveModelShow(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger"  onClick={() => handleSubmitQuizInternal()}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
      {!quiz.final && 
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
        </Row>}
    </div>
  );
}
