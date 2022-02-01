import {
  Search,
  Chat,
  LoginRounded,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 60px;
  background-color: #ff9a3c;
`;
const Wrapper = styled.div`
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1``;
const SearchBar = styled.div`
  display: flex;
  flex=1;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  height: 25px;
  width: 500px;
`;
const RightCorner = styled.div`
display: flex;
flex=1;
`;
const RightComponents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const MenuBar = () => {
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={linkStyle}>
          <Logo>Virtual Market</Logo>
        </Link>
        <SearchBar>
          <Input />
          <Search />
        </SearchBar>
        <RightCorner>
          <RightComponents>
            <Chat />
          </RightComponents>
          <RightComponents>
            <Favorite />
          </RightComponents>
          <RightComponents>
            <ShoppingCart />
          </RightComponents>
          <RightComponents>
            <Link to="/Login" style={linkStyle}>
              <LoginRounded />{" "}
            </Link>
          </RightComponents>
        </RightCorner>
      </Wrapper>
    </Container>
  );
};

export default MenuBar;
