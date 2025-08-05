/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/api/enrollments`;

export const findEnrollments = async (userId: any) => {
  const response = await axios.get(`${API}/${userId}`);
  return response.data;
};

export const createEnrollments = async (userId: any, courseId: any) => {
  const response = await axios.post(`${API}`, { userId, courseId });
  return response.data;
};

export const deleteEnrollments = async (userId: any, courseId: any) => {
  const { data } = await axios.delete(`${API}/${userId}/${courseId}`);
  return data;
};