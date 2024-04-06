import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AuthCard from "./components/auth-card";

export default function AuthPage() {
  return (
    <Box
      height="100%"
      flexGrow={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Container maxWidth="sm" sx={{ height: "100%" }}>
        <Box sx={{ height: "100%", display: "grid", placeContent: "center" }}>
          <AuthCard />
        </Box>
      </Container>
    </Box>
  );
}
