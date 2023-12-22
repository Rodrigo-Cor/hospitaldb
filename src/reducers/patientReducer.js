import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInformationUser } from "../services/login";
import { fetchPatientAppointments } from "../services/appointments";

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

export const handleAppointmentInformation = createAsyncThunk(
  "patient/handleAppointmentInformation",
  async ({ nss }) => {
    const { message, success } = await fetchPatientAppointments({
      nss,
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
    loading: false,
    appointments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleInformation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleAppointmentInformation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleInformation.fulfilled, (state, action) => {
      const { success, message } = action.payload;
      if (success) {
        return {
          ...message,
          loading: false,
        };
      } else {
        return state;
      }
    });
    builder.addCase(handleAppointmentInformation.fulfilled, (state, action) => {
      const { success, message } = action.payload;
      if (success) {
        return {
          ...state,
          appointments: message,
          loading: false,
        };
      } else {
        return state;
      }
    });
    builder.addCase(handleInformation.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleAppointmentInformation.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default patientSlice.reducer;
