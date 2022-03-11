import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import buyerService from "../../Services/BuyerService";
import { toast } from "react-toastify";
import { bgcolor } from "@mui/system";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import Auth from "../../Components/AuthWrapper/Auth";

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

const ChangenewPassword = (props) => {
  const [oldPassword, setOldPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState("");
  const history = useHistory();

  return (
    <Auth>
      <Container>
        <Wrapper>
          <Title>Change Password</Title>
          <Form>
            <Input
              placeholder="Old Password"
              type="Password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />

            <Input
              placeholder="New Password"
              type="Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Form>
          <br />
          <Button
            color="success"
            variant="contained"
            onClick={(e) => {
              buyerService
                .changePassword({ oldPassword, newPassword }) //if gives error then check oldPassword datatype
                .then((data) => {
                  history.push("/AccountSettings");
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
    </Auth>
  );
};

export default ChangenewPassword;
