import Swal from "sweetalert2";
import { useState } from "react";
import { login } from "../services/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleUser } from "../reducers/userReducer";
import { handleInformation } from "../reducers/patientReducer";
import { handleInformationDoctor } from "../reducers/doctorReducer";
import { handleFilter } from "../reducers/filterAppointmentReducer";

export const useLogin = () => {
  const [processRequest, setProcessRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (filterType) => {
    dispatch(handleFilter(filterType));
  };

  const loginUser = async ({ correo, password }) => {
    const genericAlert = (message, icon) => {
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

    setProcessRequest(true);
    try {
      const { message, success } = await login({
        correo,
        password,
      });

      if (success) {
        dispatch(handleUser(message));

        if (message.typeUser === "Paciente") {
          dispatch(
            handleInformation({ correo, tipo_usuario: message.typeUser })
          );
        } else if (message.typeUser === "Medico") {
          dispatch(
            handleInformationDoctor({ correo, tipo_usuario: message.typeUser })
          );
        }
        navigate("/dashboard");
        return;
      } else {
        genericAlert(message, "error");
      }
    } catch (error) {
      console.error(error);
      genericAlert("Error inesperado", "error");
    } finally {
      setProcessRequest(false);
    }
  };

  return { loginUser, processRequest, handleClick };
};
