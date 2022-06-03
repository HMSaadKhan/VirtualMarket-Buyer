/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import buyerService from "../../Services/BuyerService";
import cityService from "../../Services/CityService";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Auth from "../../AuthWrapper/IsLoginFalse";
import {
  Card,
  CardContent,
  TextField,
  Box,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { CardHeadings, HeadingText } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";
import { MarginBox } from "../../Styles/StyledBox";
import LoadingScreen from "../../Components/LoadingScreen";
const BuyerAccount = (props) => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState("");
  const [verified, setVerified] = useState(true);
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);
  const [cities, setcities] = useState([]);
  const [loading, setloading] = useState(false);
  const [avatar, setavatar] = useState();
  const [image, setImage] = useState();

  const getData = () => {
    setloading(true);
    buyerService
      .getUserDetails()
      .then((data) => {
        console.log(data);
        setloading(false);
        setfName(data.fName);
        setlName(data.lName);
        setCity(data.city ? data.city._id : "");
        setEmail(data.email);
        setAddress(data.address);
        setphone(data.phone);
        setVerified(data.emailVerified);
        setavatar(data.avatar);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };

  useEffect(getData, [verified]);

  const getCities = () => {
    cityService.GetCities().then((data) => {
      setcities(data);
    });
  };
  React.useEffect(getCities, []);
  const selectChange = (e) => {
    setCity(e.target.value);
  };

  const send = async (event) => {
    setloading(true);
    const data = new FormData();
    data.append("image", image);
    await buyerService
      .AddAvatar(data)
      .then((data) => {
        setloading(false);
        console.log(data);
        getData();
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <Auth>
      <LoadingScreen bool={loading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <Box m={1}>
          <Card sx={{ maxWidth: 900 }}>
            <CardContent>
              <CardHeadings align="left">User Profile</CardHeadings>
              {!verified ? (
                <div>
                  <MarginBox>
                    <StyledButton
                      onClick={() => {
                        setCheck(true);
                        buyerService
                          .verificationOTP()
                          .then((res) => {
                            toast.success(res.data, {
                              position: toast.POSITION.BOTTOM_LEFT,
                            });
                            setCheck(true);
                          })
                          .catch((err) => {
                            toast.error(err.response.data, {
                              position: toast.POSITION.BOTTOM_LEFT,
                            });
                          });
                      }}
                    >
                      Verify Account
                    </StyledButton>
                  </MarginBox>
                </div>
              ) : (
                <div></div>
              )}
              {check ? (
                <MarginBox>
                  <MarginBox>
                    <TextField
                      label="Verification Code"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  </MarginBox>

                  <MarginBox>
                    <StyledButton
                      color="success"
                      variant="contained"
                      onClick={() => {
                        buyerService
                          .VerifyOtp({ otp })
                          .then((res) => {
                            toast.success(res.data, {
                              position: toast.POSITION.BOTTOM_LEFT,
                            });
                            setCheck(false);
                            getData();
                          })
                          .catch((err) => {
                            toast.error(err.response.data, {
                              position: toast.POSITION.BOTTOM_LEFT,
                            });
                          });
                      }}
                    >
                      Verify
                    </StyledButton>
                  </MarginBox>
                </MarginBox>
              ) : (
                <div></div>
              )}
              <MarginBox sx={{ display: "flex" }}>
                <Box>
                  <MarginBox sx={{ display: "flex" }}>
                    <MarginBox>
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
                    </MarginBox>
                    <MarginBox>
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
                    </MarginBox>
                  </MarginBox>
                  <MarginBox sx={{ display: "flex " }}>
                    <MarginBox>
                      <TextField
                        variant="standard"
                        disabled
                        label="Email"
                        placeholder="Email"
                        helperText="example@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </MarginBox>
                    <MarginBox>
                      <TextField
                        variant="standard"
                        label="Phone Number"
                        placeholder="Phone Number"
                        helperText="03XXXXXXXXX"
                        size="small"
                        value={phone}
                        onChange={(e) => {
                          setphone(e.target.value);
                        }}
                      />
                    </MarginBox>
                  </MarginBox>
                  <MarginBox sx={{ display: "flex ", alignItems: "center" }}>
                    <MarginBox>
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
                    </MarginBox>
                    <MarginBox>
                      <TextField
                        variant="standard"
                        label="Address"
                        multiline
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </MarginBox>
                  </MarginBox>
                </Box>
                <MarginBox>
                  <MarginBox>
                    <img height="200" weight="200" src={avatar} />

                    <form>
                      <>
                        <label htmlFor="file"></label>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </>
                    </form>
                  </MarginBox>
                  <MarginBox>
                    <StyledButton
                      variant="contained"
                      onClick={() => {
                        send();
                      }}
                    >
                      Update Image
                    </StyledButton>
                  </MarginBox>
                </MarginBox>
              </MarginBox>
              <MarginBox sx={{ display: "flex" }}>
                <MarginBox>
                  <StyledButton
                    variant="contained"
                    onClick={(e) => {
                      buyerService
                        .editUserDetails({ fName, lName, phone, address, city })
                        .then((data) => {
                          console.log(data);

                          toast.success(data.data, {
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
                </MarginBox>
                <MarginBox>
                  <StyledButton
                    variant="contained"
                    onClick={(e) => {
                      props.history.push("/changepassword");
                    }}
                  >
                    Change Password
                  </StyledButton>
                </MarginBox>
              </MarginBox>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Auth>
  );
};

export default BuyerAccount;
