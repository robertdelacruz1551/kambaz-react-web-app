/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from "react-redux";
import TOC from "./TOC";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import store from "../../../../store";
import Details from "./Details";
import Questions from "./Questions";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as client from "../../client";
// import { v4 as uuidv4 } from "uuid"

export default function QuizEditor() {

  const { cid } = useParams();
  const { qid } = useParams(); 
  
  const dummy = {
    details: {
      title: '', 
      course: cid, 
      description: '', 
      type: "GRADED",
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

  const [quiz, setQuiz] = useState({...dummy});

  const fetchQuiz = async () => {
    const response = await client.findQuiz(qid);
    setQuiz({ ...quiz, ...response});
  }

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await client.createOrUpdate(quiz);
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  }

  useEffect( () => {
    fetchQuiz()
  }, []);
  
  return (
    <Provider store={store}>
      <div id="wd-quizzes">
        <Col sm={8}>
          <form onSubmit={handleSubmit}>
            <TOC />
            
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<Navigate to="Detail" />} />
                  <Route path="Detail/*" element={
                    <Details 
                      quiz={quiz}
                      setQuiz={setQuiz}
                    />
                  } />
                  <Route path="Questions/*" element={
                    <Questions 
                      quiz={quiz} 
                      setQuiz={setQuiz}
                    />
                  } />
                </Routes>
              </Col>
            </Row>


            <Row>
              <Col sm={2}></Col>
              <Col sm={10}>
                  <Card className="10">
                    <Card.Body>
                      <Button onClick={() => { navigate(`/Kambaz/Courses/${cid}/Quizzes`); }} variant="secondary" >Cancel</Button>
                      <Button variant="danger" type="submit">Save</Button>
                    </Card.Body>
                  </Card>
              </Col>
            </Row>

          </form>
        </Col>
      </div>
    </Provider>
  );
}
