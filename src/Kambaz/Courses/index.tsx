/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Route, Routes, useParams } from "react-router";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import * as client from './client';

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [users, setUsers] = useState([]);

  // TODO: Add the lookup for the people table
  const fetchUsers = async () => {
    const users = await client.findPeopleEnrrolledInThisCourse(cid);
    console.log(users);
    setUsers( users );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course && course.name} &gt; {pathname.split("/")[4]}
      </h2> 
      <hr />
      <div className="d-flex">
        <div className="d-block"> {/** d-md-block */}
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <div>
            <div>
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={
                  <PeopleTable users={ users }/>}
                />
              </Routes>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}
