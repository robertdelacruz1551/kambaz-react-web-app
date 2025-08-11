/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  // const { assignments } = useSelector((state: any) => state.assignmentsReducer );
  const { cid } = useParams();
  const { aid } = useParams(); 
  const [assignment, setAssignment] = useState({
    title: '', 
    course: cid, 
    description: '', 
    points: '', 
    group: 'ASSIGNMENTS', 
    display: 'ABSOLUTE', 
    submission: 'Web', 
    email: '', 
    due: Date(), 
    available: {
      from: Date(), 
      to: Date(),
    } 
  });

  const fetchAssignment = async () => {
    if (aid !== 'add') {
      const response = await assignmentClient.findAssignment(aid);
      setAssignment({...assignment, ...response });
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewAssignment = async (assignment: any) => {
    await assignmentClient.createAssignment(assignment);
    dispatch(addAssignment(assignment));
  };

  const updateExistingAssignment = async (assignment: any) => {
    await assignmentClient.updateAssignment(cid, aid, assignment);
    dispatch(updateAssignment(assignment));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (aid === 'add') createNewAssignment(assignment);
    if (aid !== 'add') updateExistingAssignment(assignment);
  }

  useEffect( () => {
    fetchAssignment()
  }, []);

  return (
    <div id="wd-assignments-editor">
      <form onSubmit={handleSubmit}>

        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl id="wd-name" type="text" name="title" placeholder="Assignment title"
            value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}/>
        </FormGroup>
        
        <FormGroup className="mb-3" controlId="wd-descriptiona">
          <FormControl id="wd-description" name="description" as="textarea" rows={10} placeholder="Enter the assignment description" 
            value={assignment.description} 
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}/>
        </FormGroup>
        
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="points" value={assignment.points} 
              onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}/>
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
              value = {assignment.group} 
              onChange={(e) => setAssignment({ ...assignment, group: e.target.value })}>
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
              value = {assignment.display} 
              onChange={(e) => setAssignment({ ...assignment, display: e.target.value })}>
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
              value={assignment.email}
              onChange={(e) => setAssignment({ ...assignment, email: e.target.value })}
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
              value={assignment.due}
              onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}/>
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
              value={assignment.available.from}
              onChange={(e) => setAssignment({ ...assignment, available: { from: e.target.value, to: assignment.available.to} })}/>
          </Col>
          <Col sm={5}>
            <Form.Label column sm={2}>
              Available to
            </Form.Label>
            <Form.Control 
              type="date" 
              id="wd-to-date" 
              name="to"
              value={assignment.available.to}
              onChange={(e) => setAssignment({ ...assignment, available: { from: assignment.available.from, to: e.target.value} })}/>
          </Col>
        </Form.Group>
        <Button onClick={() => { navigate(`/Kambaz/Courses/${cid}/Assignments`); }}>Cancel</Button>
        <Button variant="danger" type="submit">Save</Button>
      </form>
    </div>

  );
}

