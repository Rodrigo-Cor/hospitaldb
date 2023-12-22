import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchDoctorsAvailableCost,
  fetchScheduleDoctors,
  registerAppointment,
} from "../services/appointments";

import Swal from "sweetalert2";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const useScheduleAppointment = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [specialtiesCost, setSpecialtiesCost] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { success, message } = await fetchDoctorsAvailableCost();
      if (success) {
        setAvailableDoctors(message.availableDoctors);
        setSpecialtiesCost(message.specialtiesCost);
      }
    };

    fetchData();
  }, []);

  const scheduleDoctor = useCallback(async ({ no_empleado }) => {
    const { success, message } = await fetchScheduleDoctors({ no_empleado });

    if (success) {
      setSelectedHorario(message);
    }
  }, []);

  const cleanSchedules = () => {
    setSelectedHorario([]);
  };

  const registerAppointmentPatient = async ({
    id,
    fecha_hora_inicio,
    fecha_hora_final,
    nss,
    consultorio,
  }) => {
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

    

    const d1 = dayjs.utc(fecha_hora_inicio).tz("America/Mexico_City");
    const d2 = dayjs.utc(fecha_hora_final).tz("America/Mexico_City");

    const resultado = await Swal.fire({
      title: "Confirmación de Cita Médica",
      text:
        "¿Desea confirmar esta cita médica? Hora de inicio: " +
        d1.format("L hh:mm a") +
        ". Hora de finalización: " +
        d2.format("L hh:mm a") +
        " en el consultorio " +
        consultorio +
        ".",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      const { success, message } = await registerAppointment({
        id_horario: id,
        nss,
        fecha_hora_inicio,
      });

      if (success) {
        genericAlert(message, success);
        navigate("/dashboard");
      } else {
        genericAlert(message, "error");
      }
    } else if (resultado.isDismissed) {
      return;
    }
  };

  return {
    availableDoctors,
    specialtiesCost,
    scheduleDoctor,
    selectedHorario,
    cleanSchedules,
    registerAppointmentPatient,
  };
};

export default useScheduleAppointment;
