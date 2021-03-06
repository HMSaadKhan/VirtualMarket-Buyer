/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import buyerService from "../../Services/BuyerService";
import cityService from "../../Services/CityService";

import { toast } from "react-toastify";
import Auth from "../../AuthWrapper/IsLoginFalse";
import {
  Card,
  CardContent,
  TextField,
  Box,
  Select,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { CardHeadings } from "../../Styles/MyTypographies";
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
  const [cities, setcities] = useState([]);
  const [loading, setloading] = useState(false);
  const [avatar, setavatar] = useState();
  const [image, setImage] = useState();
  const [saveButton, setsaveButton] = useState(true);

  const getData = () => {
    setloading(true);
    buyerService
      .getUserDetails()
      .then((data) => {
        setsaveButton(true);
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
        setImage(null);
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
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "70%",
              md: "70%",
              lg: "50%",
              xl: "50%",
            },
          }}
        >
          <Card>
            <CardContent sx={{}}>
              <CardHeadings align="left">User Profile</CardHeadings>
              {!verified ? (
                <div>
                  <Box mb={1}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("click");
                        buyerService
                          .verificationOTP()
                          .then((res) => {
                            console.log(res);
                            toast.success(res, {
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
                      Verify Account
                    </Button>
                  </Box>
                </div>
              ) : (
                <div></div>
              )}

              <Box sx={{ display: { xs: "inline", md: "none" } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <img height="100" weight="100" src={avatar} />
                  <Box>
                    <form>
                      <>
                        <label htmlFor="file"></label>
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </>
                    </form>

                    <StyledButton
                      disabled={image ? false : true}
                      variant="contained"
                      onClick={() => {
                        send();
                      }}
                    >
                      Update Image
                    </StyledButton>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <MarginBox>
                        <TextField
                          variant="standard"
                          label="First Name"
                          placeholder="First Name"
                          size="small"
                          value={fName}
                          onChange={(e) => {
                            setfName(e.target.value);
                            setsaveButton(false);
                          }}
                        />
                      </MarginBox>

                      <MarginBox>
                        <FormControl sx={{ width: "100px" }}>
                          <InputLabel variant="standard">City</InputLabel>

                          <Select
                            variant="standard"
                            value={city}
                            onChange={(e) => {
                              selectChange(e);
                              setsaveButton(false);
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
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <MarginBox>
                        <TextField
                          variant="standard"
                          label="Last Name"
                          placeholder="Last Name"
                          size="small"
                          value={lName}
                          onChange={(e) => {
                            setlName(e.target.value);
                            setsaveButton(false);
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
                            setsaveButton(false);
                          }}
                        />
                      </MarginBox>
                    </Box>
                  </Box>
                  <MarginBox>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      label="Email"
                      placeholder="Email"
                      helperText="example@example.com"
                      value={email}
                    />
                  </MarginBox>
                  <MarginBox>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Address"
                      multiline
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setsaveButton(false);
                      }}
                    />
                  </MarginBox>
                </Box>
                <Box sx={{ display: { xs: "none", md: "inline" } }}>
                  <Box sx={{ width: "100%" }}>
                    <Box>
                      <Box>
                        <img height="200" weight="200" src={avatar} />

                        <form>
                          <>
                            <label htmlFor="file"></label>
                            <input
                              type="file"
                              id="file"
                              accept="image/*"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            />
                          </>
                        </form>
                        <MarginBox>
                          <StyledButton
                            disabled={image ? false : true}
                            variant="contained"
                            onClick={() => {
                              send();
                            }}
                          >
                            Update Image
                          </StyledButton>
                        </MarginBox>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <MarginBox sx={{ display: "flex" }}>
                <MarginBox>
                  <Button
                    disabled={saveButton}
                    variant="contained"
                    onClick={(e) => {
                      buyerService
                        .editUserDetails({
                          fName,
                          lName,
                          phone,
                          address,
                          city,
                        })
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
                  </Button>
                </MarginBox>
                <MarginBox>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      props.history.push("/changepassword");
                    }}
                  >
                    Change Password
                  </Button>
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
