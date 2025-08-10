/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import * as db from "../../Database";
import PeopleDetails from "./Details";
import { Link } from "react-router";

export default function PeopleTable(
  { users = [] }: { users?: any[] }
) 
{
  console.log(users);
  
  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <Table striped>
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        <tbody>
          {users
            .map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <Link to={`/Kambaz/Account/Users/${user.user._id}`} className="text-decoration-none">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.user.firstName} </span>
                    <span className="wd-last-name">{user.user.lastName}</span>
                  </Link>
                </td>
                <td className="wd-login-id">{user.user.loginId}</td>
                <td className="wd-section">{user.user.section}</td>
                <td className="wd-role">{user.user.role}</td>
                <td className="wd-last-activity">{user.user.lastActivity}</td>
                <td className="wd-total-activity">{user.user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}