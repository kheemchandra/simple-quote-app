import { createSlice } from "@reduxjs/toolkit";

const initialQuotes = { quotes: [] }; // quotes[0] = {id: '', author: '', text: ''}

const quotesSlice = createSlice({
  name: "quotes",
  initialState: initialQuotes,
  reducers: {
    updateQuotes(state, action) { 
      state.quotes = action.payload; 
    },
  },
});

export const quoteActions = quotesSlice.actions;

export default quotesSlice;

 
