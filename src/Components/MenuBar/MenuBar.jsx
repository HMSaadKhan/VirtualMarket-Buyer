import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useState from "react-usestateref";
import { Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountIcon from "./AccountBar";
import { AppBar, Toolbar, Typography, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Favorite from "@mui/icons-material/Favorite";
import cartService from "../../Services/CartServices";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    paddingRight: "1rem",
  },
  root: {
    background: "white",
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
    <AppBar sx={{ background: "white" }} position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography
            sx={{ color: "#ba6a62", fontWeight: "bold", cursor: "pointer" }}
            variant="h6"
            onClick={(e) => {
              history.push("/");
            }}
          >
            VirtualMarket
          </Typography>
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
  );
};

export default MenuBar;
// export {getCartCount}
