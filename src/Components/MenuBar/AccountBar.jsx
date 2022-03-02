import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AccountCircle, Call } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import userService from "../../Services/UserService";

const Container = styled.div`
  height: 40px;
  background-color: white;
`;
const Wrapper = styled.div`
  padding: 4px 7px;
  display: flex;
  align-item: center;
  justify-content: space-between;
`;
const Right = styled.div`
  display: flex;
  padding: 3px;
  margin-right: 100px;
`;
const Left = styled.div`
  display: flex;
  padding: 3px;
  margin-left: 40px;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const AccountBar = () => {
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
      {!userService.isLoggedIn() ? (
        <>
          <MenuItem value="/Login" onClick={handleChange}>
            Login
          </MenuItem>
          <MenuItem value="/SignUp" onClick={handleChange}>
            SignUp
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem value="/AccountSettings" onClick={handleChange}>
            Account
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              userService.logout();
              window.location.href = "/";
            }}
          >
            Logout
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Container>
      <Wrapper>
        <Left>
          <Call />
          +0900 78601
        </Left>
        <Right>
          <AccountCircle onClick={handleProfileMenuOpen} />
        </Right>
      </Wrapper>
      {renderMenu}
      <Hr />
    </Container>
  );
};

export default AccountBar;
