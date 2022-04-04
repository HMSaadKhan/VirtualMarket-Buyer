import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import useState from "react-usestateref";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { Badge, Menu, MenuItem, IconButton } from "@mui/material";
import { Search, Chat, ShoppingCart, Notifications } from "@mui/icons-material";
import cartService from "../../Services/CartServices";
import buyerService from "../../Services/BuyerService";
import InputBase from "@mui/material/InputBase";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    paddingRight: "1rem",
  },
  root: { background: "inherit" },
  search: {
    color: "black",
    paddingLeft: "30rem",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MenuBar = (props) => {
  const [qty, setQty, qtyRef] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getCartCount = () => {
    cartService.getQty().then((data) => {
      console.log(data.data.count);

      setQty(data.data.count);
    });
  };
  useEffect(getCartCount, [props.refreshCart]);
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

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
      <MenuItem value="/SignUp" onClick={() => history.push("/Cart")}>
        SignUp
      </MenuItem>
    </Menu>
  );

  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" className={classes.link}>
            VirtualMarket
          </Link>
        </Typography>
        <Box className={classes.search}>
          <Search>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        {/* {!buyerService.isLoggedIn() ? (
          <>
            <Typography variant="h6">
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/register" className={classes.link}>
                Register
              </Link>
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              buyerService.logout();
              window.location.reload();
            }}
          >
            LogOut
          </Button>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
// export {getCartCount}
