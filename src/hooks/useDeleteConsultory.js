import Swal from "sweetalert2";
import { useState } from "react";
import { deleteConsultory } from "../services/deletes";

export const useDeleteConsultory = () => {
  const [processRequest, setProcessRequest] = useState(false);

  const deleteAlert = (message, icon) => {
    Swal.fire({
      title: message,
      icon: icon,
      background: "#272727",
      color: "#effffb",
      showConfirmButton: true,
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  };

  const handleDeleteConsultory = async (consultorio) => {
    setProcessRequest(true);
    try {
      const result = await deleteConsultory({ consultorio });

      if (result.success) {
        deleteAlert('¡Consultorio ' + consultorio + ' eliminado exitosamente!', 'success');
      } else {
        deleteAlert( result.message, 'error');
      }
    } catch (error) {
      console.error(error);
      deleteAlert('Error inesperado', 'error');
    } finally {
      setProcessRequest(false);
    }
  };

  return {
    processRequest,
    handleDeleteConsultory,
  };
};

export default useDeleteConsultory;
