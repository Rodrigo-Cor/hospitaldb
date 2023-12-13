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
  },
});

export const { handleUser} = userSlice.actions;
export default userSlice.reducer;
