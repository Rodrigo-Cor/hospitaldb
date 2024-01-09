import AppointmentInformation from "./AppointmentInformation";
import GroupButtonAppointment from "./GroupButtonAppointment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleAppointmentInformation } from "../reducers/patientReducer";

const PatientHome = () => {
  const { nss } = useSelector((state) => state.patient);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      if (nss === "") return;
      dispatch(handleAppointmentInformation({ nss }));
    };
    fetchData();
  }, [nss, dispatch]);

  return (
    <>
      <GroupButtonAppointment />
      <AppointmentInformation />
    </>
  );
};

export default PatientHome;
