import React from "react";
import { Button } from "@material-ui/core";
import userService from "../../Services/BuyerService";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LoginAuth from "../../Components/AuthWrapper/LoginAuth";

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
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState("hello@123.com");
  const history = useHistory();

  return (
    <LoginAuth>
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
            variant="outlined"
            color="primary"
            onClick={async (e) => {
              await userService
                .forgotPassword(email)
                .then((data) => {
                  toast.success(data.data, {
                    position: toast.POSITION.BOTTOM_LEFT,
                  });

                  history.push("resetPassword/" + data._id);
                })
                .catch((err) => {
                  toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_LEFT,
                  });
                });
            }}
          >
            Send Email
          </Button>
          <br />
        </Wrapper>
      </Container>
    </LoginAuth>
  );
};

export default ForgotPassword;