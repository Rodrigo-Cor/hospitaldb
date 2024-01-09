import PatientHome from "./PatientHome";
import DoctorHome from "./DoctorHome";
import RecepcionistHome from "./RecepcionistHome";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const { typeUser } = useSelector((state) => state.user);

  return (
    <>
      {typeUser === "Paciente" ? (
        <PatientHome />
      ) : typeUser === "Medico" ? (
        <DoctorHome />
      ) : (
        <RecepcionistHome />
      )}
    </>
  );
};

export default DashboardUser;
