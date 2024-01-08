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

const RegisterPatientForm = () => {
  const {
    isSubmitting,
    handleRegister,
    showPassword,
    handleClickShowPassword,
  } = useRegister("patient");

  const today = new Date();
  const maxBirthDate = new Date(today);
  maxBirthDate.setFullYear(today.getFullYear() - 5);

  const minBirthDate = new Date(today);
  minBirthDate.setFullYear(today.getFullYear() - 118);

  const validationSchema = Yup.object({
    nss: Yup.string().required("NSS requerido")
      .matches(/^\d{11}$/, "Debe contener 11 dígitos numéricos"),
    correo: Yup.string().email("Correo electrónico no válido").required("Correo electrónico requerido"),
    telefono: Yup.string().required("Teléfono requerido")
      .matches(/^\d{10}$/, "Debe contener 10 dígitos numéricos"),
    nombre: Yup.string().required("Nombre requerido"),
    ap_paterno: Yup.string().required("Apellido paterno requerido"),
    ap_materno: Yup.string().required("Apellido materno requerido"),
    password: Yup.string().required("Contraseña requerida")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+@$-]).{8,}$/,
        "La contraseña debe contener al menos 8 carácteres, incluyendo al menos una mayúscula, una minúscula, un número y un signo como + $ -"),
    metodo_pago: Yup.string().required("Número de tarjeta requerido")
      .matches(/^\d{16}$/, "Debe contener 16 dígitos numéricos"),
    fecha_nacimiento: Yup.date().required('Fecha de nacimiento requerida')
      .max(maxBirthDate, "El paciente debe tener al menos 5 años")
      .min(minBirthDate, "La edad del paciente debe estar entre 5 y 118 años"),
  });

  const initialValues = {
    nss: "",
    correo: "",
    telefono: "",
    nombre: "",
    ap_paterno: "",
    ap_materno: "",
    password: "",
    metodo_pago: "",
    fecha_nacimiento: "",
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
              <Grid item xs={12} md={4}>
                <Field name="nss">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="NSS"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        className="error"
                        name="nss"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="fecha_nacimiento">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Fecha de Nacimiento"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <ErrorMessage
                        className="error"
                        name="fecha_nacimiento"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field name="metodo_pago">
                  {({ field }) => (
                    <>
                      <TextField
                        {...field}
                        label="Método de Pago"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Ingrese su número de tarjeta"
                      />
                      <ErrorMessage
                        className="error"
                        name="metodo_pago"
                        component="div"
                      />
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
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
              {isSubmitting ? "Registrando..." : "Registrar Paciente"}
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default RegisterPatientForm;