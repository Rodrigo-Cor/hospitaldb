import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    typeUser: "patient",
    isLogged: false,
  },
  reducers: {
    handleUser: (state, action) => {
      return {
        ...state,
        typeUser: action.payload,
      };
    },
    handleLogged: (state, action) => {
      return {
        ...state,
        isLogged: action.payload,
      };
    },
  },
});

export const { handleUser, handleLogged } = userSlice.actions;
export default userSlice.reducer;
