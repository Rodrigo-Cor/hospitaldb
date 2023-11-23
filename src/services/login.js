import axios from "axios";

export const login = async ({ typeUser, correo, password }) => {
  try {
    const response = await axios.post("http://localhost:4000/users/login", {
      typeUser,
      correo,
      password,
    });
    console.log(response);
    if (response.data) {
      console.log("Aqui entre");
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: "Ocurrió un error en el login" };
    }
  }
};
