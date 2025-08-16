/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "../client";

export default function QuizSummary() {
  const { cid } = useParams();
  const { qid } = useParams(); 
  const navigate = useNavigate();

  const dummy = {
    details: {
      title: '', 
      course: cid, 
      description: '', 
      typ: "GRADED",
      points: 0,
      group: "QUIZZES",
      shuffle: true,
      timeLimit: 20,
      multiattempts: false,
      show: 'IMMEDIATELY',
      code: '',
      oneQuestion: true,
      webcam: false,
      lock: false,
      due: Date(), 
      available: {
        from: Date(), 
        to: Date(),
      }
    },
    questions: []
  };
  console.log(dummy);
  const [quiz, setQuiz] = useState({...dummy});
  
  const fetchQuiz = async () => {
    const response = await client.findQuiz(qid);
    setQuiz({ ...quiz, ...response});
  }

  useEffect( () => {
    fetchQuiz()
  }, []);
  
  return (
    <div>
      
      <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>Back Quiz List</Button>
      <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Quiz/${qid}/Take`)}>Take Quiz</Button>
      <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Quiz/${qid}/Edit`)}>Edit</Button>

      <br />
      <br />
      
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Title</b></Col>
        <Col md={6}>{quiz.details.title}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Description</b></Col>
        <Col md={6}>{quiz.details.description}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Course</b></Col>
        <Col md={6}>{quiz.details.course}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Quiz Type</b></Col>
        <Col md={6}>{quiz.details.typ}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Points</b></Col>
        <Col md={6}>{quiz.details.points}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Assignment Group</b></Col>
        <Col md={6}>{quiz.details.group}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Shuffle Answers</b></Col>
        <Col md={6}>{quiz.details.shuffle? 'Yes' : 'No'}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Time Limit</b></Col>
        <Col md={6}>{quiz.details.timeLimit} Minutes</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Multiple Attempts</b></Col>
        <Col md={6}>{quiz.details.multiattempts? 'Yes' : 'No'}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>View Responses</b></Col>
        <Col md={6}>Always</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Show Correct Answers</b></Col>
        <Col md={6}>{quiz.details.show}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>One Question at a Time</b></Col>
        <Col md={6}>{quiz.details.oneQuestion? 'Yes' : 'No'}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Require Respondus LockDown Browser</b></Col>
        <Col md={6}>No</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Required to View Quiz Results</b></Col>
        <Col md={6}>No</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Webcam Required</b></Col>
        <Col md={6}>{quiz.details.webcam? 'Yes' : 'No'}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} className="text-end"><b>Lock Questions After Answering</b></Col>
        <Col md={6}>{quiz.details.lock? 'Yes' : 'No'}</Col>
      </Row>

      <br />
      <br />
      <Table className="table">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.details.due}</td>
            <td>Everyone</td>
            <td>{quiz.details.available.from}</td>
            <td>{quiz.details.available.to}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

