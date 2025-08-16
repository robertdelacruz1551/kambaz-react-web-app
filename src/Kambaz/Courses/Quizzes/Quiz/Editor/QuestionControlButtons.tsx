/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCircle, FaTrashAlt } from "react-icons/fa";

export default function QuestionControlButtons(
  { _id, deleteQuiz }: 
  { 
    _id: string | undefined; 
    deleteQuiz: (_id: any) => void; 
  } 
) {  

  return (
    <div className="float-end">

      <span className="me-1 position-relative" onClick = {() => deleteQuiz(_id)} >
        <FaTrashAlt style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
        <FaCircle className="text-white me-1 fs-6" />
      </span>

    </div>
  );
}