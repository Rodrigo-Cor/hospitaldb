import { teal, cyan } from "@mui/material/colors";
import { Box, TextField, Grid, Button, ButtonGroup } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link as RouterLink} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { handleUser } from "../reducers/userReducer";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const tealColor = teal[500];
  const cyanColor = cyan[100];
  const { typeUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialValues = {
    correo: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    correo: Yup.string().email("Correo electrónico no válido"),
  });

  const { processRequest, loginUser } = useLogin();

  const onSubmit = (values) => {
    console.log("Formulario enviado:", values);
    loginUser(values);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Box margin={1} padding={2} border={4} borderColor={tealColor}>
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            sx={{ marginBottom: "1rem" }}
          >
            <Button
              style={{
                backgroundColor: typeUser === "patient" && cyanColor,
              }}
              onClick={() => {
                dispatch(handleUser("patient"));
              }}
            >
              ¿Eres paciente?
            </Button>
            <Button
              style={{
                backgroundColor: typeUser === "doctor" && cyanColor,
              }}
              onClick={() => {
                dispatch(handleUser("doctor"));
              }}
            >
              ¿Eres médico?
            </Button>
            <Button
              style={{
                backgroundColor: typeUser === "receptionist" && cyanColor,
              }}
              onClick={() => {
                dispatch(handleUser("receptionist"));
              }}
            >
              ¿Eres recepcionista?
            </Button>
          </ButtonGroup>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            key={typeUser}
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
          {typeUser === "patient" && (
            <Box display={"flex"} alignItems={"center"}>
              <PersonAdd />
              <span>
                No tienes cuenta?
                <RouterLink to="/registerPatient">
                  <Button size="large">Registrate</Button>
                </RouterLink>
              </span>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Login;
