import React, { useContext } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/styles";

import { useHistory } from "react-router-dom";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
import { MarginBox } from "../../Styles/StyledBox";
import ScheduledOrder from "../../Components/MenuBar/ScheduledOrders";

const Links = styled(Typography)({
  textDecoration: "underline",
  color: "black",
  "&:hover": {
    textDecoration: "underline",
    color: "#ba6a62",
  },
});

export default function Categories(props) {
  console.log(props);
  const history = useHistory();
  //const [categories, setCategories] = useState([]);
  const categories = useContext(CategoriesContext);
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [name, setname] = React.useState("Products");
  console.log(history);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const renderMenu = (
    <Menu
      elevation={1}
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
      <div>
        {categories.map((item) => (
          <MenuItem
            key={item}
            value={item._id}
            onClick={(e) => {
              history.push("/category/" + item._id);
              setname(item.name);
            }}
            onChange={(e) => {}}
          >
            {item.name}
          </MenuItem>
        ))}
      </div>
    </Menu>
  );

  return (
    <Box
      mt={1}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "50%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
          }}
        >
          {" "}
          <MarginBox>
            <Links>Home</Links>
          </MarginBox>
          <MarginBox>
            <Links onClick={handleProfileMenuOpen}>Products</Links>
          </MarginBox>
          <MarginBox>
            <Links>Orders</Links>
          </MarginBox>
          <MarginBox>
            <Links>Warranty</Links>
          </MarginBox>
          <MarginBox>
            <Links>
              <ScheduledOrder />
            </Links>
          </MarginBox>
          <MarginBox>
            <Links>Warranty</Links>
          </MarginBox>
        </Box>
      </Box>
      {renderMenu}
    </Box>
  );
}
