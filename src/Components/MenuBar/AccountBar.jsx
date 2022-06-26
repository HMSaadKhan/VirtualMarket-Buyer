import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MenuItem, Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import buyerService from "../../Services/BuyerService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const AccountIcon = (props) => {
  const [avatar, setavatar] = useState("");

  const getData = () => {
    buyerService
      .getUserAvatar()
      .then((data) => {
        console.log(data);
        setavatar(data.avatar);
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
            <AccountBoxIcon /> Profile
          </MenuItem>
          {/* <MenuItem value="/orders" onClick={handleChange}>
            Orders
          </MenuItem>
          <MenuItem value="/warranty" onClick={handleChange}>
            Warranty
          </MenuItem>
          <MenuItem>
            <ScheduledOrder />
          </MenuItem> */}
          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </MenuItem>
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
          sx={{
            width: 24,
            height: 24,
            bgcolor: "#ba6a62",
            border: 1,
            borderColor: "#ba6a62",
          }}
          onClick={handleProfileMenuOpen}
          src={avatar}
        />
      )}
      {renderMenu}
    </div>
  );
};

export default AccountIcon;
