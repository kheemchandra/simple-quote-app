import { configureStore } from "@reduxjs/toolkit";

import quotesSlice from "./quotesSlice";
import commentsSlice from "./commentsSlice";
 
const store = configureStore({
  reducer: { 
    quotes: quotesSlice.reducer,
    comments: commentsSlice.reducer
  }
});

export default store;