/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import Question from "./Question";
import { v4 as uuidv4 } from "uuid"
import { FaCircle, FaTrashAlt } from "react-icons/fa";

export default function Questions(
  { quiz, setQuiz } :
  {
    quiz: any;
    setQuiz: (quiz: any) => void;
  }
) {
  const dummy = {
    _id: uuidv4(),
    title: '',
    type: 'Multiple Choice',
    points: 0,
    text: '',
    options: [],
    correct: [],
    answers: [],
    score: 0
  };

  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState({...dummy});

  const handleClose = (save: boolean = false) => {
    if ( save ) {
      setQuiz({
        ...quiz,
        questions: [...quiz.questions.filter((q: any) => q._id !== question._id), question]
      });
    }
    setQuestion({...dummy});
    setShow(false)
  };

  const handleShow  = (q: any) => {
    setQuestion({...q});
    setShow(true);
  };

  const removeQuestion = (_id: any) => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions.filter((q: any) => q._id !== _id)]
    })
  };
  
  return (
    <div id="wd-quiz-editor-questions-cards">
      <br />
      <Row>
        <div id="wd-quiz-editor-questions" className="col-md-12">
          <Form.Group className="mb-3" >
            <Button variant="secondary" size="lg" onClick={() => handleShow({...dummy, _id: uuidv4()})}>
              <FiPlus /> New Question
            </Button>
          </Form.Group>

          <ListGroup className="rounded-0" id="wd-question">
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              <ListGroup className="wd-lessons rounded-0">
                {quiz.questions.map((question: any) => (
                  <ListGroup.Item className="wd-quiz-item">
                    <div className="wd-quiz-content">
                      <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                      
                      <CiPen className="wd-icon wd-edit"  onClick={() => {
                        handleShow({...question});
                      }}/>

                      <div className="wd-quiz-details">
                        <small> {question.text} </small>
                        <div className="wd-quiz-meta">
                          <span className="wd-module-text"> {question.type} </span> | 
                          <span className="wd-points-text"> {question.points} pts </span>
                        </div>
                      </div>

                    </div>

                    <span className="me-1 position-relative" onClick = {() => removeQuestion(question._id)} >
                      <FaTrashAlt style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
                      <FaCircle className="text-white me-1 fs-6" />
                    </span>

                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>


          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Question question={question} 
                        setQuestion={setQuestion}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose(false)}> Close </Button>
              <Button variant="primary" onClick={() => handleClose(true)}> Save </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </Row>
    </div>
  );
}