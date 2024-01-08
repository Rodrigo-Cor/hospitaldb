import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteConsultory, deleteDoctor } from "../services/deletes";
import Swal from "sweetalert2";

export const useDelete = () => {
  const [processRequest, setProcessRequest] = useState(false);
  const [appointmentsDoctor, setAppointmentsDoctor] = useState({
    citas: [],
    nameDoctor: "",
  });

  const navigate = useNavigate();

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

  const handleDeleteConsultory = async ({ consultorio }) => {
    setProcessRequest(true);
    try {
      const { success, message } = await deleteConsultory({ consultorio });

      if (success) {
        deleteAlert(
          "¡Consultorio " + consultorio + " eliminado exitosamente!",
          "success"
        );
        navigate("/dashboard");
      } else {
        deleteAlert(message, "error");
      }
    } catch (error) {
      console.error(error);
      deleteAlert("Error inesperado", "error");
    } finally {
      setProcessRequest(false);
    }
  };

  const handleDeleteDoctor = async ({ no_empleado }) => {
    setProcessRequest(true);
    try {
      const { success, message } = await deleteDoctor({ no_empleado });

      if (success) {
        deleteAlert(message, "success");
        navigate("/dashboard");
      } else {
        deleteAlert(message.message, "error");
        setAppointmentsDoctor({
          citas: message.citas,
          nameDoctor: message.nameDoctor,
        });
      }
    } catch (error) {
      console.error(error);
      deleteAlert("Error inesperado", "error");
    } finally {
      setProcessRequest(false);
    }
  };

  return {
    processRequest,
    handleDeleteConsultory,
    handleDeleteDoctor,
    appointmentsDoctor,
  };
};

export default useDelete;
