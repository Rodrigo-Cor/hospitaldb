import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInformationUser } from "../services/login";
import { fetchDoctorAppointments } from "../services/appointments";

export const handleInformationDoctor = createAsyncThunk(
  "doctor/handleInformation",
  async ({ correo, tipo_usuario }) => {
    const { message, success } = await getInformationUser({
      correo,
      tipo_usuario,
    });
    return { message, success };
  }
);

export const handleAppointmentInformation = createAsyncThunk(
  "doctor/handleAppointmentInformation",
  async ({ no_empleado }) => {
    const { message, success } = await fetchDoctorAppointments({
      no_empleado,
    });
    return { message, success };
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    no_empleado: "",
    especialidad: "",
    consultorio: -1,
    telefono: "",
    nombreCompleto: "",
    loading: false,
    appointments: [],
  },
  reducers: {
    handleNewAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleInformationDoctor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleAppointmentInformation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleInformationDoctor.fulfilled, (state, action) => {
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
    builder.addCase(handleInformationDoctor.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleAppointmentInformation.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { handleNewAppointments } = doctorSlice.actions;
export default doctorSlice.reducer;
