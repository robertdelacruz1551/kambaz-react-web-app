import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <ListGroup id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <ListGroup.Item as={Link} to="/Kambaz/Account/Signin" className="active border border-0">
        Signin </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Account/Signup" className=" border border-0">
        Signup </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Account/Profile" className=" border border-0">
        Profile </ListGroup.Item>
    </ListGroup>
  );
}
