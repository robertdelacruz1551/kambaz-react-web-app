import { Form, FormSelect } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form.Control id="wd-username"
             placeholder="username"
             className="mb-2"/>

      <Form.Control id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
             
      <Form.Control id="wd-firstname"
             placeholder="Alice"
             className="mb-2"/>

      <Form.Control id="wd-lastname"
             placeholder="Wonderland"
             className="mb-2"/>

      <Form.Control type="date" id="wd-dob" value="2000-01-21"/>

      <Form.Control id="wd-email"
             placeholder="alice@wonderland"
             type="email" 
             className="mb-2"/>

      <FormSelect>
        <option selected>FACULTY</option>
        <option value="USER">User</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
      </FormSelect>

      <Link id="wd-signin-btn"
            to="/Kambaz/Account/Signin"
            className="btn warning btn-primary w-100 mb-2">
            Signout </Link>
    </div>
  );
}
