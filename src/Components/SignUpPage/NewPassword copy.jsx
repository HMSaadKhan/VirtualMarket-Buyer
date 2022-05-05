import React from "react";
import { Button } from "@material-ui/core";
import buyerService from "../../Services/BuyerService";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const NewPassword = (props) => {
  const [otp, setOtp] = React.useState();
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const _id = props.match.params.id;

  return (
    <Container>
      <Wrapper>
        <Title>New Password</Title>
        <Form>
          <Input
            placeholder="OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />

          <Input
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form>
        <br />
        <Button
          color="success"
          variant="contained"
          onClick={(e) => {
            buyerService
              .resetPassword(_id, { otp, password }) //if gives error then check otp datatype
              .then((data) => {
                history.push("/Login");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Save
        </Button>
      </Wrapper>
    </Container>
  );
};

export default NewPassword;
