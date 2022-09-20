import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../redux/services/actions/loaderActions";
import { login } from "../redux/services/actions/authActions";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL_1 } from "../constants/urls";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Developed By "}
      <Link color="inherit" href="#">
        Rectangle Technologies
        {/* TODO: Add email */}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Home(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post(
        `${BASE_URL_1}/auth/login`,
        {
          username: data.get("username"),
          password: data.get("password"),
        },
      );
      props.login(response.data);
      props.removeLoader();
      navigate("/dashboard");
    } catch (err) {
      console.log(err)
      enqueueSnackbar(err?.response?.data?.message || "Could not login", {
        variant: "error",
        autoHideDuration: 3000,
      });
      props.removeLoader();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            borderRadius: "8px",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <img
            src="/loan.png"
            alt="Loan image"
            style={{
              maxWidth: "120px",
            }}
          />
          <Typography component="h1" variant="h5">
            Laxmi Kala Finance
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => props.addLoader()}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, login, removeLoader }
)(Home);
