import {
  MenuItem,
  Select,
  InputLabel,
  Box,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  Container,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { string } from "prop-types";

import useSheduleAppointment from "../hooks/useScheduleAppointment";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentForm = ({ nss }) => {
  AppointmentForm.propTypes = {
    nss: string.isRequired,
  };

  const {
    availableDoctors,
    specialtiesCost,
    scheduleDoctor,
    selectedHorario,
    cleanSchedules,
    registerAppointmentPatient,
  } = useSheduleAppointment();

  const initialValues = {
    especialidad: "",
    no_empleado: "",
    schedule: "",
  };

  const onSubmit = async (values) => {
    console.log("Formulario enviado:", values);
    const { id, fecha_hora_inicio, fecha_hora_final } = JSON.parse(
      values.schedule
    );

    const consultorio = availableDoctors.find(
      ({ no_empleado }) => no_empleado === values.no_empleado
    ).consultorio;

    await registerAppointmentPatient({
      id,
      fecha_hora_inicio,
      fecha_hora_final,
      nss,
      consultorio: consultorio,
    });
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.especialidad) {
      errors.especialidad = "La especialidad es requerida";
    }

    if (!values.no_empleado) {
      errors.no_empleado = "El consultorio es requerido";
    }

    if (!values.schedule) {
      errors.schedule = "El horario es requerido";
    }

    return errors;
  };

  return (
    <>
      <Box margin={1}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validateForm}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container rowSpacing={4} spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field name="especialidad">
                    {({ field }) => (
                      <>
                        <InputLabel>Especialidad</InputLabel>
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                          label="Especialidad"
                          value={values.especialidad}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue("no_empleado", "");
                            cleanSchedules();
                          }}
                        >
                          {specialtiesCost.map(({ especialidad, costo }) => (
                            <MenuItem key={especialidad} value={especialidad}>
                              {especialidad} con un costo de ${costo}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          className="error"
                          name="especialidad"
                          component="div"
                        />
                      </>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field name="no_empleado">
                    {({ field }) => (
                      <>
                        <InputLabel>Médico</InputLabel>
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                          label="Médico"
                          value={values.no_empleado}
                          onChange={(e) => {
                            scheduleDoctor({ no_empleado: e.target.value });
                            handleChange(e);
                            cleanSchedules();
                          }}
                        >
                          {availableDoctors
                            .filter(
                              ({ especialidad }) =>
                                especialidad === values.especialidad
                            )
                            .map(
                              ({
                                consultorio,
                                nombreCompleto,
                                no_empleado,
                              }) => (
                                <MenuItem key={no_empleado} value={no_empleado}>
                                  Médico:{nombreCompleto}. Consultorio:
                                  {consultorio}
                                </MenuItem>
                              )
                            )}
                        </Select>
                        <ErrorMessage
                          className="error"
                          name="consultorio"
                          component="div"
                        />
                      </>
                    )}
                  </Field>
                </Grid>
                {selectedHorario.length > 0 && (
                  <Container sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={12}>
                      <Field name="schedule">
                        {({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <RadioGroup
                              {...field}
                              name="schedule"
                              row
                              onChange={handleChange}
                            >
                              {selectedHorario?.map(
                                ({
                                  id,
                                  fecha_hora_inicio,
                                  fecha_hora_final,
                                }) => (
                                  <FormControlLabel
                                    key={id}
                                    value={JSON.stringify({
                                      id,
                                      fecha_hora_inicio,
                                      fecha_hora_final,
                                    })}
                                    control={<Radio />}
                                    label={
                                      <div style={{ margin: "1rem" }}>
                                        <Grid container rowSpacing={2}>
                                          <Grid item xs={12} md={6}>
                                            <DateTimeField
                                              fullWidth
                                              value={dayjs(fecha_hora_inicio)}
                                              label="Inicio"
                                              readOnly
                                              format="L hh:mm a"
                                              size="small"
                                              timezone="America/Mexico_City"
                                            />
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                            <DateTimeField
                                              fullWidth
                                              label="Final"
                                              value={dayjs(fecha_hora_final)}
                                              readOnly
                                              format="L hh:mm a"
                                              size="small"
                                              timezone="America/Mexico_City"
                                            />
                                          </Grid>
                                        </Grid>
                                      </div>
                                    }
                                  />
                                )
                              )}
                            </RadioGroup>
                            <ErrorMessage
                              className="error"
                              name="schedule"
                              component="div"
                            />
                          </LocalizationProvider>
                        )}
                      </Field>
                    </Grid>
                  </Container>
                )}
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                Agendar cita
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AppointmentForm;
