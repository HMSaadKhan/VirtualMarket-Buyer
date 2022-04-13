import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Alert } from "@material-ui/core";
import buyerService from "../../Services/BuyerService";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoginAuth from "../AuthWrapper/LoginAuth";

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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  return (
    <LoginAuth>
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              color="success"
              variant="contained"
              onClick={async (e) => {
                await buyerService
                  .login(email, password)
                  .then((data) => {
                    console.log(data);
                    toast.success("Login Successfull", {
                      position: toast.POSITION.BOTTOM_LEFT,
                    });
                    window.location.href = "/";
                    //history.push("/");
                    // setTimeout(() => {
                    //   history.push("/");
                    // }, 100);
                  })
                  .catch((err) => {
                    toast.error(err.response.data, {
                      position: toast.POSITION.BOTTOM_LEFT,
                    });
                  });
              }}
            >
              LOGIN
            </Button>

            <Link to="/forgotpassword">Forgot Password</Link>
          </Form>
        </Wrapper>
      </Container>
    </LoginAuth>
  );
};

export default Login;
