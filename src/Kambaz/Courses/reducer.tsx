/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,

  reducers: {

    addCourses: (state, { payload: course }) => {
      const newCourse: any = {
        _id: uuidv4(),
        name: course.name,
        number: course.number,
        startDate: course.startDate,
        endDate: course.endDate,
        department: course.department,
        credits: course.credits,
        description: course.description,
        author: course.author
      };
      state.courses = [...state.courses, newCourse] as any;
    },

    deleteCourses: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (m: any) => m._id !== courseId);
    },

    updateCourses: (state, { payload: course }) => {
      state.courses = state.courses.map((m: any) =>
        m._id === course._id ? course : m
      ) as any;
    },

    editCourses: (state, { payload: courseId }) => {
      state.courses = state.courses.map((m: any) =>
        m._id === courseId ? { ...m, editing: true } : m
      ) as any;
    },

  },
});
export const { addCourses, deleteCourses, updateCourses, editCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;