import { Button, FormControl } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

export default function AssignmentControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
      <FormControl type="text" placeholder="Search" />

      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button> 
   </div>
  );
}
