/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineExperiment } from "react-icons/ai";

export default function AttemptsTable(
  { attempts } :
  { attempts: any[]; }
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(attempts);
  
  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>View</th>
            <th>Title</th>
            <th>Course</th>
            <th>Score</th>
            <th>Points</th>
            <th>Time</th>
            <th>Multi Attempts</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {attempts
            .filter((attempt: any) => {
              if (attempt.final && attempt.userId === currentUser._id) {
                return attempt;
              }
            })
            .map((attempt: any) => (
              <tr key={attempt._id}>
                <td className="wd-full-name text-nowrap">
                  <Link to={`/Kambaz/Courses/${attempt.details.course}/Quiz/${attempt.quizId}/attempt/${attempt._id}/Review`} className="text-decoration-none">
                    <AiOutlineExperiment className="me-2 fs-1 text-secondary" />
                  </Link>
                </td>
                <td className="">{attempt.details.title}</td>
                <td className="">{attempt.details.course}</td>
                <td className="">{attempt.score || 0}</td>
                <td className="">{attempt.details.points}</td>
                <td className="">{attempt.details.timeLimit}</td>
                <td className="">{attempt.details.multiattampts ? 'Yes' : 'No'}</td>
                <td className="">{attempt.details.show}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}