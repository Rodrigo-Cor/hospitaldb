import Swal from "sweetalert2";
import { useState } from "react";
import { login } from "../services/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogged } from "../reducers/userReducer";

export const useLogin = () => {
  const [processRequest, setProcessRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async ({ correo, password }) => {
    const genericAlert = (message, icon) => {
      Swal.fire({
        title: message,
        icon: icon,
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    };

    setProcessRequest(true);
    const data = await login({ correo, password });
    genericAlert(data.message, data.success ? "success" : "error");

    if (data.success) {
      setTimeout(() => {
        dispatch(handleLogged(true));
        navigate("/dashboard");
      }, 2000);
    }

    setProcessRequest(false);
  };

  return { loginUser, processRequest };
};
