import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { localStorage } from "../../../lib/local-storage";

const StyledCard = styled(Card)(
  ({ theme }) => `
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(4)};
`
);

const StyledButton = styled(Button)(
  ({ theme }) => `
  border-radius: ${theme.shape.borderRadius}px;
`
);

export default function AuthCard() {
  const { login } = useAuth();
  const isLogin = localStorage.has("user");

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign in to Firebase React Todo App
        </Typography>
      </CardContent>
      <CardActions>
        <StyledButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={login}
          startIcon={<GoogleIcon />}
        >
          Login
        </StyledButton>
      </CardActions>
    </StyledCard>
  );
}
