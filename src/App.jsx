import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/Home";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import DashboardUser from "./components/DashboardUser";
import AppointmentForm from "./components/AppointmentForm";
//import FormRegister from "./FormRegister";

const App = () => {
  const { isLogged } = useSelector((state) => state.user);
  const { nss } = useSelector((state) => state.patient);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {isLogged ? (
            <>
              <Route path="/dashboard" element={<DashboardUser />} />
              <Route
                path="/dashboard/create"
                element={<AppointmentForm nss={nss} />}
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
