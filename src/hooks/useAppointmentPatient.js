import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cancelConfirmedAppointment,
  fetchScheduleModify,
  modifyAppointmentSchedule,
} from "../services/appointments";
import { handleNewAppointments } from "../reducers/patientReducer";
import Swal from "sweetalert2";

const useAppointmentPatient = () => {
  const { appointments } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelAppointment = async (idCita) => {
    const { id, id_horario, onTime } = appointments.find(
      ({ id }) => id === idCita
    );

    console.log(id, id_horario, onTime);

    const resultado = await Swal.fire({
      title: "Cancelación de Cita Médica",
      text:
        "¿Desea cancelar su cita médica?" +
        (onTime
          ? " No se hará ningún cobro por la cancelación"
          : " Se hará un cobro por la cancelación a su método de pago registrado"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      //Prueba rápida
      const { success, message } = {
        success: true,
        message: "Cita cancelada con éxito",
      };
      /*
      const { success, message } = await cancelConfirmedAppointment({
        id,
        id_horario,
      });
*/

      if (success) {
        Swal.fire(message, "", "success");
        const newAppointments = appointments.map((appointment) => {
          if (appointment.id === idCita) {
            return { ...appointment, status: 2 };
          }
          return appointment;
        });
        dispatch(handleNewAppointments(newAppointments));
      } else {
        Swal.fire(message, "", "error");
      }
    } else if (resultado.isDismissed) {
      return;
    }
  };

  const getScheduleModify = async ({ id_horario, no_empleado }) => {
    const { success, message } = await fetchScheduleModify({
      id_horario,
      no_empleado,
    });
    if (success) {
      navigate("/dashboard/appointmentModify", {
        state: { appointmentData: message, id_horario },
      });
    } else {
      Swal.fire(message, "", "error");
    }
  };

  const modifyAppointment = async ({ id_horario, newHorarioId }) => {
    console.log(id_horario, newHorarioId);
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

    const resultado = await Swal.fire({
      title: "Modificación de Cita Médica",
      text: "¿Desea modificar su cita médica?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      const { success, message } = await modifyAppointmentSchedule({
        id_horario,
        newHorarioId,
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
    cancelAppointment,
    getScheduleModify,
    modifyAppointment,
  };
};

export default useAppointmentPatient;
