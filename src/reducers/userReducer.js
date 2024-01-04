import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    typeUser: "",
    isLogged: false,
  },
  reducers: {
    handleUser: (state, action) => {
      return action.payload
    },
    logoutUser: (state) => {
      state.typeUser = "";
      state.isLogged = false;
    },
  },
});

export const { handleUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
