import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import userService from "../../Services/BuyerService";
import { toast } from "react-toastify";
import { bgcolor } from "@mui/system";
import styled from "styled-components";

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
  width: 35%;
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
  flex-direction: column;F
`;

const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setCPassword] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");

  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>Sign Up</Title>
          <Input
            placeholder="First name"
            value={fName}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
          <Input
            placeholder="Last name"
            value={lName}
            onChange={(e) => {
              setlName(e.target.value);
            }}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button
            color="success"
            variant="contained"
            onClick={(e) => {
              userService
                .register({ fName, lName, email, password, confirmPassword })
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
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
