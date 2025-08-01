/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
// import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
// import * as db from "../../Database";

export default function AssignmentEditor() {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer );
  
  const { cid } = useParams();
  const { aid } = useParams(); 
  const assignment = assignments.find(
    (a: { course: string | undefined; _id: string | undefined; }) => 
      a.course === cid && 
      a._id === aid
  );


  // String fields, initialized as empty strings
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [group, setGroup] = useState(assignment.group);
  const [email, setEmail] = useState(assignment.email);

  // Number field, initialized to 0
  const [points, setPoints] = useState(assignment.points);
  const [display, setDisplay] = useState(assignment.display);
  const [due, setDue] = useState(assignment.due);
  const [availableFrom, setAvailableFrom] = useState(assignment.available.from);
  const [availableTo, setAvailableTo] = useState(assignment.available.from);

  // const [course, setCourse] = useState(assignment.course);
  // const [submission, setSubmission] = useState(assignment.submission);

  const handleTitleChange = (event: { target: { value: any; }; }) => { setTitle(event.target.value); };
  const handleDescChange = (event: { target: { value: any; }; }) => { setDescription(event.target.value); };
  const handleGroupChange = (event: { target: { value: any; }; }) => { setGroup(event.target.value); };
  const handleEmailChange = (event: { target: { value: any; }; }) => { setEmail(event.target.value); };
  const handlePointsChange = (event: { target: { value: any; }; }) => { setPoints(event.target.value); };
  const handleDisplayChange = (event: { target: { value: any; }; }) => { setDisplay(event.target.value); };
  const handleDueChange = (event: { target: { value: any; }; }) => { setDue(event.target.value); };
  const handleAvailableFromChange = (event: { target: { value: any; }; }) => { setAvailableFrom(event.target.value); };
  const handleAvailableToChange = (event: { target: { value: any; }; }) => { setAvailableTo(event.target.value); };


  return (
    <div id="wd-assignments-editor">
      
      <FormGroup className="mb-3" controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl id="wd-name" type="email" placeholder="Assignment title"
           value={title} onChange={handleTitleChange}/>
      </FormGroup>
      
      <FormGroup className="mb-3" controlId="wd-descriptiona">
        <FormControl id="wd-description" as="textarea" rows={10} placeholder="Enter the assignment description" 
          value={description} onChange={handleDescChange}/>
      </FormGroup>
      
      <Form.Group as={Row} className="mb-3" controlId="wd-points">
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={points} onChange={handlePointsChange}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-assignment-type">
        <Form.Label column sm={2}>
          Assignment Group
        </Form.Label>
        <Col sm={10}>
          <FormSelect 
            id="wd-assignment-group"
            value = {group} onChange={handleGroupChange}>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="OTHER">OTHER</option>
          </FormSelect>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-display-grade">
        <Form.Label column sm={2}>
          Display Grade As
        </Form.Label>
        <Col sm={10}>
          <FormSelect
            id = "wd-display-grade"
            value = {display} onChange={handleDisplayChange}>
            <option value="PERCENTAGE">Percentage</option>
            <option value="ABSOLUTE">Absolute</option>
          </FormSelect>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
        <Form.Label column sm={2}>
          Submission Type
        </Form.Label>
        <Col sm={10}>
            <input type="checkbox" name="check-genre" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>
            <input type="checkbox" name="check-genre" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
            <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
            <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
            <input type="checkbox" name="check-genre" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label><br/>
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="wd-assign-to">
        <Form.Label column sm={2}>
          Assigned To
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
            type="email" 
            placeholder="jdoe" 
            id="wd-assign-to"
            value={email}
            onChange={handleEmailChange}
          />
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
        <Form.Label column sm={2}>
          Due Date
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
            type="date" 
            id="wd-due-date" 
            value={due}
            onChange={handleDueChange}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
        <Col sm={2}></Col>
        <Col sm={5}>
          <Form.Label column sm={2}>
            Available from
          </Form.Label>
          <Form.Control 
            type="date" 
            id="wd-due-date" 
            value={availableFrom}
            onChange={handleAvailableFromChange}/>
        </Col>
        <Col sm={5}>
          <Form.Label column sm={2}>
            Available to
          </Form.Label>
          <Form.Control 
            type="date" 
            id="wd-due-date" 
            value={availableTo}
            onChange={handleAvailableToChange}/>
        </Col>
      </Form.Group>

    </div>

  );
}
