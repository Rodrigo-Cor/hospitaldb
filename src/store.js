import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import patientReducer from "./reducers/patientReducer";

const rootReducer = combineReducers({
  user: userReducer,
  patient: patientReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
    }),
});

export default store;
