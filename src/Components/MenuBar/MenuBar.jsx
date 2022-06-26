import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useState from "react-usestateref";
import { Badge, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountIcon from "./AccountBar";
import { AppBar, Toolbar, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Favorite from "@mui/icons-material/Favorite";
import cartService from "../../Services/CartServices";
import Logo from "./virtualmarket.png";
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
    marginLeft: "10px",
  },
  icon: {
    cursor: "pointer",
    color: "black",
    marginRight: "10px",
  },
}));

const MenuBar = (props) => {
  const [qty, setQty] = useState(0);

  const [search, setSearch] = useState("");

  const getCartCount = () => {
    cartService.getQty().then((data) => {
      setQty(data.data.count);
    });
  };
  useEffect(getCartCount, [props.refreshCart]);

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
            <Search
              sx={{ color: "#ba6a62" }}
              onClick={(e) => {
                history.push("/search/" + search);
              }}
            />
          </div>
          <div className={classes.iconContainer}>
            <div className={classes.icon}>
              <Favorite
                fontSize="medium"
                sx={{ color: "#ba6a62" }}
                onClick={() => {
                  history.push("/favorite");
                }}
              />
            </div>
            <div className={classes.icon}>
              <AccountIcon />
            </div>
            <div className={classes.icon}>
              <Badge badgeContent={qty} color="error">
                <ShoppingCartOutlinedIcon
                  fontSize="medium"
                  sx={{ color: "#ba6a62" }}
                  onClick={() => {
                    history.push("/cart");
                  }}
                />
              </Badge>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
// export {getCartCount}
