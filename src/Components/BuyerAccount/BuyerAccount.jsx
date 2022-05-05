import React, { useState, useEffect } from "react";
import buyerService from "../../Services/BuyerService";
import cityService from "../../Services/CityService";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Auth from "../AuthWrapper/Auth";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import MenuSideBar from "../MenuSideBar";

const BuyerAccount = (props) => {
  const getData = () => {
    buyerService
      .getUserDetails()
      .then((data) => {
        console.log(data);
        setfName(data.fName);
        setlName(data.lName);
        setCity(data.city._id);
        setEmail(data.email);
        setAddress(data.address);
        setphone(data.phone);
        setVerified(data.emailVerified);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getData, []);

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState("");
  const [verified, setVerified] = useState();
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);
  const [cities, setcities] = useState([]);

  const StyledButton = styled(Button)({
    color: "#ffff",
    backgroundColor: "#ba6a62",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#C78781",
      color: "#fafafa",
    },
  });
  const StyledBox = styled(Box)({
    margin: "10px",
  });
  const Container = styled(Box)({
    display: "flex",
    justifyContent: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
  });

  const Wrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
  });

  const getCities = () => {
    cityService
      .GetCities()
      .then((data) => {
        console.log(data);
        setcities(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getCities, []);
  const selectChange = (e) => {
    setCity(e.target.value);
  };
  return (
    <Auth>
      <Container>
        <Box>
          <MenuSideBar />
        </Box>
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
                  Account Details
                </Typography>
              </Wrapper>
              {!verified ? (
                <div>
                  <StyledBox>
                    <StyledButton
                      onClick={() => {
                        setCheck(true);
                        buyerService
                          .verificationOTP()
                          .then((res) => {
                            console.log(res);
                            setCheck(true);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Verify Account
                    </StyledButton>
                  </StyledBox>
                </div>
              ) : (
                <div></div>
              )}
              {check ? (
                <StyledBox>
                  <>
                    <TextField
                      size="small"
                      placeholder="Verification Code"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  </>

                  <StyledBox>
                    <StyledButton
                      color="success"
                      variant="contained"
                      onClick={() => {
                        buyerService
                          .VerifyOtp({ otp })
                          .then((res) => {
                            console.log(res);
                            setCheck(false);
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Verify
                    </StyledButton>
                  </StyledBox>
                </StyledBox>
              ) : (
                <div></div>
              )}

              <StyledBox sx={{ display: "flex" }}>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="First Name"
                    placeholder="First Name"
                    size="small"
                    value={fName}
                    onChange={(e) => {
                      setfName(e.target.value);
                    }}
                  />
                </StyledBox>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="Last Name"
                    placeholder="Last Name"
                    size="small"
                    value={lName}
                    onChange={(e) => {
                      setlName(e.target.value);
                    }}
                  />
                </StyledBox>
              </StyledBox>
              <StyledBox sx={{ display: "flex " }}>
                <StyledBox>
                  <TextField
                    variant="standard"
                    disabled
                    size="small"
                    label="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </StyledBox>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="Phone Number"
                    placeholder="Phone Number"
                    size="small"
                    value={phone}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                  />
                </StyledBox>
              </StyledBox>
              <StyledBox sx={{ display: "flex ", alignItems: "center" }}>
                <StyledBox>
                  <FormControl sx={{ width: 200 }}>
                    <InputLabel variant="standard">City</InputLabel>

                    <Select
                      variant="standard"
                      value={city}
                      onChange={(e) => {
                        selectChange(e);
                      }}
                    >
                      {cities.map((item) => (
                        <MenuItem key={item} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledBox>
                <StyledBox>
                  <TextField
                    variant="standard"
                    label="Address"
                    placeholder="Address"
                    value={address}
                    size="small"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </StyledBox>
              </StyledBox>
              <StyledBox sx={{ display: "flex" }}>
                <StyledBox>
                  <StyledButton
                    variant="contained"
                    onClick={(e) => {
                      buyerService
                        .editUserDetails({ fName, lName, phone, address, city })
                        .then((data) => {
                          console.log(data);

                          toast.success("Changes Saved Successfully", {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        });
                    }}
                  >
                    Save
                  </StyledButton>
                </StyledBox>
                <StyledBox>
                  <StyledButton
                    variant="contained"
                    onClick={(e) => {
                      props.history.push("/changepassword");
                    }}
                  >
                    Change Password
                  </StyledButton>
                </StyledBox>
              </StyledBox>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Auth>
  );
};

export default BuyerAccount;
