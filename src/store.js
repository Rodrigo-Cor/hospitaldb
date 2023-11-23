import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
    }),
});

export default store;
