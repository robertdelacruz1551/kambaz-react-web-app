import { FaPlus } from "react-icons/fa6";
import { Button, FormControl, FormGroup } from "react-bootstrap";

export default function AssignmentControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
      <FormGroup className="mb-3" controlId="wd-email">
        <FormControl type="text" placeholder="Search" />
      </FormGroup>
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>   
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>   
     {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
   </div>
  );
}
