import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MenuItem, Avatar, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import buyerService from "../../Services/BuyerService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScheduledOrder from "./ScheduledOrders";

const AccountIcon = (props) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");

  const getData = () => {
    buyerService
      .getUserName()
      .then((data) => {
        setfname(data.fName.charAt(0).toUpperCase());
        setlname(data.lName.charAt(0).toUpperCase());
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
    window.location.href = "/";
  };

  const renderMenu = (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="basic-menu"
      anchorEl={anchorEl}
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
          <MenuItem value="/orders" onClick={handleChange}>
            Orders
          </MenuItem>
          <MenuItem value="/warranty" onClick={handleChange}>
            Warranty
          </MenuItem>
          <MenuItem>
            <ScheduledOrder />
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div>
      {!buyerService.isLoggedIn() ? (
        <AccountCircleIcon
          fontSize="medium"
          sx={{ color: "#ba6a62" }}
          onClick={handleProfileMenuOpen}
        />
      ) : (
        <Avatar
          sx={{ width: 24, height: 24, bgcolor: "#ba6a62" }}
          onClick={handleProfileMenuOpen}
        >
          <Typography
            sx={{
              width: 16,
              height: 16,
              marginBottom: "6px",
              marginRight: "4px",
            }}
          >
            {fname}
            {lname}
          </Typography>
        </Avatar>
      )}
      {renderMenu}
    </div>
  );
};

export default AccountIcon;
