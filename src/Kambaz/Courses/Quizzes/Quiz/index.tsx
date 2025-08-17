/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router"
import Content from "./Content";
import { useEffect, useState } from "react";
import * as client from "../client";

export default function Quiz({ preview } : { preview: boolean }) {
  const { qid, attemptId } = useParams();
  const [ quiz, setQuiz ] = useState<any>({
    _id: "",
    quizId: "",
    userId: "",
    published: false,
    final: false,
    created: Date().toString(),
    updated: Date().toString(),
    details: {
      title: "",
      course: "",
      description: "",
      typ: "GRADED",
      points: 0,
      group: "QUIZZES",
      shuffle: false,
      timeLimit: 0,
      multiattempts: false,
      show: "IMMEDIATELY",
      code: "",
      oneQuestion: false,
      webcam: false,
      lock: false,
      due: Date().toString(),
      available: {
        from: Date().toString(),
        to: Date().toString()
      }
    },
    questions: []
  });

  const handleAnswerReceived = (questionId: any, answer: any) => {
    const update = {
      ...quiz,
      questions: [
        ...quiz.questions.map(
          (question: any) => {
            return question._id !== questionId ? question : {
              ...question,
              options: question.options.map(
                (original: any) => {
                  if (question.type === 'True-False') {
                    return original._id !== answer._id ? {...original, answer: null} : answer;
                  } else {
                    return original._id !== answer._id ? original : answer;
                  }
                })
            }
          })
      ]
    };
    setQuiz({...update});
  }

  const fetchQuiz = async () => {
    const quiz = await client.getQuizAttempt(qid, attemptId);
    setQuiz({
      ...quiz, 
      ...{
        preview: preview,
        updated: Date().toString()
      }
    })
  }

  useEffect( () => {
    fetchQuiz();
  }, []);
  
  const handleSubmitQuiz = (final: boolean = false) => {
    const results = {
      ...quiz,
      ...{
        final: final,
        preview: preview,
        updated: Date().toString(),
        questions: [
        ...quiz.questions.map(
          (question: any) => {
            return {
              ...question,
              score: question.options.every((option: any) => (option.correct && option.text === option.answer) || (!option.correct && option.text !== option.answer) ) ? question.points : 0
            }
          })
        ]
      }
    }
    client.putQuizAttempt(results);
    setQuiz({...results});
  };

  return (
    <div>
      <Content 
        quiz={quiz}
        handleAnswerReceived={handleAnswerReceived}
        handleSubmitQuiz={handleSubmitQuiz}
      />
    </div>
  )
}