import axios from "axios";

export const login = async ({ correo, password }) => {
  try {
    const response = await axios.post("http://localhost:4000/users/login", {
      correo,
      password,
    });
    if (response.data) {
      return { success: true, message: response.data };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: "Ocurrió un error en el login" };
    }
  }
};

export const getInformationUser = async ({ correo, tipo_usuario }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/users/information",
      {
        correo,
        tipo_usuario,
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
