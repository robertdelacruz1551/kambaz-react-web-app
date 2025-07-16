import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard, AiOutlineExperiment } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoInbox } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
export default function KambazNavigation() {
  return (
    <div id="wd-kambaz-navigation">
      <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }} 
          className="rounded-0 position-fixed
          bottom-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
        
        <ListGroup.Item id="wd-neu-link" target="_blank" action href="https://www.northeastern.edu/" className="bg-black border-0 text-center">
          <img src="./public/images/NEU.jpg" width="75px" /></ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Account" as={Link} className="text-center border-0 bg-black text-white">
          <FaRegCircleUser className="fs-1 text text-white" /><br />
          Account </ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Dashboard" as={Link} className="text-center border-0 bg-white text-danger">
          <AiOutlineDashboard className="fs-1 text-danger" /><br />
          Dashboard </ListGroup.Item><br />
        
          {/* complete styling the rest of the links */}
        <ListGroup.Item to="/Kambaz/Courses" as={Link} className="text-white bg-black text-center border-0">
          <LiaBookSolid className="fs-1 text-danger" /><br />
          Courses </ListGroup.Item><br />

        <ListGroup.Item to="/Kambaz/Calendar" as={Link} className="text-white bg-black text-center border-0">
          <CiCalendarDate className="fs-1 text-danger" /><br />
          Calendar </ListGroup.Item><br />

        <ListGroup.Item to="/Kambaz/Inbox" as={Link} className="text-white bg-black text-center border-0">
          <GoInbox className="fs-1 text-danger" /><br />
          Inbox </ListGroup.Item><br />

        <ListGroup.Item to="/Labs" as={Link} className="text-white bg-black text-center border-0">
          <AiOutlineExperiment className="fs-1 text-danger" /><br />
          Labs </ListGroup.Item><br />
      </ListGroup>
    </div>
  );
}
