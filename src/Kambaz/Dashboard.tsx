/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { addCourse, updateCourse, deleteCourse } from "./Courses/reducer";
import { useSelector } from "react-redux";

export default function Dashboard(
    // { courses, course, enrollments, setCourse, addNewCourse, deleteCourse, updateCourse, addEnrollment, deleteEnrollment }: 
    // {
    //   courses: any[]; 
    //   course: any; 
    //   enrollments: any[];
    //   setCourse: (course: any) => void;
    //   addNewCourse: () => void; 
    //   deleteCourse: (course: any) => void;
    //   updateCourse: () => void;
    //   addEnrollment: (course: any, student: any) => void;
    //   deleteEnrollment: (course: any, student: any) => void;
    // }
    { enrollments, addEnrollment, deleteEnrollment }: 
    {
      enrollments: any[];
      addEnrollment: (course: any, student: any) => void;
      deleteEnrollment: (course: any, student: any) => void;
    }
  ) 
  {
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [ enrolling, setEnrolling ] = useState(false);
    const [course, setCourse] = useState<any>({
      _id: "1234", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    
    const enrolled = (courseId: string) => (
      enrollments.some(
        (enrollment) =>
          (
            enrollment.user === currentUser._id &&
            enrollment.course === courseId
          )
        )
    );

    const mycourses = courses.filter((course: { _id: string; }) => enrolled(course._id) || enrolling)
    const faculty = currentUser.role === 'FACULTY';

    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {faculty?
          <div>
            <h5>New Course
              <button 
                className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addCourse} > 
                  Add 
              </button>
              <button 
                className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
                  Update
              </button>
            </h5><br />
            <FormControl value={course.name} className="mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
            <FormControl value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
          </div>: <Button variant="success" onClick={() => setEnrolling(!enrolling) }>Enrollments</Button>
        }

        <h2 id="wd-dashboard-published">Published Courses ({mycourses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4">

            {mycourses.map((course: { _id: string; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link to={`/Kambaz/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark">
                    <Card.Img variant="top" src="./images/reactjs.jpg" width="100%" height={160}/>
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</Card.Title>
                      <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </Card.Text>

                      <button className="btn btn-primary"> Go </button>

                      {enrolled(course._id) ? 
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteEnrollment(course._id, currentUser._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Unenroll
                        </button> : 
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            addEnrollment(course._id, currentUser._id);
                          }} className="btn btn-success float-end"
                          id="wd-delete-course-click">
                          Enroll
                        </button>}
                      
                      {faculty?
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>:null}

                      {faculty?
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>:null}

                    </Card.Body>
                  </Link>
                </Card>        
              </Col>
            ))}
          </Row>
        </div>
      </div>
  );
}

