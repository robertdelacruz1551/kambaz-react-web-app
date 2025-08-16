/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormSelect, InputGroup, ListGroup, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { IoCheckmark, IoCheckmarkCircleSharp } from "react-icons/io5";
import { PiXCircleLight } from "react-icons/pi";
import { TfiTrash } from "react-icons/tfi";

export default function Question(
  { question, setQuestion } :
  {
    question: any;
    setQuestion: (question: any) => void;
  }
) 
{

  const [editing, setEditing] = useState(-1);

  const addOption = () => {
    setQuestion({
      ...question, 
      options: [...question.options, '']
    });
  }

  const setOption = (index: any, newOption: any) => {
    setQuestion({
      ...question, 
      options: question.options.map((oldOption: any, i: any) => {
        return index === i? newOption : oldOption;
      })
    });
  }

  const removeOption = (index: any) => {
    setQuestion({
      ...question, 
      options: question.options.filter((_:any, i: any) => i !== index)
    });
  }

  const setCorrect = (option: any) => {
    setQuestion({
      ...question, 
      correct: question.type === 'True-False' ? [option] : [...question.correct, option]
    });
  }

  const setIncorrect = (option: any) => {
    setQuestion({
      ...question, 
      correct: question.correct.filter((o: any) => o !== option)
    });
  }


  return (
    <div id="wd-quiz-editor-questions-cards">
      <br />
      <Row>
        <div id="wd-quiz-editor-questions-model" className="col-md-12">

          <InputGroup className="mb-3">
            <FormControl id="wd-question-title" type="text" name="title" placeholder="Question title"
              value={question.title} onChange={(e) => setQuestion({...question, title: e.target.value})}/>

            <FormSelect 
              id="wd-question-type"
              name="type"
              value = {question.type} 
              onChange={(e) => setQuestion({
                ...question, 
                ...{
                  type: e.target.value,
                  options: e.target.value === 'True-False' ? ['True', 'False'] : []
                }
              })}>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True-False">True-False</option>
              <option value="Fill In The Blank">Fill In The Blank</option>
            </FormSelect>

            <InputGroup.Text id="basic-addon2">Points:</InputGroup.Text>
            <FormControl id="wd-question-points" type="text" name="points" placeholder="#"
              value={question.points} onChange={(e) => setQuestion({...question, points: e.target.value})}/>
          </InputGroup>

          <hr />
          <p>Enter your question and multiple answers, then select the correct answer.</p>
          <strong>Question:</strong><br />
          
          <FormGroup className="mb-3" controlId="wd-descriptiona">
            <FormControl id="wd-question" name="question" as="textarea" rows={5} placeholder="Enter the quiz question here" 
              value={question.text} 
              onChange={(e) => setQuestion({...question, text: e.target.value})}/>
          </FormGroup>
          
          <strong>Question:</strong><br />

          {question.type !== 'True-False' && 
            <Form.Group className="mb-3" >
              <Button variant="primary" size="sm" onClick={addOption}>
                <FiPlus /> Option
              </Button>
            </Form.Group>}

          <ListGroup className="wd-lessons rounded-0">
            {question.options.map((option: any, index: any) => (
              <ListGroup.Item className="wd-quiz-item">
                <div className="wd-quiz-content">
                  <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                  
                  {question.correct.includes(option)?
                    <IoCheckmarkCircleSharp className="wd-icon wd-edit" onClick={() => setIncorrect(option)}/>:
                    <PiXCircleLight className="wd-icon wd-edit" onClick={() => setCorrect(option)}/>} 

                  {editing !== index ? 
                    <CiPen className="wd-icon wd-edit" onClick={() => setEditing(index)}/> :
                    <IoCheckmark className="wd-icon wd-edit" onClick={() => setEditing(-1)}/>}

                  <div className="me-1 position-relative">
                    <FormControl disabled={editing !== index} id="wd-question-title" type="text" name="title" placeholder="Answer..."
                      value={option} onChange={(e) => setOption(index, e.target.value)}/>
                  </div>

                  {editing === index && question.type !== 'True-False' && <TfiTrash className="text-danger me-1 fs-5" onClick={() => removeOption(index)}/>} 

                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

        </div>
      </Row>
    </div>
  );
}