/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router"
import Content from "./Content";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Quiz() {
  const { qid } = useParams();

  const [ quiz, _ ] = useState({
    _id: "a1c831c4-7ad3-42c9-9e9d-0ca8ba31fd8b",
    details: {
      title: "Some Quiz 2",
      course: "RS101",
      description: "This is just a description",
      typ: "GRADED",
      points: 100,
      group: "QUIZZES",
      shuffle: true,
      timeLimit: 20,
      multiattempts: false,
      show: "IMMEDIATELY",
      code: "",
      oneQuestion: true,
      webcam: false,
      lock: false,
      due: "2025-01-10",
      available: {
        from: "2025-01-10",
        to: "2025-01-10"
      }
    },
    questions: [
      {
        _id: "829e96b1-1d29-48a6-bc95-ac7dfe214b70",
        type: "True-False",
        points: 0,
        text: "4*4 = 16?",
        options: [ "True", "False" ],
        correct: [ "True" ],
        title: "easy"
      },
      {
        _id: "04f2fe3f-dc86-4e7f-948c-40a27ea7410b",
        type: "Multiple Choice",
        points: 0,
        text: "What is the capital of the Rhode Island?",
        options: [ "Providence", "Warwick" ],
        correct: [ "Providence" ],
        title: "easy"
      },
      {
        _id: "91b9b859-5f6c-4588-bcf8-f18bceed766b",
        type: "Fill In The Blank",
        points: "10",
        text: "Jack and ____ went up ___ hill",
        options: [ null, null ],
        correct: [ "Jill", "the" ],
        title: "easy"
      }
    ],
    __v: 0,
    published: false
  })

  const [ answers, setAnswers ] = useState({
    _id: uuidv4(),
    quizId: quiz._id,
    questions: [
      ...quiz.questions.map((question) => {
        const answer = {
          _id: question._id,
          type: question.type,
          correct: question.correct,
          provided: [null]
        };
        if (question.type === 'Fill In The Blank') {
          answer.provided = [...question.correct.map(() => null)];
        } else if (question.type === 'Multiple Choice') {
          answer.provided = [...question.options.map(() => null)];
        }
        return answer;
      })
    ]
  });

  const handleTrueFalseAnswer = (at: any, answer: any) => {
    const ans = {
      ...answers,
      questions: [
        ...answers.questions.map(
          (question, index) => {
            return at !== index ? question : { ...question, provided: [ answer ]};
          })
      ]
    };
    console.log(ans);
    setAnswers({...ans});
  };

  const handleNonTrueFalseAnswers = (at: any, ind: any, answer: any) => {
    return {
      ...answers,
      questions: [
        ...answers.questions.map(
          (question, index) => {
            return at !== index ? question : {
              ...question,
              provided: question.provided.map(
                (prov, index2) => {
                  return ind !== index2 ? prov : answer;
                })
            }
          })
      ]
    };
  };

  const handleMultiChoiceAnswer = (at: any, ind: any, answer: any) => {
    const ans = handleNonTrueFalseAnswers(at, ind, answer);
    console.log(ans);
    setAnswers({...ans});
  };

  const handleFillInBlankAnswer = (at: any, ind: any, answer: any) => {
    const ans = handleNonTrueFalseAnswers(at, ind, answer);
    console.log(ans);
    setAnswers({...ans});
  };

  const handleSubmitQuiz = () => {

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