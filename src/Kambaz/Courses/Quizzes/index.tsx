/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import * as client from "./client";
import { useEffect, useState } from "react";
import { GoRocket } from "react-icons/go";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const faculty: boolean = currentUser && currentUser.role === "FACULTY";
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const date = new Date();

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzes(cid);
    setQuizzes(quizzes);
  };

  const deleteQuiz = async (quizId: any) => {
    await client.deleteQuiz(quizId);
    setQuizzes([...quizzes.filter((quiz: any) => quiz._id !== quizId)]);
  };
  
  const publishQuiz = async (quizId: any) => {
    const updates = [
      ...quizzes.map(
        (quiz) => quiz._id === quizId ? { ...quiz, published: !quiz.published } : { ...quiz }
      )
    ];
    
    const quiz = updates.find(update => update._id === quizId);
    await client.updateQuiz(quizId, quiz)
    setQuizzes([...updates]);
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      {faculty? <QuizControls /> : <br />}
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            QUIZZES 
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {quizzes.filter((quiz: any) => quiz.published || faculty)
                    .map((quiz: any) => (
              <ListGroup.Item className="wd-quiz-item">
                <div className="wd-quiz-content">
                  <BsGripVertical className="wd-icon wd-grip-vertical" /> 
                  <Link to={`../Quiz/${quiz._id}/View`} id="wd-course-quiz-link"
                    className="list-group-item text-danger border border-0"> 
                    <GoRocket className="wd-icon wd-edit" /> 
                  </Link>
                  <div className="wd-quiz-details">
                    <span className="wd-quiz-title"> {quiz.details.title} </span>
                    <div className="wd-quiz-meta">
                      {(new Date(quiz.details.available.from) <= date && date <= new Date(quiz.details.available.to)) && 
                        <span className="wd-unavailable-text"> <strong> Available unit </strong>{quiz.details.available?.to?.toString()} </span> }
                      
                      {(date <= new Date(quiz.details.available.from)) && 
                        <span className="wd-unavailable-text"> Not available until {quiz.details.available?.from?.toString()} </span>}
                        
                      {(new Date(quiz.details.available.to) < date) && 
                        <span className="wd-unavailable-text"> Closed </span>} |
                      
                      <span className="wd-unavailable-text"> <strong>Due</strong> {quiz.details.due?.toString()} </span> | 
                      <span className="wd-points-text"> {quiz.details.points} pts </span> |
                      <span className="wd-points-text"> {quiz.questions.length} Questions </span> |
                      <span className="wd-points-text"> {quiz.score || 0} Score </span>
                    </div>
                  </div>
                </div>
                {faculty && 
                  <QuizControlButtons 
                    cid={quiz.details.course} 
                    qid={quiz._id}
                    published={quiz.published}
                    deleteQuiz={deleteQuiz} 
                    publishQuiz={publishQuiz}
                  />}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
