import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import patientReducer from "./reducers/patientReducer";
import doctorReducer from "./reducers/doctorReducer";
import recepcionistReducer from "./reducers/recepcionistReducer";
import filterAppointmentReducer from "./reducers/filterAppointmentReducer";

const rootReducer = combineReducers({
  user: userReducer,
  patient: patientReducer,
  filterAppointment: filterAppointmentReducer,
  doctor: doctorReducer,
  recepcionist: recepcionistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
    }),
});

export default store;
