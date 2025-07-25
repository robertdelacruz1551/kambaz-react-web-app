import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const {cid} = useParams();
  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <ListGroup.Item as={Link} to={`/Kambaz/Courses/${cid}/${link}`} 
          className="border border-0">
          {link} 
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}