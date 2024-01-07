import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleAppointmentInformation } from "../reducers/doctorReducer";
import GroupButtonAppointment from "./GroupButtonAppointment";
import AppointmentDoctorInformation from "./AppointmentDoctorInformation";

const DoctorHome = () => {
  const { no_empleado } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      if (no_empleado === "") return;
      dispatch(handleAppointmentInformation({ no_empleado }));
    };
    fetchData();
  }, [no_empleado, dispatch]);

  return (
    <>
      <h1>Doctor Home</h1>
      <GroupButtonAppointment />
      <AppointmentDoctorInformation />
    </>
  );
};

export default DoctorHome;
