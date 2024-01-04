import { useEffect, useState } from "react";
import { fetchRecipeData } from "../services/recipes";

const useRecipeData = (id) => {
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { success, message } = await fetchRecipeData({ id });
      if (success) {
        setRecipeData(message);
      }
    };

    fetchData();
  }, []);

  return {recipeData};
};

export default useRecipeData;

