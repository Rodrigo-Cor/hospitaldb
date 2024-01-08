import {
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import useRegister from '../hooks/useRegister';

const RegisterDoctorForm = () => {
  const {
    isSubmitting,
    handleRegister,
    showPassword,
    handleClickShowPassword,
  } = useRegister("doctor");

  const validationSchema = Yup.object({
    no_empleado: Yup.string()
      .required("Número de empleado requerido")
      .matches(/^\d{10}$/, "Debe contener 10 dígitos numéricos"),
    correo: Yup.string().email("Correo electrónico no válido").required("Correo electrónico requerido"),
    especialidad: Yup.string().required("Especialidad requerida"),
    consultorio: Yup.string()
      .required("Número de consultorio requerido")
      .matches(/^\d+$/, "Debe contener solo números"),
    telefono: Yup.string()
      .required("Teléfono requerido")
      .matches(/^\d{10}$/, "Debe contener 10 dígitos numéricos"),
    nombre: Yup.string().required("Nombre requerido"),
    ap_paterno: Yup.string().required("Apellido paterno requerido"),
    ap_materno: Yup.string().required("Apellido materno requerido"),
    password: Yup.string().required("Contraseña requerida")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+@$-]).{8,}$/,
        "La contraseña debe contener al menos 8 carácteres, incluyendo al menos una mayúscula, una minúscula, un número y un signo como + $ -"),
  });

  const initialValues = {
    no_empleado: "",
    correo: "",
    especialidad: "",
    consultorio: "",
    telefono: "",
    nombre: "",
    ap_paterno: "",
    ap_materno: "",
    password: "",
  };

  const onSubmit = (values) => {
    handleRegister(values);
  };

  return (
    <>
      <Box
        display="flex"
        sx={{
          m: "1rem",
          backgroundColor: "#fafafa",
          padding: "1.5rem",
          borderRadius: "1rem"
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Grid container rowSpacing={1} spacing={2} marginY={1}>
              <Grid item xs={12} md={4}>
                <Field name="nombre">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="nombre"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="ap_paterno">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Apellido paterno"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="ap_paterno"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="ap_materno">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Apellido materno"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="ap_materno"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="no_empleado">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Número de empleado"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="no_empleado"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="consultorio">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Número de consultorio"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="consultorio"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="especialidad">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Especialidad"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
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
                <Field name="correo">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Correo electrónico"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="correo"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name="telefono">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Teléfono"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="telefono"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} >
                <Field name="password">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage
                        className="error"
                        name="password"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrar Médico"}
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default RegisterDoctorForm;