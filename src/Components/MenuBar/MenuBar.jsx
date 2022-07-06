import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useState from "react-usestateref";
import { Badge, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountIcon from "./AccountBar";
import { AppBar, Toolbar, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Favorite from "@mui/icons-material/Favorite";
import cartService from "../../Services/CartServices";
import Logo from "./virtualmarket.png";
import { useContext } from "react";
import { CartCountContext } from "../../Contexts/CartChanger/CartChanger";
const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    paddingRight: "1rem",
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
    marginRight: "10px",
  },
  icon: {
    cursor: "pointer",
    color: "black",
  },
}));

const MenuBar = (props) => {
  const [search, setSearch] = useState("");
  const cartCount = useContext(CartCountContext);

  const history = useHistory();
  const classes = useStyles();
  return (
    <Box sx={{ width: "auto" }}>
      <AppBar sx={{ background: "white" }} position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Box
              sx={{
                color: "#ba6a62",
                cursor: "pointer",
                height: "100",
                width: "100",
              }}
              onClick={(e) => {
                history.push("/");
              }}
            >
              <img
                src={Logo}
                height="65"
                width="88"
                objectfit="contain"
                alt="logo"
              />
            </Box>
          </div>
          <div className={classes.search}>
            <TextField
              className={classes.searchBar}
              id="filled-search"
              label="Search field"
              type="search"
              variant="standard"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  history.push("/search/" + search);
                  // write your functionality here
                }
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <IconButton
              disabled={search ? false : true}
              onClick={(e) => {
                history.push("/search/" + search);
              }}
            >
              <Search />
            </IconButton>
          </div>
          <div className={classes.iconContainer}>
            <div className={classes.icon}>
              <IconButton
                onClick={() => {
                  history.push("/favorite");
                }}
              >
                <Favorite fontSize="medium" sx={{ color: "#ba6a62" }} />
              </IconButton>
            </div>
            <div className={classes.icon}>
              <IconButton>
                <AccountIcon />
              </IconButton>
            </div>
            <div className={classes.icon}>
              <IconButton
                onClick={() => {
                  history.push("/cart");
                }}
              >
                <Badge badgeContent={cartCount.qty} color="error">
                  <ShoppingCartOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "#ba6a62" }}
                  />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
// export {getCartCount}
