/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard(
    { courses, course, setCourse, addNewCourse, updateCourse, deleteCourse, enrolling, setEnrolling, updateEnrollment }: 
    {
      courses: any[];
      course: any;
      setCourse: (course: any) => void;
      addNewCourse: () => void;
      updateCourse: () => void;
      deleteCourse: (courseId: string) => void;
      
      enrolling: any;
      setEnrolling: (enrolling: boolean) => void;
      updateEnrollment: (courseId: string, enrolled: boolean) => void;
    }
  )
  {
    const { currentUser } = useSelector((state: any) => state.accountReducer);    
    const faculty = currentUser.role === 'FACULTY';
    
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">
          Dashboard
          <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        </h1> <hr />

        {faculty && (
          <div>
            <h5>New Course
              <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse} >Add</button>
              <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click">Update</button>
            </h5><br />

            <FormControl value={course.name} className="mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value }) } 
            />
            <FormControl value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value }) } 
            />
          </div>
        )}

        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4">

            {courses.map((course: any) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link to={`/Kambaz/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark">
                    <Card.Img variant="top" src="./images/reactjs.jpg" width="100%" height={160}/>
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </Card.Text>

                      <button className="btn btn-primary"> Go </button>

                      {faculty && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button> 
                      )}
                      {faculty && (
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      )} 

                      {enrolling && (
                        <button  onClick={(event) => {
                                  event.preventDefault();
                                  updateEnrollment(course._id, !course.enrolled);
                                }} 
                                className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`}>
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>)}

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

