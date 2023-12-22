import { createSlice } from "@reduxjs/toolkit";

const filterAppointmentSlice = createSlice({
  name: "filterAppointment",
  initialState: {
    filterAppointment: "today",
  },
  reducers: {
    handleFilter: (state, action) => {
      state.filterAppointment = action.payload;
    },
  },
});

export const { handleFilter } = filterAppointmentSlice.actions;
export default filterAppointmentSlice.reducer;
