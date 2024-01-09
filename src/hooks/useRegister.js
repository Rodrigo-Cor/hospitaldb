import Swal from "sweetalert2";
import { useState } from "react";
import { registerDoctor, registerPatient } from "../services/register";
import { useNavigate } from "react-router-dom";

const useRegister = (userType) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const showAlert = (message, icon) => {
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

  const handleRegister = async (userData) => {
    setIsSubmitting(true);
    try {
      let result;

      if (userType === "doctor") {
        result = await registerDoctor(userData);
      } else if (userType === "patient") {
        result = await registerPatient(userData);
      }

      if (result.success) {
        showAlert(result.message, "success");
        navigate("/dashboard");
      } else {
        showAlert(result.message, "error");
      }
    } catch (error) {
      console.error(error);
      showAlert("Error inesperado", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return {
    isSubmitting,
    handleRegister,
    showPassword,
    handleClickShowPassword,
  };
};

export default useRegister;
