import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import cartService from "../../Services/CartServices";
import { Home } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import AccountIcon from "../MenuBar/AccountBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Badge } from "@mui/material";
export default function BottomNavigationBar(props) {
  const [value, setValue] = React.useState(0);
  const [qty, setQty] = React.useState(0);
  const getCartCount = () => {
    cartService.getQty().then((data) => {
      setQty(data.data.count);
    });
  };
  React.useEffect(getCartCount, [props.refreshCart]);
  const history = useHistory();

  return (
    <Box
      sx={{
        maxWidth: 500,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={(e) => {
            history.push("/");
          }}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          onClick={(e) => {
            history.push("/favorite");
          }}
        />
        <BottomNavigationAction
          label="Cart"
          icon={
            <Badge badgeContent={qty} color="error">
              <ShoppingCartOutlinedIcon
                fontSize="medium"
                sx={{ color: "#ba6a62" }}
              />
            </Badge>
          }
          onClick={() => {
            history.push("/cart");
          }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountIcon />}
          onClick={(e) => {
            console.log("NearBy");
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
