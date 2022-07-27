import { createSlice } from "@reduxjs/toolkit";

const initialComments = { comments: [] };  

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialComments,
  reducers: {
    updateComments(state, action) { 
      state.comments = action.payload; 
    },
  },
});

export const commentActions = commentsSlice.actions;

export default commentsSlice;

 
