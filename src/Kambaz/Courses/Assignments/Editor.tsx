/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
// import * as db from "../../Database";

export default function AssignmentEditor() {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer );
  const dispatch = useDispatch();

  const { cid } = useParams();
  const { aid } = useParams(); 
  const assignment = assignments.find(
    (a: { course: string | undefined; _id: string | undefined; }) => 
      a.course === cid && 
      a._id === aid
  );

  console.log(assignment);

  return (
    <div id="wd-assignments-editor">
      
      <FormGroup className="mb-3" controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl id="wd-name" type="email" placeholder="Assignment title" value={assignment?.title}/>
      </FormGroup>
      
      <FormGroup className="mb-3" controlId="wd-descriptiona">
        <FormControl id="wd-description" as="textarea" rows={10} placeholder="Enter the assignment description" value={assignment?.description}/>
      </FormGroup>
      
      <Form.Group as={Row} className="mb-3" controlId="wd-points">
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={assignment?.points}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-assignment-type">
        <Form.Label column sm={2}>
          Assignment Group
        </Form.Label>
        <Col sm={10}>
          <FormSelect 
            id="wd-assignment-group"
            value = {assignment?.group}>
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
            value = {assignment?.display}>
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
            value={assignment?.email}
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
            value={assignment?.due}/>
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
            value={assignment?.available.from}/>
        </Col>
        <Col sm={5}>
          <Form.Label column sm={2}>
            Available to
          </Form.Label>
          <Form.Control 
            type="date" 
            id="wd-due-date" 
            value={assignment?.available.to}/>
        </Col>
      </Form.Group>

    </div>

  );
}
