import { Password, WindowSharp } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import buyerService from "../Services/BuyerService";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

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
        setPassword(data.password);
        setVarified(data.varified);
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
  const [password, setPassword] = useState("");
  const [varified, setVarified] = useState();
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Title>Account Details</Title>
        <Button
          onClick={() => {
            setCheck(true);
          }}
        >
          Verify Account
        </Button>
        {check ? (
          <>
            {!varified ? (
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
                <Button color="success" variant="contained">
                  Press me
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <></>
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
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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

        <Button
          color="success"
          variant="contained"
          onClick={(e) => {
            buyerService
              .editUserDetails({ fName, lName, phone, address, city })
              .then((data) => {
                console.log(data);

                toast.error("Changes Saved Successfully", {
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
        <Button
          color="success"
          variant="contained"
          onClick={(e) => {
            props.history.push("/changepassword");
          }}
        >
          Save
        </Button>
      </Wrapper>
    </Container>
  );
};

export default BuyerAccount;
