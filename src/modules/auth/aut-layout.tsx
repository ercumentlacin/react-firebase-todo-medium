import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const StyledContainer = styled(Container)(
  () => `
  height: 100%;
`
);

export default function AuthLayout() {
  return (
    <Box
      height="100%"
      flexGrow={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <StyledContainer maxWidth="sm">
        <Box
          height="100%"
          flexGrow={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Outlet />
        </Box>
      </StyledContainer>
    </Box>
  );
}
