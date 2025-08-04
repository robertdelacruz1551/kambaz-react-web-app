/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignments = async (courseId: any) => {
  const response = await axios.get(`${API}/${courseId}`);
  return response.data;
};

export const createAssignment = async (assignment: any) => {
  const response = await axios.post(`${API}`, assignment);
  return response.data;
};

export const deleteAssignment = async (courseId: any, assignmentId: any) => {
  const { data } = await axios.delete(`${API}/${courseId}/course/${assignmentId}/assignment`);
  return data;
};

export const updateAssignment = async (courseId: any, assignmentId: any, assignment: any) => {
  const { data } = await axios.put(`${API}/${courseId}/course/${assignmentId}/assignment`, assignment);
  return data;
};