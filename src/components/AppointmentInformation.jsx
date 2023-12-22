import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useMemo } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentInformation = () => {
  
  const patient = useSelector((state) => state.patient);
  const { filterAppointment } = useSelector((state) => state.filterAppointment);
  const appointments = useMemo(() => {
    const today = dayjs().tz("America/Mexico_City").startOf("day");
    return (
      patient.appointments?.filter(({ fecha_hora_inicio, status }) => {
        const appointmentDate = dayjs
          .utc(fecha_hora_inicio)
          .tz("America/Mexico_City")
          .startOf("day");

        if (filterAppointment === "all") {
          //console.log("all", appointment);
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
  }, [patient.appointments, filterAppointment]);

  return (
    <>
      <h1>Appointment Information</h1>
      <Box sx={{ margin: "1rem" }}>
        {appointments.length !== 0 ? (
          <TableContainer
            component={(props) => <Paper elevation={3} {...props} />}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Fecha-Hora</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(({ id }) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No hay citas</p>
        )}
      </Box>
    </>
  );
};

export default AppointmentInformation;
