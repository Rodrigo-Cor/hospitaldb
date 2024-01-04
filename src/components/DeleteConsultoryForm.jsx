import {
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import useDeleteConsultory from '../hooks/useDeleteConsultory';

const DeleteConsultoryForm = () => {
  const {
    processRequest,
    handleDeleteConsultory,
  } = useDeleteConsultory();

  const validationSchema = Yup.object({
    consultorio: Yup.string().required('Número de consultorio requerido')
      .test('not-zero', 'El valor no puede ser cero', value => parseInt(value, 10) !== 0)
      .test('is-number', 'Ingrese un número válido', value => !isNaN(parseInt(value, 10)))
      .test('not-negative', 'El valor no puede ser negativo', value => parseInt(value, 10) >= 0),
  });

  const initialValues = {
    consultorio: " ",
  };

  const onSubmit = (values) => {
    const consultorioValue = parseInt(values.consultorio, 10);
    handleDeleteConsultory(consultorioValue);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}  >
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={processRequest}
            >
              {processRequest ? "Eliminando..." : "Eliminar Consultorio"}
            </Button>
          </Form>
        </Formik>
      </ Box>
    </>
  );
};

export default DeleteConsultoryForm;
