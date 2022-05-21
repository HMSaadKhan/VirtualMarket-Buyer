import React from "react";
import {
  TextField,
  Card,
  Box,
  Typography,
  CardContent,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginAuth from "../../AuthWrapper/isLoginTrue";
import buyerService from "../../Services/BuyerService";
import { FlexBox } from "../../Styles/StyledBox";
import { StyledButton } from "../../Styles/StyledButton";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setCPassword] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");

  return (
    <LoginAuth>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <Card sx={{ maxWidth: 400, padding: "20px" }}>
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
                SIGN UP
              </Typography>
              <FlexBox>
                <FlexBox m={1}>
                  <TextField
                    fullWidth
                    id="filled-required"
                    label="First Name"
                    variant="standard"
                    defaultValue={fName}
                    onChange={(e) => {
                      setfName(e.target.value);
                    }}
                  />
                </FlexBox>
                <FlexBox m={1}>
                  <TextField
                    fullWidth
                    id="filled-required"
                    label="Last Name"
                    variant="standard"
                    defaultValue={lName}
                    onChange={(e) => {
                      setlName(e.target.value);
                    }}
                  />
                </FlexBox>
              </FlexBox>

              <FlexBox m={1}>
                <TextField
                  fullWidth
                  id="filled-required"
                  label="Email"
                  variant="standard"
                  defaultValue={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FlexBox>
              <FlexBox>
                <FlexBox m={1}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="standard"
                    type="password"
                    defaultValue={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FlexBox>
                <FlexBox>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="standard"
                    defaultValue={confirmPassword}
                    onChange={(e) => {
                      setCPassword(e.target.value);
                    }}
                  />
                </FlexBox>
              </FlexBox>

              <Box>
                <Box m={1}>
                  <StyledButton
                    sx={{ width: "100%", margin: 0 }}
                    variant="contained"
                    onClick={(e) => {
                      buyerService
                        .register({
                          fName,
                          lName,
                          email,
                          password,
                          confirmPassword,
                        })
                        .then((res) => {
                          toast.success("Signup Successfull", {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                          props.history.push("/login");
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        });
                    }}
                  >
                    signup
                  </StyledButton>
                </Box>
                <Box m={1}>
                  <Typography>
                    Already Have an account? <Link to="/Login">Login</Link>
                  </Typography>
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
