import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { typeUser, isLogged } = useSelector((state) => state.user);
  const { nombreCompleto: nombre_paciente } = useSelector(
    (state) => state.patient
  );
  const { nombreCompleto: nombre_medico } = useSelector(
    (state) => state.doctor
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <RouterLink to="/">
                <Button variant="body1">Hospital</Button>
              </RouterLink>
            </Typography>
            {isLogged ? (
              <>
                {typeUser === "Paciente" ? (
                  <>
                    <RouterLink to="/dashboard/create">
                      <Button variant="body2">Agendar citas</Button>
                    </RouterLink>
                  </>
                ) : typeUser === "Medico" ? (
                  <>
                    {/*
                    <Typography variant="h6">
                      Secciones exclusivas del medico
                </Typography>
                */}
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      Secciones exclusivas de recepcionista
                    </Typography>
                    <RouterLink to="/dashboard/DeleteConsultoryForm">
                      <Button variant="body2">Dar de baja consultorios</Button>
                    </RouterLink>
                  </>
                )}
                <RouterLink to="/dashboard">
                  <Typography variant="body2">
                    {typeUser === "Paciente"
                      ? nombre_paciente
                      : typeUser === "Medico"
                      ? nombre_medico
                      : nombre_medico}
                  </Typography>
                </RouterLink>
              </>
            ) : (
              <RouterLink to="/login">
                <Button variant="body1">Login</Button>
              </RouterLink>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
