import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { typeUser, isLogged } = useSelector((state) => state.user);
  const { nombreCompleto: nombre_paciente } = useSelector(
    (state) => state.patient
  );
  const { nombreCompleto: nombre_medico } = useSelector(
    (state) => state.doctor
  );
  const { nombreCompleto: nombre_recepcionista } = useSelector(
    (state) => state.recepcionist
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <RouterLink to="/">
                <Button variant="body1">Hospital</Button>
              </RouterLink>
            </Typography>
            {isLogged && (
              <>
                <RouterLink to="/dashboard">
                  <Typography variant="body2">
                    {typeUser === "Paciente"
                      ? nombre_paciente
                      : typeUser === "Medico"
                      ? nombre_medico
                      : nombre_recepcionista}
                  </Typography>
                </RouterLink>
                <Button variant="body1" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List sx={{ backgroundColor: "black" }}>
          <ListItem onClick={handleDrawerClose}>
            <RouterLink to="/">
              <ListItemText primary="Hospital" />
            </RouterLink>
          </ListItem>
          {isLogged && typeUser === "Paciente" && (
            <ListItem onClick={handleDrawerClose}>
              <RouterLink to="/dashboard/create">
                <ListItemText primary="Agendar citas" />
              </RouterLink>
            </ListItem>
          )}
          {isLogged && typeUser !== "Paciente" && typeUser !== "Medico" && (
            <>
              <ListItem onClick={handleDrawerClose}>
                <RouterLink to="/dashboard/deleteConsultoryForm">
                  <ListItemText primary="Dar de baja consultorios" />
                </RouterLink>
              </ListItem>
              <ListItem onClick={handleDrawerClose}>
                <RouterLink to="/dashboard/deleteDoctorForm">
                  <ListItemText primary="Dar de baja médicos" />
                </RouterLink>
              </ListItem>
              <ListItem onClick={handleDrawerClose}>
                <RouterLink to="/dashboard/deletePatientForm">
                  <ListItemText primary="Dar de baja pacientes" />
                </RouterLink>
              </ListItem>
              <ListItem onClick={handleDrawerClose}>
                <RouterLink to="/dashboard/registerPatientForm">
                  <ListItemText primary="Dar de alta pacientes" />
                </RouterLink>
              </ListItem>
              <ListItem onClick={handleDrawerClose}>
                <RouterLink to="/dashboard/registerDoctorForm">
                  <ListItemText primary="Dar de alta médicos" />
                </RouterLink>
              </ListItem>
            </>
          )}
          {!isLogged && (
            <ListItem onClick={handleDrawerClose}>
              <RouterLink to="/login">
                <ListItemText primary="Login" />
              </RouterLink>
            </ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Navbar;
