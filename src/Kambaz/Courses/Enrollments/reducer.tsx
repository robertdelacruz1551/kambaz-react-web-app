/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {

    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },

    createEnrollments: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
          user: enrollment.title, 
          course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },

    deleteEnrollment: (state, { payload: _id }) => {
      state.enrollments = state.enrollments.filter(
        (m: any) => m._id !== _id);
    }
  },
});
export const { setEnrollments, createEnrollments, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;