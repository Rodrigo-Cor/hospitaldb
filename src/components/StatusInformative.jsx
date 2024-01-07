import { Typography } from "@mui/material";
import { string } from "prop-types";

const StatusInformative = ({ information }) => {
  StatusInformative.propTypes = {
    information: string.isRequired,
  };

  return (
    <Typography variant="body2" >
      {information}
    </Typography>
  );
};

export default StatusInformative;
