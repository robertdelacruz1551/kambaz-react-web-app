/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Assignments() {
  const { cid } = useParams();
  // const assignments = db.assignments; // TODO: replace with reducer
  const { assignments } = useSelector((state: any) => state.assignmentsReducer );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const faculty = currentUser && currentUser.role === "FACULTY";
  
  return (
    <div>
      {faculty? <AssignmentControls /> : <br />}
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            ASSIGNMENTS 
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.filter((assignment: { course: string | undefined; }) => assignment.course === cid)
                        .map((assignment: { course: any; _id: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <ListGroup.Item className="wd-assignment-item">
                <div className="wd-assignment-content">
                  <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                  <Link to={`/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`} id="wd-course-modules-link"
                        className="list-group-item text-danger border border-0"> 
                        <CiEdit className="wd-icon wd-edit" /> 
                  </Link>
                  <div className="wd-assignment-details">
                    <span className="wd-assignment-title">{assignment._id}</span>
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
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}