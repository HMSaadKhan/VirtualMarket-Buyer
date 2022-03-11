import { Password, WindowSharp } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import buyerService from "../Services/BuyerService";
import { Button, Box } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Auth from "../Components/AuthWrapper/Auth";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.imgur.com/KgQYNYv.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px;
  padding: 10px;
`;

const BuyerAccount = (props) => {
  const getData = () => {
    buyerService
      .getUserDetails()
      .then((data) => {
        console.log(data);
        setfName(data.fName);
        setlName(data.lName);
        setCity(data.city);
        setEmail(data.email);
        setAddress(data.address);
        setphone(data.phone);
        setVerified(data.verified);
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

  return (
    <Auth>
      <Container>
        <Wrapper>
          <Title>Account Details</Title>
          {!verified ? (
            <div>
              <Box ml={1}>
                <Button
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
                </Button>
              </Box>
            </div>
          ) : (
            <div></div>
          )}
          {check ? (
            <div>
              <Form>
                <Input
                  placeholder="Verification Code"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </Form>

              <Box ml={1}>
                <Button
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
                </Button>
              </Box>
            </div>
          ) : (
            <div></div>
          )}

          <Form>
            <Input
              placeholder="First Name"
              value={fName}
              onChange={(e) => {
                setfName(e.target.value);
              }}
            />
            <Input
              placeholder="Last Name"
              value={lName}
              onChange={(e) => {
                setlName(e.target.value);
              }}
            />
          </Form>
          <Form>
            <Input
              disabled
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
          </Form>
          <Form>
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Form>
          <Form>
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setfName(e.target.value);
              }}
            />
          </Form>
          <Box ml={1}>
            <Button
              color="success"
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
            </Button>
          </Box>
          <Box m={1}>
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
                props.history.push("/changepassword");
              }}
            >
              Change Password
            </Button>
          </Box>
        </Wrapper>
      </Container>
    </Auth>
  );
};

export default BuyerAccount;
