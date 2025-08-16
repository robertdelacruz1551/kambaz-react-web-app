/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, Form, ListGroup } from "react-bootstrap";
import { CgDanger } from "react-icons/cg";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function QuizPreview(
  { quiz, preview }:
  { quiz: any, preview: boolean }
) {
  return (
    <div>
      <br />
      <h1>{quiz.title}</h1>
      {preview &&
        <span className="badge text-bg-warning">
          <CgDanger /> This is a preview of the published version of the quiz
        </span>}

      <small>Started: { Date().toString() }</small>
      <h2>Quiz Instructions</h2>
      <hr></hr>
      {quiz.questions.map((question: any, index: any) => {
        <Card id={`wd-question-${index}`}>
          <Card.Header>
            <h3>Question {index + 1}</h3>
            <h3 className="text-end">{question.points} pts</h3>
          </Card.Header>
          <Card.Body>
            <p>{question.text}</p>
            <hr></hr>

            <ListGroup>
              {question.options.map((option: any) => {
                <ListGroup.Item>
                  {question.type === 'True-False' &&
                    <Form.Check type="radio" label={option.text} name={question._id}/>}
                  {question.type === 'Multiple Choice' &&
                    <Form.Check type="checkbox" label={option.text} name={question._id}/>}
                </ListGroup.Item>
              })}
            </ListGroup>

          </Card.Body>
        </Card>
      })}
    </div>
  );
}
// {
//   _id: uuidv4(),
//   type: 'Multiple Choice',
//   points: 0,
//   text: '',
//   options: [],
//   correct: []
// }