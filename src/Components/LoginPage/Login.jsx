import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button } from "@material-ui/core";
import buyerService from "../../Services/BuyerService";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

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
  font-weight: 300;
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

const Buttons = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = (props) => {
  const [email, setEmail] = React.useState("hello@123.com");
  const [password, setPassword] = React.useState("1234");
  const history = useHistory();
  return (
    <>
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
              onClick={(e) => {
                buyerService
                  .login(email, password)
                  .then((data) => {
                    console.log(data);
                    history.push("/");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              LOGIN
            </Button>
            <Link to="/forgotpassword">Forgot Password</Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
