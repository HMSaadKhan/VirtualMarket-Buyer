import React, { useContext } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/styles";

import { useHistory } from "react-router-dom";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
import { MarginBox } from "../../Styles/StyledBox";
import ScheduledOrder from "../../Components/MenuBar/ScheduledOrders";

const Links = styled(Typography)({
  color: "black",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
    color: "#ba6a62",
  },
});

export default function MenuButtons(props) {
  console.log(props);
  const history = useHistory();
  const categories = useContext(CategoriesContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

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
              handleMenuClose();
            }}
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
            <Links
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </Links>
          </MarginBox>
          <MarginBox>
            <Links
              onClick={handleProfileMenuOpen}
              onMouseOver={handleProfileMenuOpen}
              // onMouseOut={handleMenuClose}
            >
              Products
            </Links>
          </MarginBox>
          <MarginBox>
            <Links
              onClick={() => {
                history.push("/orders");
              }}
            >
              Orders
            </Links>
          </MarginBox>
          <MarginBox>
            <Links
              onClick={() => {
                history.push("/warranty/ACTIVE");
              }}
            >
              Warranty
            </Links>
          </MarginBox>
          <MarginBox>
            <Links>
              <ScheduledOrder />
            </Links>
          </MarginBox>
        </Box>
      </Box>
      {renderMenu}
    </Box>
  );
}
