import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CourseNavigation() {
  return (
    <ListGroup className="rounded-0 wd">
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Home" className="active border border-0">
        Home </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Modules" className=" border border-0">
        Modules </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Piazza" className=" border border-0">
        Piazza </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Zoom" className=" border border-0">
        Zoom </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Assignments" className=" border border-0">
        Assignments </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Quizzes" className=" border border-0">
        Quizzes </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/People" className=" border border-0">
        People </ListGroup.Item>
    </ListGroup>
  );
}