import { Box, Button } from "@mui/material";
import AppointmentInformation from "./AppointmentInformation";

import useAppointmentPatient from "../hooks/useAppointmentPatient";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const PatientHome = () => {
  const {handleClick} = useAppointmentPatient();
  const { filterAppointment } = useSelector((state) => state.filterAppointment);

  const { loading } = useSelector((state) => state.patient);

  if (loading) {
    return <div>Cargando citas...</div>;
  }

  return (
    <>
      <h1>Patient Home</h1>
      <Box
        sx={{ m: "1rem" }}
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Button
          variant="outlined"
          sx={{ m: "0.5rem" }}
          style={{
            backgroundColor: filterAppointment === "today" && "#b2dfdb",
          }}
          onClick={() => handleClick("today")}
        >
          Citas de HOY {dayjs().tz("America/Mexico_City").format("DD-MM-YYYY")}
        </Button>

        <Button
          variant="outlined"
          sx={{ m: "0.5rem" }}
          style={{
            backgroundColor: filterAppointment === "pending" && "#64b5f6",
          }}
          onClick={() => handleClick("pending")}
        >
          Citas proximas
        </Button>

        <Button
          variant="outlined"
          sx={{ m: "0.5rem" }}
          style={{
            backgroundColor: filterAppointment === "past" && "#ef9a9a",
          }}
          onClick={() => handleClick("past")}
        >
          Citas pasadas
        </Button>

        <Button
          variant="outlined"
          sx={{ m: "0.5rem" }}
          style={{
            backgroundColor: filterAppointment === "cancel" && "#ffb74d",
          }}
          onClick={() => handleClick("cancel")}
        >
          Citas canceladas
        </Button>

        <Button
          variant="outlined"
          sx={{ m: "0.5rem" }}
          style={{
            backgroundColor: filterAppointment === "all" && "#fff59d",
          }}
          onClick={() => handleClick("all")}
        >
          Mostrar todo
        </Button>
      </Box>
      <AppointmentInformation />
    </>
  );
};

export default PatientHome;
