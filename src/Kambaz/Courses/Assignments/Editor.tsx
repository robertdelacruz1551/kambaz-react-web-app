/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";

import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer );
  
  const navigate = useNavigate();
  const { cid } = useParams();
  const { aid } = useParams(); 
  const dispatch = useDispatch();

  const createNewAssignment = async (assignment: any) => {
    await assignmentClient.createAssignment(assignment);
    dispatch(addAssignment(assignment));
  };

  const updateExistingAssignment = async (assignment: any) => {
    await assignmentClient.updateAssignment(cid, aid, assignment);
    dispatch(updateAssignment(payload));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (aid === 'add') createNewAssignment(payload);
    if (aid !== 'add') updateExistingAssignment(payload);
  }

  const assignment = assignments.find(
    (a: { course: string | undefined; _id: string | undefined; }) => 
      a.course === cid && 
      a._id === aid
  ) || { 
      _id: `A${101 + assignments.length}`,
      title: null, 
      course: cid, 
      description: null, 
      points: null, 
      group: null, 
      display: null, 
      submission: null, 
      email: null, 
      due: null, 
      available: {
        from: null, 
        to: null,
      } 
  };

  const [payload, setPayload] = useState(assignment);


  return (
    <div id="wd-assignments-editor">
      <form onSubmit={handleSubmit}>

        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl id="wd-name" type="text" name="title" placeholder="Assignment title"
            value={payload.title} onChange={(e) => setPayload({ ...payload, title: e.target.value })}/>
        </FormGroup>
        
        <FormGroup className="mb-3" controlId="wd-descriptiona">
          <FormControl id="wd-description" name="description" as="textarea" rows={10} placeholder="Enter the assignment description" 
            value={payload.description} 
            onChange={(e) => setPayload({ ...payload, description: e.target.value })}/>
        </FormGroup>
        
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="points" value={payload.points} 
              onChange={(e) => setPayload({ ...payload, points: e.target.value })}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-assignment-type">
          <Form.Label column sm={2}>
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <FormSelect 
              id="wd-assignment-group"
              name="group"
              value = {payload.group} 
              onChange={(e) => setPayload({ ...payload, group: e.target.value })}>
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
              name="display"
              value = {payload.display} 
              onChange={(e) => setPayload({ ...payload, display: e.target.value })}>
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
              <input type="checkbox" name="submission" id="wd-text-entry"/>
              <label htmlFor="wd-text-entry">Text Entry</label><br/>
              <input type="checkbox" name="submission" id="wd-website-url"/>
              <label htmlFor="wd-website-url">Website URL</label><br/>
              <input type="checkbox" name="submission" id="wd-media-recordings"/>
              <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
              <input type="checkbox" name="submission" id="wd-student-annotation"/>
              <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
              <input type="checkbox" name="submission" id="wd-file-upload"/>
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
              placeholder="jdoe@email.com"
              name="email"
              id="wd-assign-to"
              value={payload.email}
              onChange={(e) => setPayload({ ...payload, email: e.target.value })}
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
              name="due"
              value={payload.due}
              onChange={(e) => setPayload({ ...payload, due: e.target.value })}/>
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
              id="wd-from-date" 
              name="from"
              value={payload.available.from}
              onChange={(e) => setPayload({ ...payload, available: { from: e.target.value, to: payload.available.to} })}/>
          </Col>
          <Col sm={5}>
            <Form.Label column sm={2}>
              Available to
            </Form.Label>
            <Form.Control 
              type="date" 
              id="wd-to-date" 
              name="to"
              value={payload.available.to}
              onChange={(e) => setPayload({ ...payload, available: { from: payload.available.from, to: e.target.value} })}/>
          </Col>
        </Form.Group>
        <Button onClick={() => { navigate(`/Kambaz/Courses/${cid}/Assignments`); }}>Cancel</Button>
        <Button variant="danger" type="submit">Save</Button>
      </form>
    </div>

  );
}

