import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        virtualmarket
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#eeeeee", height: "200px", width: "100%" }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box mt={5}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            VIRTUALMARKET
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="p"
            mb={2}
          >
            At your door step
          </Typography>
        </Box>
        <Box mt={5}>
          <Typography variant="h6">MENU</Typography>
          <Box>
            <Typography
              component={Link}
              href="/"
              variant="body2"
              color="text.secondary"
            >
              Home
            </Typography>
          </Box>
          <Box>
            <Typography
              component={Link}
              href="/orders"
              variant="body2"
              color="text.secondary"
            >
              Orders
            </Typography>
          </Box>
          <Box>
            <Typography
              component={Link}
              href="/warranty/ACTIVE"
              variant="body2"
              color="text.secondary"
            >
              Warranties
            </Typography>
          </Box>
        </Box>
        <Box mt={5}>
          <Typography variant="h6">Contact Us</Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              mt={5}
              type="text"
              defaultValue="virtualmarket@gmail.com"
              variant="outlined"
              inputProps={{ readOnly: true }}
            />
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          marginTop: "30px",
          alignSelft: "flex-end",
          justifyContent: "center",
        }}
      >
        <Copyright />
      </Box>
    </Box>
  );
}

export default Footer;
