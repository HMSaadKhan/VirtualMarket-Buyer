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

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fname, setfName] = React.useState("");
  const [lname, setlName] = React.useState("");

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name"
            value={fname}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
          <Input
            placeholder="last name"
            value={lname}
            onChange={(e) => {
              setlName(e.target.value);
            }}
          />
          <Input placeholder="username" />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            placeholder="confirm password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button
            onClick={(e) => {
              userService
                .register(fname, email, password)
                .then(() => {
                  toast.success("Signup Successfull", {
                    position: toast.POSITION.TOP_LEFT,
                  });
                  props.history.push("/login");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error(err.response.data, {
                    position: toast.POSITION.TOP_LEFT,
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
