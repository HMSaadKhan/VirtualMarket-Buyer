import { Password } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const BuyerAccount = (props) => {
  React.useEffect(() => {
    // productService.getSingleProduct(id).then((data) => {
    //   setfName(data.fname);
    //   setlName(data.lname);
    //   setContact(data.contact);
    //   setAddress(data.address);
    //   setPassword(data.password);
    //   setcPassword(data.cpassword);
    // });
  }, []);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [contact, setContact] = useState("");
  console.log(props);
  return (
    <Container>
      <Wrapper>
        <Title>Account Details</Title>
        <Form>
          <Input
            placeholder="First Name"
            value={fname}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
          <Input
            placeholder="Last Name"
            value={lname}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
        </Form>
        <Form>
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
          <Input
            placeholder="Confirm Password"
            value={cPassword}
            onChange={(e) => {
              setfName(e.target.value);
            }}
          />
        </Form>
        <Form>
          <Input
            placeholder="Contact"
            value={contact}
            onChange={(e) => {
              setfName(e.target.value);
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
        <Button>Save</Button>
      </Wrapper>
    </Container>
  );
};

export default BuyerAccount;
