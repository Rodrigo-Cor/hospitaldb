import {
  Typography,
  CardContent,
  Container,
  Grid,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const RecipeInformation = () => {
  const location = useLocation();
  const { recipeData } = location.state;

  const { typeUser } = useSelector((state) => state.user);

  const {
    dataRecipe,
    dataRecipeMedicine,
    costoTotalMedicamentos,
    dataRecipeServices,
    costoTotalServicios,
    dataRecipeTreatments,
  } = recipeData;

  const {
    recipeId,
    diagnostico,
    patient,
    nss,
    fecha_hora_inicio,
    fecha_hora_final,
    no_empleado,
    consultorio,
    doctor,
    especialidad,
  } = dataRecipe;

  const d1 = dayjs.utc(fecha_hora_inicio).tz("America/Mexico_City");
  const d2 = dayjs.utc(fecha_hora_final).tz("America/Mexico_City");

  return (
    <>
      <Accordion>
        <Box margin={5}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Receta Médica No.{recipeId}
            </Typography>
            <Container maxWidth="md">
              <Grid container rowSpacing={1} spacing={2} marginY={1}>
                {typeUser === "Medico" && (
                  <>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        <strong>NSS: </strong> {nss}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        <strong>Paciente: </strong>
                        {patient}
                      </Typography>
                    </Grid>
                  </>
                )}
                {typeUser === "Paciente" && (
                  <>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        <strong>Número de empleado: </strong> {no_empleado}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        <strong>Consultorio: </strong> {consultorio}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        <strong>Médico: </strong> {doctor}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        <strong>Especialidad: </strong> {especialidad}
                      </Typography>
                    </Grid>
                  </>
                )}
                <Grid item xs={6} md={6}>
                  <Typography variant="body1">
                    <strong>Fecha: </strong> {d1.format("DD-MM-YYYY")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="body1">
                    <strong>Hora de la cita: </strong> {d1.format("hh:mm a")} -{" "}
                    {d2.format("hh:mm a")}
                  </Typography>
                </Grid>
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <Typography
                    variant="body1"
                    paragraph
                    style={{ textAlign: "justify" }}
                  >
                    <strong>Diagnóstico: </strong> {diagnostico}
                  </Typography>
                </Grid>
              </Grid>
            </Container>

            {dataRecipeTreatments && dataRecipeTreatments.length > 0 ? (
              <Accordion
                sx={{
                  color: "#f5f5f5",
                  backgroundColor: "#1e88e5",
                  marginBottom: "2rem",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "1rem" }}
                  >
                    Tratamientos recetados
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Duración (días)
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Descripción
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataRecipeTreatments.map((treatment, index) => (
                          <TableRow key={index}>
                            <TableCell
                              style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {treatment.duracion}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              {treatment.descripcion}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ) : null}

            {dataRecipeMedicine && dataRecipeMedicine.length > 0 ? (
              <Accordion
                sx={{
                  color: "#f5f5f5",
                  backgroundColor: "#1e88e5",
                  marginBottom: "2rem",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "1rem" }}
                  >
                    Medicamentos recetados
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Cantidad
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Nombre
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Descripción
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Costo unitario
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Costo total
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataRecipeMedicine.map((medicine, index) => (
                          <TableRow key={index}>
                            <TableCell
                              style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {medicine.cantidad_medicamento}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              {medicine.nombre}
                            </TableCell>
                            <TableCell style={{ fontSize: "1rem" }}>
                              {medicine.descripcion}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              ${medicine.costo.toFixed(2)}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              $
                              {(
                                medicine.costo * medicine.cantidad_medicamento
                              ).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="body1"
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Costo total de medicamentos: $
                    {costoTotalMedicamentos.toFixed(2)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : null}

            {dataRecipeServices && dataRecipeServices.length > 0 ? (
              <Accordion
                sx={{
                  color: "#f5f5f5",
                  backgroundColor: "#1e88e5",
                  marginBottom: "2rem",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "1rem" }}
                  >
                    Servicios utilizados
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Cantidad
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Nombre
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Costo unitario
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Costo total
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataRecipeServices.map((service, index) => (
                          <TableRow key={index}>
                            <TableCell
                              style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {service.cantidad_servicios}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              {service.nombre}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              ${service.costo.toFixed(2)}
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "1rem", textAlign: "center" }}
                            >
                              $
                              {(
                                service.costo * service.cantidad_servicios
                              ).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography
                    variant="body1"
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Costo total de servicios: ${costoTotalServicios.toFixed(2)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : null}
            <Box sx={{ p: 2, border: "dashed grey" }}>
              <Typography
                variant="body1"
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Costo total de receta (medicamentos + servicios): $
                {(costoTotalMedicamentos + costoTotalServicios).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Accordion>
    </>
  );
};

export default RecipeInformation;
