import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

import useRecipeData from "../hooks/useRecipeData";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleAppointmentInformation } from "../reducers/recepcionistReducer";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import between from "dayjs/plugin/isBetween";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(between);

const RecepcionistHome = () => {
  const dispatch = useDispatch();
  const { getDataRecipe, updateStatus } = useRecipeData();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      dispatch(handleAppointmentInformation());
    };
    fetchData();
  }, [dispatch]);

  const { appointments } = useSelector((state) => state.recepcionist);

  return (
    <>
      {appointments?.length > 0 && (
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
              {appointments?.map(
                (
                  {
                    id,
                    nss,
                    nameDoctor,
                    namePatient,
                    consultorio,
                    especialidad,
                    status,
                    descripcion,
                    fecha_hora_inicio,
                    fecha_hora_final,
                    receta,
                  },
                  index
                ) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <section>
                        {namePatient} - NSS: {nss}
                      </section>
                      <section style={{ marginTop: "1rem" }}>
                        {nameDoctor} - {especialidad} - Consultorio:{" "}
                        {consultorio}
                      </section>
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
                      <section>{descripcion}</section>
                      {status === 1 &&
                        !dayjs()
                          .tz("America/Mexico_City")
                          .isBefore(
                            fecha_hora_inicio,
                            dayjs(fecha_hora_inicio).diff(30, "minutes")
                          ) && (
                          <section style={{ marginTop: "1rem" }}>
                            {dayjs()
                              .tz("America/Mexico_City")
                              .isBetween(
                                fecha_hora_inicio,
                                dayjs(fecha_hora_inicio).add(30, "minutes")
                              ) ? (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() =>
                                  updateStatus({
                                    id,
                                    status: 4,
                                    descripcion: "Cita en curso",
                                  })
                                }
                              >
                                COBRAR CITA
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() =>
                                  updateStatus({
                                    id,
                                    status: 5,
                                    descripcion: "No se presentó",
                                  })
                                }
                              >
                                COBRAR POR NO PRESENTARSE
                              </Button>
                            )}
                            {}
                          </section>
                        )}
                    </TableCell>
                    <TableCell align="center">
                      {status === 4 || receta != null ? (
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
      )}
    </>
  );
};

export default RecepcionistHome;
