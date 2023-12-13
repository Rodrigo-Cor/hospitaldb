import Swal from "sweetalert2";
import { useState } from "react";
import { login } from "../services/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleUser } from "../reducers/userReducer";
import { handleInformation } from "../reducers/patientReducer";

export const useLogin = () => {
  const [processRequest, setProcessRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const { message, success } = await login({
      correo,
      password,
    });
    console.log(message);

    if (success) {
      dispatch(handleUser(message));
      dispatch(handleInformation({ correo, tipo_usuario: message.typeUser }));
      navigate("/dashboard");
    } else {
      genericAlert(message, "error");
    }

    setProcessRequest(false);
  };

  return { loginUser, processRequest };
};
