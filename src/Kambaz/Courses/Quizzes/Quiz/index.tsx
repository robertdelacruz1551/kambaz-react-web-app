/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router"
import Content from "./Content";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as client from "../client";

export default function Quiz() {
  const { qid } = useParams();
  const [ quiz, setQuiz ] = useState<any>({
    _id: "",
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
    questions: [],
    __v: 0,
    published: false
  });

  const handleTrueFalseAnswer = (id: any, at: any, answer: any) => {
    const ans = {
      ...quiz,
      questions: [
        ...quiz.questions.map(
          (question: any) => {
            return question._id !== id ? question : {
              ...question,
              answers: question.answers.map(
                (_: any, index: any) => {
                  return index !== at ? null : answer;
                })
            }
          })
      ]
    };
    setQuiz({...ans});
  };

  const handleNonTrueFalseAnswers = (id: any, at: any, answer: any) => {
    return {
      ...quiz,
      questions: [
        ...quiz.questions.map(
          (question: any) => {
            return question._id !== id ? question : {
              ...question,
              answers: question.answers.map(
                (original: any, index: any) => {
                  return index !== at ? original : answer;
                })
            }
          })
      ]
    };
  };

  const handleMultiChoiceAnswer = (id: any, at: any, answer: any) => {
    const ans = handleNonTrueFalseAnswers(id, at, answer);
    setQuiz({...ans});
  };

  const handleFillInBlankAnswer = (id: any, at: any, answer: any) => {
    const ans = handleNonTrueFalseAnswers(id, at, answer);
    setQuiz({...ans});
  };

  const fetchQuiz = async () => {
    const doc = await client.findQuiz(qid);
    setQuiz({
      ...doc,
      ...{
        _id: uuidv4(),
        quizId: qid,
        user: '',
        final: false,
      }
    })
  }

  useEffect( () => {
    fetchQuiz();
  }, []);
  
  const handleSubmitQuiz = () => {
    const check: any[] = [];
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      let right = true;
      for (let j = 0; j < question.answers.length; j++) {
        const correct = question.correct[j];
        const answer  = question.answers[j];
        right = correct === answer && right;
      };
      check.push({_id: question._id, score: right ? +question.points : 0});
    }

    const ans = {
      ...quiz,
      questions: [...quiz.questions.map((question: any) => {
        return {
          ...question,
          score: check.filter((result: any) => result._id === question._id)[0].score
        }
      })]
    }
    console.log(ans);
    // TODO: save results
  };

  return (
    <div>
      <Content 
        quiz={quiz}
        handleTrueFalseAnswer={handleTrueFalseAnswer}
        handleMultiChoiceAnswer={handleMultiChoiceAnswer}
        handleFillInBlankAnswer={handleFillInBlankAnswer}
        handleSubmitQuiz={handleSubmitQuiz}
      />
    </div>
  )
}