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
import { v4 as uuidv4 } from "uuid"

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
    const que = {
      ...question,
      options: [
        ...question.options, 
        { _id: uuidv4(),
          text:'', 
          correct: false, 
          answer: null }
      ]
    };
    setQuestion({...que});
  }

  const setOption = (option: any) => {
    const que = {
      ...question, 
      options: [...question.options.map((original:any) => original._id === option._id ? option : original)]
    };
    setQuestion({...que});
  }

  const removeOption = (_id: any) => {
    const que = {
      ...question, 
      options: [...question.options.filter((option : any) => option._id !== _id)]
    };
    setQuestion({...que});
  }

  const setCorrect = (option: any) => {
    const que = {
      ...question,
      options: [
        ...question.options.map(
          (original: any) => {
            if (question.type === 'True-False') {
              return original._id === option._id ? { ...option, correct: true } : {...original, correct: false };
            } else {
              return original._id === option._id ? { ...option, correct: true } : original;
            }
          }
        )
      ]
    }
    setQuestion({...que});
  }

  const setIncorrect = (option: any) => {
    const que = {
      ...question,
      options: [
        ...question.options.map(
          (original: any) => original._id === option._id ? { ...option, correct: false } : original
        )
      ]
    }
    setQuestion({...que});
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
                  options: e.target.value === 'True-False' ? [{ _id: uuidv4(), text:'True', correct: false, answer: null }, { _id: uuidv4(), text:'False', correct: false, answer: null }] : [],
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
          {question.type === 'Multiple Choice' && <p>Enter your question and multiple answers, then select the correct answer.</p>}
          {question.type === 'True-False' && <p>Enter your question and specify the correct true/false answers, then select the correct answer.</p>}
          {question.type === 'Fill In The Blank' && <p>Enter your question and add fill in the blank placeholders.</p>}
          
          <strong>Question:</strong><br />
          
          <FormGroup className="mb-3" controlId="wd-descriptiona">
            <FormControl id="wd-question" name="question" as="textarea" rows={5} placeholder="Enter the quiz question here" 
              value={question.text} 
              onChange={(e) => setQuestion({...question, text: e.target.value})}/>
          </FormGroup>
          
          <strong>Options:</strong><br />

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
                  
                  {question.type !== 'Fill In The Blank' && 
                    (
                      option.correct?
                        <IoCheckmarkCircleSharp className="wd-icon wd-edit" onClick={() => setIncorrect({...option, correct: false})}/>:
                        <PiXCircleLight className="wd-icon wd-edit" onClick={() => setCorrect({...option, correct: true})}/>
                    )} 

                  {editing !== index ? 
                    <CiPen className="wd-icon wd-edit" onClick={() => setEditing(index)}/> :
                    <IoCheckmark className="wd-icon wd-edit" onClick={() => setEditing(-1)}/>}

                  <div className="me-1 position-relative">
                    <FormControl disabled={editing !== index} id={`wd-${question._id}`} type="text" name={question.text} placeholder="Answer..."
                      value={option.text} 
                      onChange={(e) => setOption({...option, text: e.target.value})}/>
                  </div>

                  {editing === index && question.type !== 'True-False' && 
                    <TfiTrash className="text-danger me-1 fs-5" onClick={() => removeOption(option._id)}/>} 

                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

        </div>
      </Row>
    </div>
  );
}