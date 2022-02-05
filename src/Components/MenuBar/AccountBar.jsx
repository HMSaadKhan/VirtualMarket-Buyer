import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AccountCircle, Notifications } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Container = styled.div`
  height: 30px;
  background-color: grey;
`;
const Wrapper = styled.div`
  padding: 4px 7px;
  display: flex;
  align-item: right;
  margin-right: 60px;
`;
const Right = styled.div`
  display: flex;
  margin-left: auto;
`;
const RightIn = styled.div`
  margin-left: 10px;
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
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      //id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
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
        <Right>
          <RightIn>
            <Notifications />
          </RightIn>
          <RightIn>
            <AccountCircle onClick={handleProfileMenuOpen} />
          </RightIn>
        </Right>
      </Wrapper>
      {renderMenu}
    </Container>
  );
};

export default AccountBar;
