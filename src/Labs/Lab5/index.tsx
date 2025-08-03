import { Container } from "react-bootstrap";
import EnvironmentVariables from "./EnvironmentVariables";
import QueryParameters from "./QueryParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Lab5() {
  return (
    <Container>
      <div id="wd-lab5">
        <h2>Lab 5</h2>
        <div className="list-group">
          <a href={`${REMOTE_SERVER}/lab5/welcome`} 
             className="list-group-item">
              Welcome
          </a>
        </div>
        <hr/>
        <EnvironmentVariables />
        <QueryParameters />
        <WorkingWithObjects />
        <WorkingWithArrays />
        <HttpClient />
        <WorkingWithObjectsAsynchronously />
        <WorkingWithArraysAsynchronously />
      </div>
    </Container>
  );
}
