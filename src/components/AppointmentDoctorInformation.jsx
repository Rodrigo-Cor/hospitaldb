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
import StatusError from "./StatusError";
import StatusInformative from "./StatusInformative";
import useRecipeData from "../hooks/useRecipeData";

import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import { array, number, string } from "prop-types";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import between from "dayjs/plugin/isBetween";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(between);

const CellStatusPatient = ({ fecha_hora_inicio, status }) => {
  CellStatusPatient.propTypes = {
    status: number.isRequired,
    fecha_hora_inicio: string.isRequired,
  };

  const appointmentDate = dayjs
    .utc(fecha_hora_inicio)
    .tz("America/Mexico_City");

  const today = dayjs().tz("America/Mexico_City").startOf("day");

  if (status === 2) {
    return <StatusError error={"Cancelada por el paciente"} />;
  } else if (today.isAfter(appointmentDate.startOf("day")) && status === 5) {
    return <StatusError error={"No pagada por el paciente"} />;
  } else if (today.isSame(appointmentDate.startOf("day"))) {
    return <StatusInformative information={"Su cita es hoy"} />;
  } else if (status === 1) {
    return <StatusInformative information={"Agendada"} />;
  }
};

const NoAppointmentsAvailable = () => {
  return (
    <Typography variant="h6" align="center">
      No hay citas para mostrar
    </Typography>
  );
};

const AppointmentTable = ({ appointments }) => {
  AppointmentTable.propTypes = {
    appointments: array.isRequired,
  };

  const { getDataRecipe } = useRecipeData();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="center">Fecha-Hora</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Receta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map(
            (
              {
                id_cita,
                paciente,
                nss,
                fecha_hora_inicio,
                fecha_hora_final,
                status,
                id_receta,
              },
              index
            ) => (
              <TableRow key={id_cita}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">
                  {paciente} - NSS: {nss}
                </TableCell>
                <TableCell align="center">
                  {dayjs()
                    .tz("America/Mexico_City")
                    .startOf("day")
                    .isSame(
                      dayjs
                        .utc(fecha_hora_inicio)
                        .tz("America/Mexico_City")
                        .format("DD-MM-YYYY HH:mm")
                    ) ? (
                    <p>
                      {dayjs
                        .utc(fecha_hora_inicio)
                        .tz("America/Mexico_City")
                        .format("HH:mm")}
                      {" - "}
                      {dayjs
                        .utc(fecha_hora_final)
                        .tz("America/Mexico_City")
                        .format("HH:mm")}
                    </p>
                  ) : (
                    <p>
                      {dayjs
                        .utc(fecha_hora_inicio)
                        .tz("America/Mexico_City")
                        .format("DD-MM-YYYY HH:mm")}
                      {" - "}
                      {dayjs
                        .utc(fecha_hora_final)
                        .tz("America/Mexico_City")
                        .format("HH:mm")}
                    </p>
                  )}
                </TableCell>
                <TableCell align="center">
                  <CellStatusPatient
                    fecha_hora_inicio={fecha_hora_inicio}
                    status={status}
                  />
                </TableCell>
                <TableCell align="center">
                  {status === 4 || id_receta != null ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => getDataRecipe(id_cita)}
                    >
                      Ver receta
                    </Button>
                  ) : dayjs()
                      .tz("America/Mexico_City")
                      .isBetween(fecha_hora_inicio, fecha_hora_final) ? (
                    <Link to={`/dashboard/createrecipe/${id_cita}`}>
                      <Button variant="contained" color="primary" size="small">
                        Crear receta
                      </Button>
                    </Link>
                  ) : (
                    <Typography variant="body2" color="error">
                      No disponible
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
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

  return (
    <Box sx={{ margin: "1rem" }}>
      {appointments.length > 0 ? (
        <AppointmentTable appointments={appointments} />
      ) : (
        <NoAppointmentsAvailable />
      )}
    </Box>
  );
};

export default AppointmentDoctorInformation;
