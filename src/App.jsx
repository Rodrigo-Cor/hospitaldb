import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/Home";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import DashboardUser from "./components/DashboardUser";
import AppointmentForm from "./components/AppointmentForm";
import RecipeInformation from "./components/RecipeInformation";
import RecipeForm from "./components/RecipeForm";
import DeleteConsultoryForm from "./components/DeleteConsultoryForm";
import TestComponent from "./components/TestComponent";
//import FormRegister from "./FormRegister";

const App = () => {
  const { isLogged } = useSelector((state) => state.user);
  const { nss } = useSelector((state) => state.patient);
  const id_citaRecipe = "5";
  const id_cita = "5";
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RecipeInformation" element={<RecipeInformation id_citaRecipe={id_citaRecipe} />} />
          <Route path="/RecipeForm" element={<RecipeForm id_cita={id_cita} />} />
          <Route path="/DeleteConsultoryForm" element={<DeleteConsultoryForm />} /> 
          <Route path="/login" element={<Login />} />
          {isLogged ? (
            <>
              <Route path="/dashboard" element={<DashboardUser />} />
              <Route
                path="/dashboard/create"
                element={<AppointmentForm nss={nss} />}
              />
              <Route
                path="/dashboard/recipe"
                element={<RecipeInformation id_citaRecipe={id_citaRecipe} />}
              />
              <Route
                path="/dashboard/DeleteConsultoryForm"
                element={<DeleteConsultoryForm />}
              />
            </>
          ) : (
            <Route path="/dashboard/*" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;