import axios from "axios";

export const fetchRecipeData = async ({ id }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/recetas/getData",
      {
        id,
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

export const createRecipe = async ({
  id_cita,
  medicamentos,
  tratamientos,
  servicios,
  diagnostico,
}) => {
  try {
    const response = await axios.post("http://localhost:4000/recetas/create", {
      id_cita,
      medicamentos,
      tratamientos,
      servicios,
      diagnostico,
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

export const fetchMedicines = async () => {
  try {
    const response = await axios.get("http://localhost:4000/recetas/allMedicines");
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

export const fetchTreatments = async () => {
  try {
    const response = await axios.get("http://localhost:4000/recetas/allTreatments");
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

export const fetchServices = async () => {
  try {
    const response = await axios.get("http://localhost:4000/recetas/allServices");
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
