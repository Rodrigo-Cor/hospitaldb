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

import { array, number, string, bool } from "prop-types";

import useAppointmentPatient from "../hooks/useAppointmentPatient";
import useRecipeData from "../hooks/useRecipeData";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const StatusCancel = () => {
  return (
    <Typography variant="body2" color="error">
      Cancelada
    </Typography>
  );
};

const StatusNoPaid = () => {
  return (
    <Typography variant="body2" color="error">
      No pagada. Se le hizo un cobro a su método de pago registrado
    </Typography>
  );
};

const StatusAppointmentToday = () => {
  return (
    <>
      Su cita es <strong>hoy</strong> y el pago se realizará al finalizar la
      cita.{" "}
      <strong>
        En caso de no presentarse se le hará un cobro a su método de pago
        registrado
      </strong>
    </>
  );
};

const CancelAppointment = ({ id, onTime, no_empleado, id_horario }) => {
  CancelAppointment.propTypes = {
    id: number.isRequired,
    onTime: bool.isRequired,
    no_empleado: string.isRequired,
    id_horario: number.isRequired,
  };

  console.log(id_horario);

  const { cancelAppointment, getScheduleModify } = useAppointmentPatient();
  return (
    <Box>
      {onTime && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => getScheduleModify({ id_horario, no_empleado })}
          size="small"
          sx={{ margin: "0.5rem" }}
        >
          Modificar
        </Button>
      )}
      <Button
        variant="contained"
        color="error"
        onClick={() => cancelAppointment(id)}
        size="small"
      >
        Cancelar
      </Button>
    </Box>
  );
};

const NoAppointmentsAvailable = () => {
  return (
    <Typography variant="h6" align="center">
      No hay citas para mostrar
    </Typography>
  );
};

const CellStatusPatient = ({
  fecha_hora_inicio,
  id,
  status,
  onTime,
  no_empleado,
  id_horario,
}) => {
  CellStatusPatient.propTypes = {
    id: number.isRequired,
    status: number.isRequired,
    fecha_hora_inicio: string.isRequired,
    onTime: bool.isRequired,
    no_empleado: string.isRequired,
    id_horario: number.isRequired,
  };

  const appointmentDate = dayjs
    .utc(fecha_hora_inicio)
    .tz("America/Mexico_City");

  const today = dayjs().tz("America/Mexico_City").startOf("day");

  if (status === 2) {
    return <StatusCancel />;
  } else if (today.isAfter(appointmentDate.startOf("day")) && status === 5) {
    return <StatusNoPaid />;
  } else if (today.isSame(appointmentDate.startOf("day"))) {
    return <StatusAppointmentToday />;
  } else {
    return (
      <CancelAppointment
        id={id}
        onTime={onTime}
        no_empleado={no_empleado}
        id_horario={id_horario}
      />
    );
  }
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
                id,
                id_horario,
                medico,
                consultorio,
                no_empleado,
                especialidad,
                fecha_hora_inicio,
                fecha_hora_final,
                status,
                onTime,
              },
              index
            ) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">
                  {especialidad} - {medico} - Consultorio: {consultorio}
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
                    id={id}
                    status={status}
                    onTime={onTime}
                    no_empleado={no_empleado}
                    id_horario={id_horario}
                  />
                </TableCell>
                <TableCell align="center">
                  {status === 4 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => getDataRecipe(id)}
                    >
                      Ver receta
                    </Button>
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

/*
 */

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
    <Box sx={{ margin: "1rem" }}>
      {appointments.length > 0 ? (
        <AppointmentTable appointments={appointments} />
      ) : (
        <NoAppointmentsAvailable />
      )}
    </Box>
  );
};

export default AppointmentInformation;
