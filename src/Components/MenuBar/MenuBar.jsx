import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {Search, Chat, Favorite, ShoppingCart, AccountCircle, Notifications,} from "@mui/icons-material";

const Container = styled.div`
  height: 70px;
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
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();

  const handleChange = (event) => {
    history.push(event.target.getAttribute("value"));
    handleMenuClose();
  };

  const renderMenu = (
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem value="/Login" onClick={handleChange}>
        Login
      </MenuItem>
      <MenuItem value="/SignUp" onClick={handleChange}>
        SignUp
      </MenuItem>
    </Menu>
  );
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
            <Notifications />
          </RightComponents>
          <RightComponents>
            <Link to="/favorite" style={linkStyle}>
              <Favorite />
            </Link>
          </RightComponents>
          <RightComponents>
            <Link to="/Cart" style={linkStyle}>
              <ShoppingCart />
            </Link>
          </RightComponents>
          <RightComponents>
            <AccountCircle onClick={handleProfileMenuOpen} />
          </RightComponents>
        </RightCorner>
      </Wrapper>
      {renderMenu}
    </Container>
  );
};

export default MenuBar;
