import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import useState from "react-usestateref";
import { Badge } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import {
  Search,
  Chat,
  ShoppingCart,
  Notifications,
  AccountCircleSharp,
} from "@mui/icons-material";
import cartService from "../../Services/CartServices";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    paddingRight: "1rem",
  },
  root: {
    background: "inherit",
  },
  search: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    color: "#000",
    width: "30%",
  },
  searchBar: {
    width: "100%",
    height: "2%",
  },
  input: {},
  iconContainer: {
    display: "flex",
    marginLeft: "10px",
  },
  icon: {
    color: "black",
    marginRight: "10px",
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
      setQty(data.data.count);
    });
  };
  useEffect(getCartCount, [props.refreshCart]);
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const history = useHistory();

  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h6">
            <Link to="/" className={classes.link}>
              VirtualMarket
            </Link>
          </Typography>
        </div>
        <div className={classes.search}>
          <TextField
            className={classes.searchBar}
            id="filled-search"
            label="Search field"
            type="search"
            variant="standard"
          />
          <Search sx={{ color: "#ba6a62" }}>
            <Search />
          </Search>
        </div>
        <div className={classes.iconContainer}>
          <div className={classes.icon}>
            <AccountCircleSharp color="action" />
          </div>
          <div className={classes.icon}>
            <Badge badgeContent={qty} color="error">
              <ShoppingCart
                color="action"
                onClick={() => {
                  history.push("/cart");
                }}
              />
            </Badge>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
// export {getCartCount}
