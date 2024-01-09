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

const DeleteDoctorForm = () => {
  const {
    processRequest,
    handleDeleteDoctor,
    appointmentsDoctor: { citas, nameDoctor },
  } = useDelete();

  const validationSchema = Yup.object({
    no_empleado: Yup.string()
      .required("Número de empleado requerido")
      .max(15, "El número de empleado debe tener exactamente 15 caracteres"),
  });

  const initialValues = {
    no_empleado: "",
  };

  const onSubmit = (values) => {
    const { no_empleado } = values;
    handleDeleteDoctor({ no_empleado });
  };

  return (
    <>
      {citas.length === 0 ? (
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
              <Field name="no_empleado">
                {({ field }) => (
                  <>
                    <TextField
                      {...field}
                      label="No. de empleado"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      className="error"
                      name="no_empleado"
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
                {processRequest ? "Eliminando..." : "Eliminar médico"}
              </Button>
            </Form>
          </Formik>
        </Box>
      ) : (
        <Box margin={1}>
          <Typography variant="body1">
            <strong>Médico: </strong>
            {nameDoctor}
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText>
                <Typography variant="h6">Citas pendientes:</Typography>
              </ListItemText>
              <Grid container spacing={2}>
                {citas.map(
                  ({
                    id,
                    nss,
                    HorarioConsultorio: { fecha_hora_inicio, fecha_hora_final },
                  }) => {
                    const textAppointment = `Cita con el paciente con NSS ${nss} el día ${dayjs(
                      fecha_hora_inicio
                    ).format("DD-MM-YYYY")} de ${dayjs(
                      fecha_hora_inicio
                    ).format("hh:mm a")} a ${dayjs(fecha_hora_final).format(
                      "hh:mm a"
                    )} `;

                    return (
                      <Grid item xs={12} key={id}>
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
        </Box>
      )}
    </>
  );
};

export default DeleteDoctorForm;
