/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {

    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
          title: quiz.title, 
          course: quiz.course, 
          description: quiz.description, 
          type: quiz.type,
          points: quiz.points,
          group: quiz.group,
          shuffle: quiz.shuffle,
          timeLimit: quiz.timeLimit,
          attempts: quiz.attempts,
          show: quiz.show,
          code: quiz.code,
          oneQuestion: quiz.oneQuestion,
          webcam: quiz.webcam,
          lock: quiz.lock,
          due: quiz.due, 
          available: {
            from: quiz.available.from, 
            to: quiz.available.to,
          },
          questions: quiz.questions,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: _id }) => {
      state.quizzes = state.quizzes.filter(
        (m: any) => m._id !== _id);
    },

    updateQuiz: (state, { payload: assignment }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },

    editQuiz: (state, { payload: _id }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === _id ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;