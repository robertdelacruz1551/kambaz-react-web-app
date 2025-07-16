import { Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      
      <FormGroup className="mb-3" controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl id="wd-name" type="email" placeholder="A1 - ENV + HTML" />
      </FormGroup>
      
      <FormGroup className="mb-3" controlId="wd-descriptiona">
        <FormControl id="wd-description" as="textarea" rows={10} placeholder="The assignment is available online Submit a link to the landing page of"/>
      </FormGroup>
      
      <Form.Group as={Row} className="mb-3" controlId="wd-points">
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-assignment-type">
        <Form.Label column sm={2}>
          Assignment Group
        </Form.Label>
        <Col sm={10}>
          <FormSelect>
            <option selected>ASSIGNMENTS</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </FormSelect>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-display-grade">
        <Form.Label column sm={2}>
          Display Grade As
        </Form.Label>
        <Col sm={10}>
          <FormSelect>
            <option selected>Percentage</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
          <Form.Control type="email" placeholder="jdoe" id="wd-assign-to"/>
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
        <Form.Label column sm={2}>
          Due Date
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="date" id="wd-due-date" value="2000-01-21"/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
        <Col sm={2}></Col>
        <Col sm={5}>
          <Form.Label column sm={2}>
            Available from
          </Form.Label>
          <Form.Control type="date" id="wd-due-date" value="2000-01-21"/>
        </Col>
        <Col sm={5}>
          <Form.Label column sm={2}>
            Available to
          </Form.Label>
          <Form.Control type="date" id="wd-due-date" value="2000-01-21"/>
        </Col>
      </Form.Group>

    </div>

  );
}
