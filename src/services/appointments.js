import axios from "axios";

export const cancelConfirmedAppointment = async ({ id, id_horario }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/pacientes/cancelAppointment",
      {
        id,
        id_horario,
      }
    );
    if (response.data) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en el servidor por cancelar la cita",
      };
    }
  }
};

export const updateStatusAppointment = async ({ id, status }) => {
  try {
    const response = await axios.put(
      "http://localhost:4000/recepcionistas/modifyStatus",
      {
        id,
        status,
      }
    );
    if (response.data) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en el servidor para obtener las citas",
      };
    }
  }
};

export const fetchAppointmentsToday = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/recepcionistas/fetchAppointmentsToday"
    );
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en el servidor para obtener las citas",
      };
    }
  }
};

export const fetchDoctorAppointments = async ({ no_empleado }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/medicos/appointment",
      { no_empleado }
    );
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};

export const fetchPatientAppointments = async ({ nss }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/pacientes/appointment",
      { nss }
    );
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};

export const fetchDoctorsAvailableCost = async () => {
  try {
    const response = await axios.get("http://localhost:4000/citas/doctors");
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};

export const fetchScheduleModify = async ({ no_empleado, id_horario }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/citas/availabilityModify",
      {
        no_empleado,
        id_horario,
      }
    );
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};

export const fetchScheduleDoctors = async ({ no_empleado }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/citas/availabilityDay",
      {
        no_empleado,
      }
    );
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};

export const registerAppointment = async ({
  nss,
  id_horario,
  fecha_hora_inicio,
}) => {
  try {
    const response = await axios.post("http://localhost:4000/citas/registry", {
      nss,
      id_horario,
      fecha_hora_inicio,
    });
    if (response.data) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};

export const modifyAppointmentSchedule = async ({
  newHorarioId,
  id_horario,
}) => {
  try {
    const response = await axios.post("http://localhost:4000/citas/modify", {
      newHorarioId,
      id_horario,
    });
    if (response.data) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};
