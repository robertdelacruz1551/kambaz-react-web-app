/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCheckCircle, FaCircle, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
export default function AssignmentControlButtons(
  { _id, deleteAssignment }: 
  { 
    _id: string | undefined; 
    deleteAssignment: (_id: string | undefined) => void; 
  } 
) {  
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="float-end">

      {currentUser.role === 'FACULTY'?
        <span className="me-1 position-relative" onClick = {() => deleteAssignment(_id)} >
          <FaTrashAlt style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
          <FaCircle className="text-white me-1 fs-6" />
        </span> : <></>}

      <span className="me-1 position-relative">
        <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
        <FaCircle className="text-white me-1 fs-6" />
      </span>
    
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}