import { useNavigate } from "react-router-dom";
import { fetchRecipeData } from "../services/recipes";
import Swal from "sweetalert2";

const useRecipeData = () => {
  const navigate = useNavigate();
  const getDataRecipe = async (id) => {
    const { success, message } = await fetchRecipeData({ id });
    if (success) {
      navigate("/dashboard/recipe", { state: { recipeData: message } });
    } else {
      Swal.fire(message, "", "error");
    }
  };

  return { getDataRecipe };
};

export default useRecipeData;
