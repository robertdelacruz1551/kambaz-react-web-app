/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  // const { pathname } = useLocation();
  
  return (
    <ListGroup id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser? <ListGroup.Item as={Link} to="/Kambaz/Account/Signin" className="active border border-0">Signin</ListGroup.Item>: <></>}
      {!currentUser? <ListGroup.Item as={Link} to="/Kambaz/Account/Signup" className=" border border-0">Signup</ListGroup.Item>:<></>}
      { currentUser? <ListGroup.Item as={Link} to="/Kambaz/Account/Profile" className=" border border-0">Profile</ListGroup.Item>:<></>}
    </ListGroup>
  );
}
