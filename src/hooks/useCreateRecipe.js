import { useState, useEffect } from "react";

import {
  fetchMedicines,
  fetchTreatments,
  fetchServices,
  createRecipe,
} from "../services/recipes";

const useCreateRecipe = () => {
  const [medicines, setMedicines] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const medicinesData = await fetchMedicines();
      const treatmentsData = await fetchTreatments();
      const servicesData = await fetchServices();

      if (medicinesData.success) {
        setMedicines(medicinesData.message);
      }

      if (treatmentsData.success) {
        setTreatments(treatmentsData.message);
      }

      if (servicesData.success) {
        setServices(servicesData.message);
      }
    };

    fetchData();
  }, []);

  return {
    medicines,
    treatments,
    services,
    createRecipe,
  };
};

export default useCreateRecipe;