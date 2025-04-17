import { configureStore } from "@reduxjs/toolkit";
import notebookReducer from "../entities/notebook/model/notebookSlice";
import noteReducer from "../entities/note/model/noteSlice";
import userReducer from "../entities/user/model/userSlice";

export const store = configureStore({
  reducer: {
    notebooks: notebookReducer,
    notes: noteReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
