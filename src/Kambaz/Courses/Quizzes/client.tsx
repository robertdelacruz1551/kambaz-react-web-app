/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/api/quiz`;

export const findQuizzes = async (courseId: any) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/quizzes/${courseId}`);
  return response.data;
};

export const findQuiz = async (quiId: any) => {
  const { data } = await axios.get(`${API}/${quiId}`);
  return data;
}

export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${API}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: any) => {
  await axios.delete(`${API}/${quizId}`);
};

export const updateQuiz = async (quizId: any, quiz: any) => {
  const { data } = await axios.put(`${API}/${quizId}`, quiz);
  return data;
};

export const createOrUpdate = async (quiz: any) => {
  const { data } = await axios.post(`${API}/${quiz._id}`, quiz);
  return data;
}

// --------------------------------
// Quiz attempts submissions
// --------------------------------

export const getQuizAttempt = async (quizId: any, attemptId: any) => {
  const { data } = await axios.get(`${API}/${quizId}/attempt/${attemptId}`);
  return data;
}

export const putQuizAttempt = async (quiz: any) => {
  console.log(quiz);
  const { data } = await axios.put(`${API}/${quiz.quizId}/attempt/${quiz._id}`, quiz);
  return data;
}

export const getAllMyQuizAttemps = async (quizId: any, userId: any) => {
  const { data } = await axios.get(`${API}/${quizId}/user/${userId}/attempts`);
  return data;
}

export const createQuizAttempt = async (attempt: any) => {
  console.log(`${API}/${attempt.quizId}/attempt`);
  const response = await axios.post(`${API}/${attempt.quizId}/attempt`, attempt);
  return response;
}