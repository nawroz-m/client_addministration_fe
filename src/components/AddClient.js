import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState } from "react";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddClient() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [role, setRole] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [country, setCountry] = useState(null);
  const [postalcode, setPostalcode] = useState(0);
  const [telephone, setTelephone] = useState(0);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const signUpHandler = async (event) => {
    event.preventDefault();
    const userInfo = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: role,
      telephone: parseInt(telephone),
      PostalAddress: {
        city: city,
        street: street,
        country: country,
        postalcode: parseInt(postalcode),
      },
    };
    const response = await axios.post(
      "http://localhost:8090/api/register",
      userInfo
    );
    if (response && response.statusText === "OK" && response.data) {
      window.location.replace("/login");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Client
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name "
                name="firstname"
                autoComplete="firstname"
                autoFocus
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastname"
                label="Last Name"
                id="lastname"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={emailChangeHandler}
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
                onChange={passwordChangeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role "
                name="role"
                autoComplete="role"
                autoFocus
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="telephone"
                label="Telephone "
                name="telephone"
                autoComplete="telephone"
                type="number"
                onChange={(e) => {
                  setTelephone(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="street"
                label="Street"
                id="street"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                autoFocus
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="country"
                label="Country"
                id="country"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="postalcode"
                label="Postalcode"
                name="postalcode"
                autoComplete="postalcode"
                type="number"
                autoFocus
                onChange={(e) => {
                  setPostalcode(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signUpHandler}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
