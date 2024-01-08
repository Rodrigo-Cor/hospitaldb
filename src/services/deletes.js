import axios from "axios";

export const deleteConsultory = async ({ consultorio }) => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/recepcionistas/deleteConsultory",
      {
        data: { consultorio },
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

export const deleteDoctor = async ({ no_empleado }) => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/recepcionistas/deleteDoctor",
      {
        data: { no_empleado },
      }
    );
    if (response.data) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return { success: false, message: error.response.data };
    } else {
      return {
        success: false,
        message: "Ocurrió un error en la obtención de la información",
      };
    }
  }
};
