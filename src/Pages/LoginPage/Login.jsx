import React from "react";
import {
  TextField,
  Card,
  Box,
  Typography,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginAuth from "../../AuthWrapper/isLoginTrue";
import buyerService from "../../Services/BuyerService";
const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const direct = () => {
    window.location.href = "/";
  };

  const LoginFunction = async (e) => {
    await buyerService
      .login(email, password)
      .then((data) => {
        setTimeout(direct, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <LoginAuth>
      <Box>
        <Box
          // sx={{ paddingLeft: "40%", paddingTop: "5%", paddingBottom: "5%" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Card sx={{ maxWidth: 300, padding: "20px" }}>
            <CardContent>
              <Typography
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#ba6a62",
                  fontSize: "30px",
                }}
              >
                Virtual Market
              </Typography>
              <Divider />
              <Typography
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#ba6a62",
                  fontSize: "25px",
                }}
              >
                SIGN IN
              </Typography>
              <Box sx={{}}>
                <>
                  <TextField
                    required
                    fullWidth
                    id="filled-required"
                    label="Email"
                    helperText="example@example.com"
                    variant="standard"
                    defaultValue={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        LoginFunction();
                        // write your functionality here
                      }
                    }}
                  />
                </>
                <>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    autoComplete="current-password"
                    defaultValue={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        LoginFunction();
                        // write your functionality here
                      }
                    }}
                  />
                </>
                <Box mt={2}>
                  <Button fullWidth variant="contained" onClick={LoginFunction}>
                    LOGIN
                  </Button>
                </Box>
                <Box mt={1}>
                  <Typography>
                    Don't have an account? <Link to="/signup">SignUp</Link>
                  </Typography>
                  <Link to="/forgotpassword">Forgot Password</Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </LoginAuth>
  );
};

export default Login;
