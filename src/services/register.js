import axios from "axios";

export const registerDoctor = async ({
  no_empleado,
  correo,
  especialidad,
  consultorio,
  telefono,
  nombre,
  ap_paterno,
  ap_materno,
  password,
}) => {
  try {
    const response = await axios.post("http://localhost:4000/medicos/register", {
      no_empleado,
      correo,
      especialidad,
      consultorio,
      telefono,
      nombre,
      ap_paterno,
      ap_materno,
      password,
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


export const registerPatient = async ({
  nss,
  correo,
  telefono,
  nombre,
  ap_paterno,
  ap_materno,
  password,
  metodo_pago,
  fecha_nacimiento,
}) => {
  try {
    const response = await axios.post("http://localhost:4000/pacientes/register", {
      nss,
      correo,
      telefono,
      nombre,
      ap_paterno,
      ap_materno,
      password,
      metodo_pago,
      fecha_nacimiento,
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