import { Button, FormControl } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <FormControl type="text" placeholder="Search" />

      <Button variant="danger" size="lg" 
              className="me-1 float-end" 
              id="wd-add-module-btn"
              onClick={() => { navigate(`/Kambaz/Courses/${cid}/Quiz/New/Edit`); }}>
        <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
      </Button>
    </div>
  );
}