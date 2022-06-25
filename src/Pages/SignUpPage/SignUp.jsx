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
import { FlexBox } from "../../Styles/StyledBox";
import LoadingScreen from "../../Components/LoadingScreen";

const Signup = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setCPassword] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const SignupFunction = () => {
    setloading(true);
    buyerService
      .register({
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        toast.success("Signup Successfull", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setloading(false);
        props.history.push("/login");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setloading(false);
      });
  };

  return (
    <LoginAuth>
      <Box>
        <LoadingScreen bool={loading} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <>
            <Card sx={{ maxWidth: 350, minWidth: 350, padding: "20px" }}>
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
                {/* <FlexBox>
                  <FlexBox m={1}>
                    <TextField
                      fullWidth
                      id="filled-required"
                      label="First Name"
                      placeholder="Ahmad"
                      variant="standard"
                      defaultValue={fName}
                      onChange={(e) => {
                        setfName(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          SignupFunction();
                          // write your functionality here
                        }
                      }}
                    />
                  </FlexBox>
                  <FlexBox m={1}>
                    <TextField
                      fullWidth
                      id="filled-required"
                      label="Last Name"
                      placeholder="khan"
                      variant="standard"
                      defaultValue={lName}
                      onChange={(e) => {
                        setlName(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          SignupFunction();
                          // write your functionality here
                        }
                      }}
                    />
                  </FlexBox>
                </FlexBox> */}

                <FlexBox m={1}>
                  <TextField
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
                        SignupFunction();
                        // write your functionality here
                      }
                    }}
                  />
                </FlexBox>
                <FlexBox sx={{ alignItems: "start" }}>
                  <FlexBox m={1}>
                    <TextField
                      fullWidth
                      label="Password"
                      helperText=" Atleast 5 character long"
                      variant="standard"
                      type="password"
                      defaultValue={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          SignupFunction();
                          // write your functionality here
                        }
                      }}
                    />
                  </FlexBox>
                  <FlexBox m={1}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      variant="standard"
                      defaultValue={confirmPassword}
                      onChange={(e) => {
                        setCPassword(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          SignupFunction();
                          // write your functionality here
                        }
                      }}
                    />
                  </FlexBox>
                </FlexBox>

                <Box>
                  <Box m={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={SignupFunction}
                    >
                      signup
                    </Button>
                  </Box>
                  <Box m={1}>
                    <Typography>
                      Already Have an account? <Link to="/Login">Login</Link>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </>
        </Box>
      </Box>
    </LoginAuth>
  );
};

export default Signup;
