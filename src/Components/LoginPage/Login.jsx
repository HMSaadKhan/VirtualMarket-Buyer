import React from "react";
import {
  TextField,
  Button,
  Card,
  Box,
  Typography,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginAuth from "../AuthWrapper/LoginAuth";
import buyerService from "../../Services/BuyerService";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const direct = () => {
    window.location.href = "/";
  };
  return (
    <LoginAuth>
      <Box>
        <Box
          // sx={{ paddingLeft: "40%", paddingTop: "5%", paddingBottom: "5%" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <Card sx={{ width: "20%", padding: "20px" }}>
            <CardContent>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#ba6a62",
                  fontSize: "30px",
                  marginLeft: "25%",
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
                    variant="standard"
                    defaultValue={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                  />
                </>
                <Box mt={2}>
                  <Button
                    sx={{
                      color: "#ffff",
                      backgroundColor: "#ba6a62",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ba6a67",
                        color: "#fafafa",
                      },
                    }}
                    variant="contained"
                    onClick={async (e) => {
                      await buyerService
                        .login(email, password)
                        .then((data) => {
                          console.log(data);
                          toast.success("Login Successfull", {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                          setTimeout(direct, 1000);
                        })
                        .catch((err) => {
                          toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        });
                    }}
                  >
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
