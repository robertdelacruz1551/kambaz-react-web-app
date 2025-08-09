/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
   const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <ListGroup id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser? <ListGroup.Item as={Link} to="/Kambaz/Account/Signin" className="active border border-0">Signin</ListGroup.Item>: <></>}
      {!currentUser? <ListGroup.Item as={Link} to="/Kambaz/Account/Signup" className=" border border-0">Signup</ListGroup.Item>:<></>}
      { currentUser? <ListGroup.Item as={Link} to="/Kambaz/Account/Profile" className=" border border-0">Profile</ListGroup.Item>:<></>}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </ListGroup>
  );
}
