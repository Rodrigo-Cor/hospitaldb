import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAppointmentInformation } from "../reducers/patientReducer";
import { handleFilter } from "../reducers/filterAppointmentReducer";


const useAppointmentPatient = () => {
  const { nss } = useSelector((state) => state.patient);
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (filterType) => {
      dispatch(handleFilter(filterType));
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(handleAppointmentInformation({ nss }));
    };
    fetchData();
  }, [dispatch, nss]);
  

  return { handleClick };

};

export default useAppointmentPatient;
