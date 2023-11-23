import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/Home";
import { useSelector } from "react-redux";
//import Navbar from "./Navbar";
import Login from "./components/Login";
import DashboardUser from "./components/DashboardUser";
//import FormRegister from "./FormRegister";
//import FormAppointment from "./FormAppointment";
//import { SessionContextProvider } from "../context/SessionContext";
//import { TypeUserContextProvider } from "../context/TypeUserContext";

const App = () => {
  const { isLogged } = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {isLogged ? (
            <>
              <Route path="/dashboard" element={<DashboardUser />} />
            </>
          ) : (
            <Route path="/dashboard/*" element={<Navigate to="/login" />} />
          )}
          {/*
          <Navbar />
          <Route path="/dashboard/create" element={<FormAppointment />} />
          
          */}

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
