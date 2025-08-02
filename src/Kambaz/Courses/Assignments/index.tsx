/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const faculty: boolean = currentUser && currentUser.role === "FACULTY";
  const dispatch = useDispatch();

  return (
    <div>
      {faculty? <AssignmentsControls /> : <br />}
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            ASSIGNMENTS 
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.filter((assignment: { course: string | undefined; }) => assignment.course === cid)
                        .map((assignment: { course: any; _id: string | undefined; due: Date | undefined; points: string | undefined; available: { to: Date | undefined } | undefined }) => (
              <ListGroup.Item className="wd-assignment-item">
                <div className="wd-assignment-content">
                  <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                  {faculty? 
                    <Link to={`/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`} id="wd-course-modules-link"
                          className="list-group-item text-danger border border-0"> 
                          <CiEdit className="wd-icon wd-edit" /> 
                    </Link> : null}
                  <div className="wd-assignment-details">
                    <span className="wd-assignment-title">{assignment._id}</span>
                    <div className="wd-assignment-meta">
                      <span className="wd-module-text">Multiple Modules</span> | 
                      <span className="wd-unavailable-text">Not available until {assignment.available?.to?.toString()}</span> | <br />
                      <span className="wd-due-text">Due {assignment.due?.toString()}</span> | 
                      <span className="wd-points-text">{assignment.points} pts</span>
                    </div>
                  </div>
                </div>
                <AssignmentControlButtons 
                    _id={ assignment._id }
                    deleteAssignment={(_id) => { dispatch(deleteAssignment(_id)); }} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}