import { Box, Typography } from "@mui/material";
const Home = () => {
  return (
    <>
      <Box sx={{ m: "1rem" }}>
        <Typography variant="body1" gutterBottom>
          Bienvenido a la página de inicio del hospital {user}
        </Typography>
      </Box>
    </>
  );
};

export default Home;
