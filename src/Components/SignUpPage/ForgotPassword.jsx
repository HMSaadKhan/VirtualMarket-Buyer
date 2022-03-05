import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import userService from "../../Services/BuyerService";
import { toast } from "react-toastify";
import { bgcolor } from "@mui/system";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.imgur.com/KgQYNYv.jpg    ") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState("hello@123.com");
  const [otp, setOtp] = React.useState("");
  const [id, setId] = React.useState("");
  const history = useHistory();
  return (
    <Container>
      <Wrapper>
        <Title>Forgot Password</Title>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            userService
              .forgotPassword(email)
              .then((data) => {
                console.log(data._id);
                setId(data._id);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Send Email
        </Button>

        <Input
          placeholder="OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
        <Button>Confirm</Button>

        <Button onClick={()=>{history.push("/newpassword/"+id)}}>Next</Button>
      </Wrapper>
    </Container>  
  );
};

export default ForgotPassword;
