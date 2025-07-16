import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            ASSIGNMENTS 
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-assignment-item">
              <div className="wd-assignment-content">
                <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                <Link to="/Kambaz/Courses/1234/Assignments/1234" id="wd-course-modules-link"
                      className="list-group-item text-danger border border-0"> 
                      <CiEdit className="wd-icon wd-edit" /> 
                </Link>
                <div className="wd-assignment-details">
                  <span className="wd-assignment-title">A1</span>
                  <div className="wd-assignment-meta">
                    <span className="wd-module-text">Multiple Modules</span> | 
                    <span className="wd-unavailable-text">Not available until May 6 at 12:00am</span> | <br />
                    <span className="wd-due-text">Due May 13 at 11:59pm</span> | 
                    <span className="wd-points-text">100 pts</span>
                  </div>
                </div>
              </div>
              <LessonControlButtons /> 
            </ListGroup.Item>
 
            <ListGroup.Item className="wd-assignment-item">
              <div className="wd-assignment-content">
                <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                <Link to="/Kambaz/Courses/1234/Assignments/1234" id="wd-course-modules-link"
                      className="list-group-item text-danger border border-0"> 
                      <CiEdit className="wd-icon wd-edit" /> 
                </Link>
                <div className="wd-assignment-details">
                  <span className="wd-assignment-title">A2</span>
                  <div className="wd-assignment-meta">
                    <span className="wd-module-text">Multiple Modules</span> | 
                    <span className="wd-unavailable-text">Not available until May 6 at 12:00am</span> | <br />
                    <span className="wd-due-text">Due May 13 at 11:59pm</span> | 
                    <span className="wd-points-text">100 pts</span>
                  </div>
                </div>
              </div>
              <LessonControlButtons /> 
            </ListGroup.Item>

            <ListGroup.Item className="wd-assignment-item">
              <div className="wd-assignment-content">
                <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                <Link to="/Kambaz/Courses/1234/Assignments/1234" id="wd-course-modules-link"
                      className="list-group-item text-danger border border-0"> 
                      <CiEdit className="wd-icon wd-edit" /> 
                </Link>
                <div className="wd-assignment-details">
                  <span className="wd-assignment-title">A3</span>
                  <div className="wd-assignment-meta">
                    <span className="wd-module-text">Multiple Modules</span> | 
                    <span className="wd-unavailable-text">Not available until May 6 at 12:00am</span> | <br />
                    <span className="wd-due-text">Due May 13 at 11:59pm</span> | 
                    <span className="wd-points-text">100 pts</span>
                  </div>
                </div>
              </div>
              <LessonControlButtons /> 
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

{/* 
  <div id="wd-assignments">
    <input placeholder="Search for Assignments"
            id="wd-search-assignment" />
    <button id="wd-add-assignment-group">+ Group</button>
    <button id="wd-add-assignment">+ Assignment</button>
    <h3 id="wd-assignments-title">
      ASSIGNMENTS 40% of Total <button>+</button> </h3>
    <ul id="wd-assignment-list">
      <li className="wd-assignment-list-item">
        <a href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link" >
          A1 - ENV + HTML
        </a>
        <p>Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100pts</p>
      </li>
      <li className="wd-assignment-list-item">
        <a href="#/Kambaz/Courses/1234/Assignments/124"
            className="wd-assignment-link" >
          A2 - POTATOES + BANANAS
        </a>
        <p>Single Module | <strong>Not available until</strong> Feb 14 at 12:00am | <strong>Due</strong> Mar 20 at 11:59pm | 100pts</p>
      </li>
    </ul>
  </div> 
*/}