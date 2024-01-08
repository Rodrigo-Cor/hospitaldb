import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RegisterDoctorForm from './RegisterDoctorForm';
import RegisterPatientForm from './RegisterPatientForm';

const RegisterForms = () => {
  return (
    <>
      <Box margin={5}>
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
              Registro de Médicos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RegisterDoctorForm />
          </AccordionDetails>
        </Accordion>

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
              Registro de Pacientes
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RegisterPatientForm />
          </AccordionDetails>

        </Accordion>
      </Box>
    </>
  );
};

export default RegisterForms;
