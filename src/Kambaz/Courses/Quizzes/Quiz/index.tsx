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
    score: 0,
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

  const handleAnswerReceived = (questionId: any, option: any) => {
    const update = {
      ...quiz,
      questions: [
        ...quiz.questions.map(
          (question: any) => {
            return question._id !== questionId ? question : {
              ...question,
              options: [
                ...question.options.map(
                (original: any) => {
                  if (question.type === 'True-False') {
                    return original._id !== option._id ? {...original, answer: null} : option;
                  } else {
                    return original._id !== option._id ? original : option;
                  }
                })
              ]
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
    let finalScore = 0;
    const results = {
      ...quiz,
      ...{
        final: final,
        preview: preview,
        updated: Date().toString(),
        questions: [
        ...quiz.questions.map(
          (question: any) => {
            const score = question.options.every((option: any) => ((option.correct && option.text === option.answer) || (!option.correct && option.answer === null))) ? question.points : 0
            finalScore += score;
            return {
              ...question,
              score: score
            }
          })
        ]
      }
    }
    const scored = { ...results, score: finalScore };
    client.putQuizAttempt(scored);
    setQuiz({...scored});
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