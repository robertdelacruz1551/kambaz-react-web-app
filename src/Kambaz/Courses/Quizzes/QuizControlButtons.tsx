/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function QuizControlButtons(
  { cid, qid, published, deleteQuiz, publishQuiz }: 
  { 
    cid: any; 
    qid: any; 
    published: boolean;
    deleteQuiz: (qid: any) => void; 
    publishQuiz: (qid: any) => void; 
  } 
) {  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  return (
    <div className="float-end">

      <span className="me-1 position-relative">
        {!published && <FaCheckCircle style={{ top: "2px" }} className="text-warning me-1 position-absolute fs-5" />}
        {!published && <FaCircle className="text-white me-1 fs-6" />}
        { published && <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />}
        { published && <FaCircle className="text-white me-1 fs-6" />}
      </span>
    
    {currentUser.role === 'FACULTY' &&
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          <IoEllipsisVertical className="fs-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quiz/${qid}/Edit/Details`)}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => deleteQuiz(qid)}>Delete</Dropdown.Item>
          {!published && <Dropdown.Item onClick={() => publishQuiz(qid)}>Publish</Dropdown.Item>}
          { published && <Dropdown.Item onClick={() => publishQuiz(qid)}>Unublish</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>}

    </div>
  );
}