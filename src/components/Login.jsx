import { teal } from "@mui/material/colors";
import { Box, TextField, Grid, Button } from "@mui/material";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";

const Login = () => {
  const tealColor = teal[500];

  const initialValues = {
    correo: "feresca@gmail.com",
    password: "Fer$85OE",
  };

  /*
  const initialValues = {
    correo: "mflores@gmail.com",
    password: "Mic$45FS",
  }
  */

  const validationSchema = Yup.object().shape({
    correo: Yup.string().email("Correo electrónico no válido"),
  });

  const { processRequest, loginUser } = useLogin();

  const { loading } = useSelector((state) => state.patient);

  if (processRequest || loading) {
    return <div>Cargando...</div>;
  }

  const onSubmit = (values) => {
    console.log("Formulario enviado:", values);
    loginUser(values);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Box margin={1} padding={2} border={4} borderColor={tealColor}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid container rowSpacing={4} spacing={2}>
                <Grid item xs={12}>
                  <Field name="correo">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        label="Correo"
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="correo" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field name="password">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        label="Contraseña"
                        type="password"
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ marginY: "1rem" }}
              >
                {processRequest ? "Ingresando..." : "Ingresar"}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Login;
