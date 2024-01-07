import { Typography } from "@mui/material";
import { string } from "prop-types";

const StatusError = ({ error }) => {
  StatusError.propTypes = {
    error: string.isRequired,
  };

  return (
    <Typography variant="body2" color="error">
      {error}
    </Typography>
  );
};

export default StatusError;
