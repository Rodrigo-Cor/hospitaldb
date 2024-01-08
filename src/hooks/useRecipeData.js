import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeData } from "../services/recipes";
import { updateStatusAppointment } from "../services/appointments";
import { handleNewAppointments } from "../reducers/recepcionistReducer";
import Swal from "sweetalert2";

const useRecipeData = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.recepcionist);
  const navigate = useNavigate();
  const getDataRecipe = async (id) => {
    const { success, message } = await fetchRecipeData({ id });
    if (success) {
      navigate("/dashboard/recipe", { state: { recipeData: message } });
    } else {
      Swal.fire(message, "", "error");
    }
  };

  const updateStatus = async ({ id, status, descripcion }) => {
    const { success, message } = await updateStatusAppointment({
      id,
      status,
    });
    if (success) {
      Swal.fire(message, "", "success");
      const newAppointments = appointments.map((appointment) => {
        if (appointment.id === id) {
          return { ...appointment, status: status, descripcion: descripcion };
        }
        return appointment;
      });
      dispatch(handleNewAppointments(newAppointments));
    } else {
      Swal.fire(message, "", "error");
    }
  };

  return { getDataRecipe, updateStatus };
};

export default useRecipeData;
