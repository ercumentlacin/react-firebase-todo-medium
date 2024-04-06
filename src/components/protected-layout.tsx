import { colors } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedLayout() {
  const user = localStorage.getItem("user");
  const { logout } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Grid
      container
      spacing={2}
      flexDirection={"column"}
      flexGrow={1}
      bgcolor={colors.grey["A200"]}
    >
      <Grid item xs={12} bgcolor={colors.grey["A100"]}>
        <Container maxWidth="md">
          <Box sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={"700"}
              fontSize={24}
            >
              Todo App
            </Typography>
            <Button variant="outlined" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
