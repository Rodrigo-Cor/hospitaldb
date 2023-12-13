import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInformationUser } from "../services/login";

export const handleInformation = createAsyncThunk(
  "patient/handleInformation",
  async ({ correo, tipo_usuario }) => {
    const { message, success } = await getInformationUser({
      correo,
      tipo_usuario,
    });
    return { message, success };
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    nss: "",
    telefono: "",
    metodo_pago: "",
    nombreCompleto: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleInformation.fulfilled, (state, action) => {
      const { success, message } = action.payload;
      if (success) {
        return message;
      } else {
        return state;
      }
    });
  },
});

export default patientSlice.reducer;
