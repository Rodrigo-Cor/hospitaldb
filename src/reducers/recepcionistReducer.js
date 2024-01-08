import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInformationUser } from "../services/login";
import { fetchAppointmentsToday } from "../services/appointments";

export const handleInformationRecepcionist = createAsyncThunk(
  "recepcionist/handleInformation",
  async ({ correo, tipo_usuario }) => {
    const { message, success } = await getInformationUser({
      correo,
      tipo_usuario,
    });
    return { message, success };
  }
);

export const handleAppointmentInformation = createAsyncThunk(
  "recepcionist/handleAppointmentInformation",
  async () => {
    console.log("fetching data");
    const { message, success } = await fetchAppointmentsToday();
    return { message, success };
  }
);

const recepcionistSlice = createSlice({
  name: "recepcionist",
  initialState: {
    no_empleado: "",
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
    builder.addCase(handleInformationRecepcionist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleAppointmentInformation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      handleInformationRecepcionist.fulfilled,
      (state, action) => {
        const { success, message } = action.payload;
        if (success) {
          return {
            ...message,
            loading: false,
          };
        } else {
          return state;
        }
      }
    );
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
    builder.addCase(handleInformationRecepcionist.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleAppointmentInformation.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { handleNewAppointments } = recepcionistSlice.actions;
export default recepcionistSlice.reducer;
