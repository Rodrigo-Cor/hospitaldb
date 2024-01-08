import { TextField, Button, Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useDelete from "../hooks/useDelete";

const DeleteConsultoryForm = () => {
  const { processRequest, handleDeleteConsultory } = useDelete();

  const validationSchema = Yup.object({
    consultorio: Yup.string()
      .required("Número de consultorio requerido")
      .test(
        "not-zero",
        "El valor no puede ser cero",
        (value) => parseInt(value, 10) !== 0
      )
      .test(
        "is-number",
        "Ingrese un número válido",
        (value) => !isNaN(parseInt(value, 10))
      )
      .test(
        "not-negative",
        "El valor no puede ser negativo",
        (value) => parseInt(value, 10) >= 0
      ),
  });

  const initialValues = {
    consultorio: " ",
  };

  const onSubmit = (values) => {
    const { consultorio: consultorioForm } = values;
    const consultorioValue = parseInt(consultorioForm, 10);
    handleDeleteConsultory({ consultorio: consultorioValue });
  };

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        sx={{
          "@media (max-width: 576px)": {
            gridTemplateColumns: "1fr",
          },
          m: "1rem"
        }}
        
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Field name="consultorio">
              {({ field }) => (
                <>
                  <TextField
                    {...field}
                    label="Número del consultorio"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    className="error"
                    name="consultorio"
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
              {processRequest ? "Eliminando..." : "Eliminar Consultorio"}
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default DeleteConsultoryForm;
