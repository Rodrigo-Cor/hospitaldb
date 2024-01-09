import {
  TextField,
  Button,
  Box,
  List,
  ListItemText,
  ListItem,
  Typography,
  Grid,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useDelete from "../hooks/useDelete";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const DeletePatientForm = () => {
  const {
    processRequest,
    handleDeletePatient,
    handleFetchScheduledAppointments,
    appointmentsPatient: { dataSheduledAppointmets, dataPatientCost },
  } = useDelete();

  const validationSchema = Yup.object({
    nss: Yup.string()
      .required("NSS requerido")
      .max(11, "El NSS debe tener exactamente 11 caracteres"),
  });

  const initialValues = {
    nss: "",
  };

  const onSubmit = (values) => {
    const { nss } = values;
    handleFetchScheduledAppointments({ nss });
  };

  return (
    <>
      {dataSheduledAppointmets.length === 0 &&
      Object.keys(dataPatientCost).length === 0 ? (
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          sx={{
            "@media (max-width: 576px)": {
              gridTemplateColumns: "1fr",
            },
            m: "1rem",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Field name="nss">
                {({ field }) => (
                  <>
                    <TextField
                      {...field}
                      label="NSS"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      className="error"
                      name="nss"
                      component="div"
                    />
                  </>
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={processRequest}
                sx={{ marginTop: "0.5rem" }}
              >
                {processRequest ? "Checando..." : "Checar adeudos"}
              </Button>
            </Form>
          </Formik>
        </Box>
      ) : dataSheduledAppointmets.length === 0 ? (
        <Box margin={1}>
          <Typography variant="h5">
            No se encontraron citas pendientes
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={processRequest}
            onClick={() => handleDeletePatient({ nss: dataPatientCost?.nss })}
          >
            Dar de baja el paciente
          </Button>
        </Box>
      ) : (
        <Box margin={1}>
          <Typography variant="body1">
            <strong>Paciente: </strong>
            {dataPatientCost?.Usuario.nombre}{" "}
            {dataPatientCost?.Usuario.ap_paterno}{" "}
            {dataPatientCost?.Usuario.ap_materno}
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText>
                <Typography variant="h6">Citas pendientes:</Typography>
              </ListItemText>
              <Grid container spacing={2}>
                {dataSheduledAppointmets.map(
                  ({
                    id_horario,
                    fecha_hora_inicio,
                    fecha_hora_final,
                    nameDoctor,
                    consultorio,
                    costo,
                  }) => {
                    const textAppointment = `Cita con el médico ${nameDoctor} en el consultorio ${consultorio} el día ${dayjs(
                      fecha_hora_inicio
                    ).format("DD-MM-YYYY")} de ${dayjs(
                      fecha_hora_inicio
                    ).format("hh:mm a")} a ${dayjs(fecha_hora_final).format(
                      "hh:mm a"
                    )} con un costo de ${costo}`;
                    return (
                      <Grid item xs={12} key={id_horario}>
                        <ListItemText>
                          <Typography>{textAppointment}</Typography>
                        </ListItemText>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </ListItem>
          </List>
          <Typography variant="body1">
            <strong>Costo total: ${dataPatientCost?.costoTotal}</strong>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default DeletePatientForm;
