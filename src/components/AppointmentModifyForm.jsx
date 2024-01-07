import {
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

import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import useAppointmentPatient from "../hooks/useAppointmentPatient";

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentModifyForm = () => {
  const { modifyAppointment } = useAppointmentPatient();

  const location = useLocation();
  const { appointmentData, id_horario } = location.state;

  const initialValues = {
    schedule: "",
  };

  const onSubmit = async (values) => {
    console.log("Formulario enviado:", values);
    const { id } = JSON.parse(values.schedule);
    await modifyAppointment({ id_horario, newHorarioId: id });
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.schedule) {
      errors.schedule = "El horario es requerido";
    }

    return errors;
  };

  return (
    <>
      <h1>AppointmentModifyForm</h1>
      {
        <Box margin={1}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validateForm}
          >
            {({ handleChange }) => (
              <Form>
                <Grid container rowSpacing={4} spacing={2}>
                  {appointmentData.length > 0 ? (
                    <Container
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
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
                                {appointmentData?.map(
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
                  ) : (
                    <Grid item xs={12}>
                      <h2>No hay horarios disponibles</h2>
                    </Grid>
                  )}
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                  Modificar cita
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      }
    </>
  );
};

export default AppointmentModifyForm;
