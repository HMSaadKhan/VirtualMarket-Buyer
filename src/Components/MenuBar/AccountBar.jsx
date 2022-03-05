import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AccountCircle, Call } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import buyerService from "../../Services/BuyerService";
import axios from "axios";

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

const AccountBar = (props) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  console.log(axios.defaults.headers.common["x-auth-token"]);
  console.log(buyerService.getUserName());

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
  // getData();
  React.useEffect(getData, []);

  // React.useEffect(() => {
  //   buyerService.getUserName.then((data) => {
  //     setfname(data.fName);
  //     setlname(data.lName);
  //   });
  // }, []);
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
    history.push("/");
    handleMenuClose();
    buyerService.logout();
  };

  const renderMenu = (
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
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
          {/* {!userService.isLoggedIn() ? <div> <AccountCircle onClick={handleProfileMenuOpen} /></div> : <div>{userService.getUserName}</div>} */}
          <div>
            {" "}
            <AccountCircle onClick={handleProfileMenuOpen} />
            {fname} {lname}
          </div>
        </Right>
      </Wrapper>
      {renderMenu}
      <Hr />
    </Container>
  );
};

export default AccountBar;
