import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Navbar = () => {
  const { typeUser, isLogged } = useSelector((state) => state.user);
  const { nombreCompleto } = useSelector((state) => state.patient);
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
                    <RouterLink to="/dashboard/recipe">
                      <Button variant="body2">Ver recetas</Button>
                    </RouterLink>
                  </>
                ) : typeUser === "Medico" ? (
                  <>
                    <Typography variant="h6">
                      Secciones exclusivas del medico
                    </Typography>
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
                  <Typography variant="body1">
                    Bienvenido {nombreCompleto}
                  </Typography>
                </RouterLink>
                <Button variant="body1" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
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
