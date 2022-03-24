import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AccountCircle, Call, WindowSharp } from "@mui/icons-material";
import { MenuItem, Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import buyerService from "../../Services/BuyerService";
import axios from "axios";
import { IconButton } from "@material-ui/core";

const Container = styled.div`
  height: 50px;
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
  padding: 5px;
  margin-left: 40px;
`;

const AccountBar = (props) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");

  const getData = () => {
    buyerService
      .getUserName()
      .then((data) => {
        console.log(data);
        setfname(data.fName.charAt(0));
        setlname(data.lName.charAt(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);

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
  const handleLogout = () => {
    handleMenuClose();
    buyerService.logout();
    history.push("/");
  };

  const renderMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!buyerService.isLoggedIn() ? (
        <div>
          <MenuItem value="/Login" onClick={handleChange}>
            Login
          </MenuItem>
          <MenuItem value="/SignUp" onClick={handleChange}>
            SignUp
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem value="/AccountSettings" onClick={handleChange}>
            Account
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
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
          {!buyerService.isLoggedIn() ? (
            <AccountCircle onClick={handleProfileMenuOpen} />
          ) : (
            <IconButton onClick={handleProfileMenuOpen}>
              {fname}
              {lname}
            </IconButton>
          )}
        </Right>
      </Wrapper>
      {renderMenu}
    </Container>
  );
};

export default AccountBar;
