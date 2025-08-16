import { Nav } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function TOC() {
  const { cid } = useParams();
  const { qid } = useParams(); 
  
  const { pathname } = useLocation();
  return (
    <div id="wd-css-navigating-with-tabs">
      <Nav fill variant="tabs" defaultActiveKey="Detail">
        <Nav.Item>
          <Nav.Link to={`/Kambaz/Courses/${cid}/Quiz/${qid}/Edit/Detail`} as={Link} 
                    active={pathname.includes("Detail")}> Details </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to={`/Kambaz/Courses/${cid}/Quiz/${qid}/Edit/Questions`} as={Link} 
                    active={pathname.includes("Questions")}> Questions </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
