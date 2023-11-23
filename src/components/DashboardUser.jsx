import { useSelector } from "react-redux";

const DashboardUser = () => {
  const { typeUser } = useSelector((state) => state.user);

  return (
    <>
      <h1>La sesion es de un {typeUser}</h1>
      {typeUser === "patient" ? null : typeUser === "doctor" ? null : null}
    </>
  );
};

export default DashboardUser;
