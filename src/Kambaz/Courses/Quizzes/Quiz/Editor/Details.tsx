/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Form, FormControl, FormGroup, FormSelect, Row } from "react-bootstrap";

export default function Details(
  { quiz, setQuiz }:
  {
      quiz: any;
      setQuiz: (quiz: any) => void;
    }
) {
  return (
    <div id="wd-quiz-editor-details-cards">
      <br />
      <Row>
        <div id="wd-quiz-editor-details" className="col-md-12">
          <FormGroup className="mb-3" controlId="wd-name">
            <FormControl disabled id="wd-name" type="text" name="title" placeholder="Quiz title"
              value={quiz._id} />
          </FormGroup>

          <FormGroup className="mb-3" controlId="wd-name">
            <FormControl id="wd-name" type="text" name="title" placeholder="Quiz title"
              value={quiz.details.title} 
              onChange={(e) => setQuiz({
                ...quiz, 
                details: { ...quiz.details, title: e.target.value }
              })}/>
          </FormGroup>
          
          <FormGroup className="mb-3" controlId="wd-descriptiona">
            <FormControl id="wd-description" name="description" as="textarea" rows={5} placeholder="Enter the quiz description" 
              value={quiz.details.description} 
              onChange={(e) => setQuiz({
                ...quiz, 
                details: { ...quiz.details, description: e.target.value }
              })}/>
          </FormGroup>

          <Form.Group as={Row} className="mb-3" controlId="wd-assignment-type">
            <Form.Label column sm={2}>
              Quiz Type
            </Form.Label>
            <Col sm={10}>
              <FormSelect 
                id="wd-quiz-type"
                name="group"
                value = {quiz.details.type} 
                onChange={(e) => setQuiz({
                  ...quiz, 
                  details: { ...quiz.details, type: e.target.value }
                })}>
                <option value="GRADED QUIZ">Graded Quiz</option>
                <option value="PRACTICE QUIZ">Practive Quiz</option>
                <option value="GRADED SURVEY">Graded Survey</option>
                <option value="UNGRADED SURVEY">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Form.Group>
                    
          <Form.Group as={Row} className="mb-3" controlId="wd-points">
            <Form.Label column sm={2}>
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" name="points" value={quiz.details.points} 
                onChange={(e) => setQuiz({
                  ...quiz, 
                  details: { ...quiz.details, points: +e.target.value }
                })}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-assignment-type">
            <Form.Label column sm={2}>
              Assignment Group
            </Form.Label>
            <Col sm={10}>
              <FormSelect 
                id="wd-quiz-group"
                name="group"
                value = {quiz.details.group} 
                onChange={(e) => setQuiz({
                  ...quiz, 
                  details: { ...quiz.details, group: e.target.value }
                })}>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </FormSelect>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
            <Col sm={2}>
            </Col>
            <Col sm={10}>
              <strong>Options</strong><br />
              
              <input type="checkbox" name="shuffle-answers" id="wd-shuffle-answers"/>
              <label htmlFor="wd-shuffle-answers">Shuffle Answers</label><br/>

              <input type="checkbox" name="time-limit" id="wd-time-limit"/>
              <label htmlFor="wd-time-limit">Time Limit</label><br/>

              <input type="checkbox" name="multi-attempts" id="wd-multi-attempts"/>
              <label htmlFor="wd-multi-attempts">Allow Multiple Attempts</label><br/>
            </Col>
          </Form.Group>

          <Row>
            <Col sm={2}>
              <Form.Label column sm={2}>
                Assign
              </Form.Label>
            </Col>
            <Col sm={10}>
              <Card className="10">
                <Card.Body>
                  <Card.Text>
                    <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
                      <Col sm={12}>
                        <Form.Label column sm={2}>
                          Due
                        </Form.Label>
                        <Form.Control 
                          type="date" 
                          id="wd-due-date" 
                          name="due"
                          value={quiz.details.due}
                          onChange={(e) => setQuiz({
                            ...quiz, 
                            details: { ...quiz.details, due: e.target.value }
                          })}/>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
                      <Col sm={6}>
                        <Form.Label column sm={12}>
                          Available from
                        </Form.Label>
                        <Form.Control 
                          type="date" 
                          id="wd-from-date" 
                          name="from"
                          value={quiz.details.available.from}
                          onChange={(e) => setQuiz({
                            ...quiz, 
                            details: {
                              ...quiz.details,
                              available: {
                                ...quiz.details.available,
                                from: e.target.value
                              }
                            }
                          })}/>
                      </Col>
                      <Col sm={6}>
                        <Form.Label column sm={12}>
                          Until
                        </Form.Label>
                        <Form.Control 
                          type="date" 
                          id="wd-to-date" 
                          name="to"
                          value={quiz.details.available.to}
                          onChange={(e) => setQuiz({
                            ...quiz, 
                            details: {
                              ...quiz.details,
                              available: {
                                ...quiz.details.available,
                                to: e.target.value
                              }
                            }
                          })}/>
                      </Col>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
}

