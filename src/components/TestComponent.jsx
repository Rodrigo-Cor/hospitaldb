import { string } from "prop-types";
import { useLocation } from "react-router-dom";

const TestComponent = (data) => {
   const location = useLocation();
  TestComponent.propTypes = {
    data: string.isRequired,
  };

  return <div>{location.state.data}</div>;
};

export default TestComponent;
