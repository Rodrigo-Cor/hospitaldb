import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useCreateRecipe from "../hooks/useCreateRecipe";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RecipeForm = () => {
  const { id_cita } = useParams();

  const { especialidad } = useSelector((state) => state.doctor);

  const { medicines, services, treatments, createRecipe } = useCreateRecipe();

  const validationSchema = Yup.object().shape({
    selectedMedicines: Yup.object().test(
      "isAnyFieldFilled",
      "Debe llenar al menos un campo antes de enviar el formulario.",
      (value) => {
        return (
          Object.values(value).some((medicine) => medicine.checked) ||
          value === undefined
        );
      }
    ),
    selectedServices: Yup.object().test(
      "isAnyFieldFilled",
      "Debe llenar al menos un campo antes de enviar el formulario.",
      (value) => {
        return (
          Object.values(value).some((service) => service.checked) ||
          value === undefined
        );
      }
    ),
    selectedTreatments: Yup.object().test(
      "isAnyFieldFilled",
      "Debe llenar al menos un campo antes de enviar el formulario.",
      (value) => {
        return (
          Object.values(value).some((treatment) => treatment.checked) ||
          value === undefined
        );
      }
    ),
    diagnostico: Yup.string().required("El diagnóstico es obligatorio"),
  });

  const onSubmit = async (values) => {
    const selectedMedicines = Object.entries(values.selectedMedicines)
      .filter(([key, value]) => value.checked)
      .map(([key, value]) => ({
        id: parseInt(key, 10),
        cantidad: value.quantity || 1,
      }));

    const selectedServices = Object.entries(values.selectedServices)
      .filter(([key, value]) => value.checked)
      .map(([key, value]) => ({
        id: parseInt(key, 10),
        cantidad: value.quantity || 1,
      }));

    const selectedTreatments = Object.entries(values.selectedTreatments)
      .filter(([key, value]) => value.checked)
      .map(([key, value]) => ({
        id: parseInt(key, 10),
        duracion: value.duration || 1,
      }));

    const consultaId = services.find(({ nombre }) =>
      nombre.startsWith("Consulta " + especialidad.toLowerCase())
    ).id;
    console.log(consultaId);

    const consulta = { id: consultaId, cantidad: 1 };
    selectedServices.push(consulta);

    const diagnostico = values.diagnostico;

    console.log({
      id_cita,
      medicamentos: selectedMedicines,
      servicios: selectedServices,
      tratamientos: selectedTreatments,
      diagnostico: diagnostico,
    });

    //Se quitará cuando acaben las pruebas
    /*
    const recipeData = await createRecipe({
      id_cita: values.id_cita,
      medicamentos: selectedMedicines,
      servicios: selectedServices,
      tratamientos: selectedTreatments,
      diagnostico: diagnostico,
    });
    
    const message = recipeData?.message || "Error al crear la receta";

    if (recipeData.success) {
      await Swal.fire({
        icon: "success",
        title: "¡ " + message + " !",
        background: "#272727",
        color: "#effffb",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: message,
      });
    }
    */
  };

  const initialValues = {
    selectedMedicines: {},
    selectedServices: {},
    selectedTreatments: {},
    diagnostico: "",
  };

  return (
    <>
      <Box margin={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              {/*Aqui se encuentra para el diagnostico*/}
              <Grid item xs={12} md={6}>
                <InputLabel>Diagnóstico</InputLabel>
                <TextareaAutosize
                  minRows={3}
                  maxRows={10}
                  name="diagnostico"
                  placeholder="Ingrese el diagnóstico"
                  value={values.diagnostico}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    marginBottom: "2rem",
                    fontFamily: "Arial, sans-serif",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                  }}
                />
                <ErrorMessage
                  name="diagnostico"
                  component="div"
                  className="error"
                />
              </Grid>
              {/*Aqui se encuentran los medicamentos*/}
              <Grid item xs={12} md={6}>
                <Accordion style={{ marginBottom: "2rem" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <InputLabel>Seleccionar Medicamentos</InputLabel>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {medicines.map((medicine) => (
                        <Grid item xs={12} md={6} key={medicine.id}>
                          <Field
                            type="checkbox"
                            name={
                              "selectedMedicines." + medicine.id + ".checked"
                            }
                          >
                            {({ field }) => (
                              <>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      checked={
                                        values.selectedMedicines[medicine.id]
                                          ?.checked || false
                                      }
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        setFieldValue(
                                          "selectedMedicines." +
                                            medicine.id +
                                            ".checked",
                                          checked
                                        );
                                        if (checked) {
                                          // Si se marca el checkbox, establece la cantidad en 1 por defecto
                                          setFieldValue(
                                            "selectedMedicines." +
                                              medicine.id +
                                              ".quantity",
                                            1
                                          );
                                        } else {
                                          // Si se desmarca, elimina la cantidad
                                          setFieldValue(
                                            "selectedMedicines." +
                                              medicine.id +
                                              ".quantity",
                                            undefined
                                          );
                                        }
                                      }}
                                    />
                                  }
                                  label={medicine.nombre}
                                />
                                <ErrorMessage
                                  name={
                                    "selectedMedicines." +
                                    medicine.id +
                                    ".checked"
                                  }
                                  component="div"
                                  className="error"
                                />
                              </>
                            )}
                          </Field>
                          {/* Mostrar el campo de cantidad solo si el checkbox está marcado */}
                          {values.selectedMedicines[medicine.id]?.checked && (
                            <Field
                              type="number"
                              name={
                                "selectedMedicines." + medicine.id + ".quantity"
                              }
                            >
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  label="Cantidad"
                                  value={
                                    values.selectedMedicines[medicine.id]
                                      ?.quantity || ""
                                  }
                                  onChange={(e) => {
                                    const value = Math.max(
                                      0,
                                      parseInt(e.target.value, 10) || 0
                                    );
                                    setFieldValue(
                                      "selectedMedicines." +
                                        medicine.id +
                                        ".quantity",
                                      value
                                    );
                                  }}
                                />
                              )}
                            </Field>
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              {/*Aqui se encuentran los servicios*/}
              <Grid item xs={12} md={6}>
                <Accordion style={{ marginBottom: "2rem" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <InputLabel>Seleccionar Servicios</InputLabel>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {services
                        .filter(({ nombre }) => !nombre.startsWith("Consulta"))
                        .map((service) => (
                          <Grid item xs={12} md={6} key={service.id}>
                            <Field
                              type="checkbox"
                              name={
                                "selectedServices." + service.id + ".checked"
                              }
                            >
                              {({ field }) => (
                                <>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        {...field}
                                        checked={
                                          values.selectedServices[service.id]
                                            ?.checked || false
                                        }
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          setFieldValue(
                                            "selectedServices." +
                                              service.id +
                                              ".checked",
                                            checked
                                          );
                                          if (checked) {
                                            setFieldValue(
                                              "selectedServices." +
                                                service.id +
                                                ".quantity",
                                              1
                                            );
                                          } else {
                                            // Si se desmarca, elimina la cantidad
                                            setFieldValue(
                                              "selectedServices." +
                                                service.id +
                                                ".quantity",
                                              undefined
                                            );
                                          }
                                        }}
                                      />
                                    }
                                    label={service.nombre}
                                  />
                                  <ErrorMessage
                                    name={
                                      "selectedServices." +
                                      service.id +
                                      ".checked"
                                    }
                                    component="div"
                                    className="error"
                                  />
                                </>
                              )}
                            </Field>
                            {/* Mostrar el campo de cantidad solo si el checkbox está marcado */}
                            {values.selectedServices[service.id]?.checked && (
                              <Field
                                type="number"
                                name={
                                  "selectedServices." + service.id + ".quantity"
                                }
                              >
                                {({ field }) => (
                                  <TextField
                                    {...field}
                                    label="Cantidad"
                                    value={
                                      values.selectedServices[service.id]
                                        ?.quantity || ""
                                    }
                                    onChange={(e) => {
                                      // Validar que solo se ingresen números positivos
                                      const value = Math.max(
                                        0,
                                        parseInt(e.target.value, 10) || 0
                                      );
                                      setFieldValue(
                                        "selectedServices." +
                                          service.id +
                                          ".quantity",
                                        value
                                      );
                                    }}
                                  />
                                )}
                              </Field>
                            )}
                          </Grid>
                        ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              {/*Aqui se encuentran los tratamientos*/}
              <Grid item xs={12} md={6}>
                <Accordion style={{ marginBottom: "2rem" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <InputLabel>Seleccionar Tratamientos</InputLabel>
                  </AccordionSummary>
                  <AccordionDetails>
                    {treatments.map((treatment) => (
                      <div key={treatment.id} style={{ marginBottom: "1rem" }}>
                        <Field
                          type="checkbox"
                          name={
                            "selectedTreatments." + treatment.id + ".checked"
                          }
                        >
                          {({ field }) => (
                            <>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    {...field}
                                    checked={
                                      values.selectedTreatments[treatment.id]
                                        ?.checked || false
                                    }
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setFieldValue(
                                        "selectedTreatments." +
                                          treatment.id +
                                          ".checked",
                                        checked
                                      );
                                      if (checked) {
                                        // Si se marca el checkbox, establece la cantidad en 1 por defecto
                                        setFieldValue(
                                          "selectedTreatments." +
                                            treatment.id +
                                            ".duration",
                                          1
                                        );
                                      } else {
                                        // Si se desmarca, elimina la cantidad
                                        setFieldValue(
                                          "selectedTreatments." +
                                            treatment.id +
                                            ".duration",
                                          undefined
                                        );
                                      }
                                    }}
                                  />
                                }
                                label={treatment.descripcion}
                              />
                              <ErrorMessage
                                name={
                                  "selectedTreatments." +
                                  treatment.id +
                                  ".checked"
                                }
                                component="div"
                                className="error"
                              />
                            </>
                          )}
                        </Field>
                        {/* Mostrar el campo de cantidad solo si el checkbox está marcado */}
                        {values.selectedTreatments[treatment.id]?.checked && (
                          <Field
                            type="number"
                            name={
                              "selectedTreatments." + treatment.id + ".duration"
                            }
                          >
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Duración"
                                value={
                                  values.selectedTreatments[treatment.id]
                                    ?.duration || ""
                                }
                                onChange={(e) => {
                                  // Validar que solo se ingresen números positivos
                                  const value = Math.max(
                                    0,
                                    parseInt(e.target.value, 10) || 0
                                  );
                                  setFieldValue(
                                    "selectedTreatments." +
                                      treatment.id +
                                      ".duration",
                                    value
                                  );
                                }}
                                sx={{ marginTop: "1rem" }}
                              />
                            )}
                          </Field>
                        )}
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                container
                rowSpacing={1}
                spacing={2}
                marginY={1}
                alignItems="center"
                justifyContent="center"
              >
                <Button type="submit" variant="contained" color="primary">
                  Crear Receta
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RecipeForm;
