import React from "react";
import { styled } from "@mui/material/styles";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import userService from "../../Services/BuyerService";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

const BuyerAccount = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setCPassword] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");

  const StyledButton = styled(Button)({
    width: "100%",
    color: "#ffff",
    backgroundColor: "#ba6a62",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#C78781",
      color: "#fafafa",
    },
  });
  const StyledBox = styled(Box)({
    display: "flex",
    margin: "10px",
  });
  const ContainerBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
  });

  const Wrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
  });

  return (
    <>
      <ContainerBox>
        <Box m={1}>
          <Card sx={{ maxWidth: "100%", minWidth: "40%" }}>
            <CardContent>
              <Wrapper>
                <Typography
                  sx={{
                    color: "#ba6a62",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  SignUp
                </Typography>
              </Wrapper>

              <StyledBox>
                <Box>
                  <TextField
                    variant="standard"
                    label="First Name"
                    value={fName}
                    onChange={(e) => {
                      setfName(e.target.value);
                    }}
                  />
                </Box>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="Last Name"
                    placeholder="Last Name"
                    size="small"
                    defaultValue={lName}
                    onChange={(e) => {
                      setlName(e.target.value);
                    }}
                  />
                </StyledBox>
              </StyledBox>
              <StyledBox sx={{ display: "flex " }}>
                <StyledBox sx={{ width: "100%" }}>
                  <TextField
                    variant="standard"
                    size="small"
                    label="Email"
                    fullWidth
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </StyledBox>
              </StyledBox>
              <StyledBox sx={{ display: "flex ", alignItems: "center" }}>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="Password"
                    placeholder="Password"
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </StyledBox>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    size="small"
                    onChange={(e) => {
                      setCPassword(e.target.value);
                    }}
                  />
                </StyledBox>
              </StyledBox>
              <StyledBox>
                <StyledBox sx={{ width: "95%" }}>
                  <StyledButton
                    variant="contained"
                    onClick={(e) => {
                      userService
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
                    Sign Up
                  </StyledButton>
                </StyledBox>
                <StyledBox>
                  <Typography>
                    Already Have an account? <Link to="/Login">Login</Link>
                  </Typography>
                </StyledBox>
              </StyledBox>
            </CardContent>
          </Card>
        </Box>
      </ContainerBox>
    </>
  );
};

export default BuyerAccount;
