import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useMemo } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const StatusCancel = () => {
  return (
    <Typography variant="body2" color="error">
      Cancelada por el paciente
    </Typography>
  );
};

const StatusNoPaid = () => {
  return (
    <Typography variant="body2" color="error">
      No pagada por el paciente
    </Typography>
  );
};

const StatusAppointmentToday = () => {
  return (
    <>
      Su cita es <strong>hoy</strong>
    </>
  );
};

const AppointmentDoctorInformation = () => {
  const doctor = useSelector((state) => state.doctor);
  const { filterAppointment } = useSelector((state) => state.filterAppointment);

  const appointments = useMemo(() => {
    const today = dayjs().tz("America/Mexico_City").startOf("day");
    return (
      doctor.appointments?.filter(({ fecha_hora_inicio, status }) => {
        const appointmentDate = dayjs
          .utc(fecha_hora_inicio)
          .tz("America/Mexico_City")
          .startOf("day");

        if (filterAppointment === "all") {
          return true;
        } else if (filterAppointment === "today") {
          return appointmentDate.isSame(today);
        } else if (filterAppointment === "pending") {
          return today.isBefore(appointmentDate);
        } else if (filterAppointment === "past") {
          return today.isAfter(appointmentDate);
        } else if (filterAppointment === "cancel") {
          return status === 2;
        }
        return false;
      }) || []
    );
  }, [doctor.appointments, filterAppointment]);
};

export default AppointmentDoctorInformation;
