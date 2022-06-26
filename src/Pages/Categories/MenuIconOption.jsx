import React, { useContext } from "react";
import { Box, Menu, MenuItem } from "@mui/material";

import { useHistory } from "react-router-dom";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";

import ScheduledOrder from "../../Components/MenuBar/ScheduledOrders";

import MenuIcon from "@mui/icons-material/Menu";

export default function MenuIconOption(props) {
  console.log(props);
  const history = useHistory();
  //const [categories, setCategories] = useState([]);
  const categories = useContext(CategoriesContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [Optionstate, setOptionState] = React.useState(null);
  const isOptionOpen = Boolean(Optionstate);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    handleOptionClose();
  };
  const handleOptionClose = () => {
    setOptionState(null);
  };

  const handleOptionOpen = (event) => {
    setOptionState(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      sx={{ zIndex: 10 }}
      elevation={2}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
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
              setAnchorEl(null);
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </div>
    </Menu>
  );

  const renderOption = (
    <Menu
      elevation={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id="basic-menu"
      anchorEl={Optionstate}
      keepMounted
      open={isOptionOpen}
      onClose={handleOptionClose}
    >
      <MenuItem onClick={handleMenuOpen}>Products</MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/orders");
          handleOptionClose();
        }}
      >
        Orders
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/warranty/ACTIVE");
          handleOptionClose();
        }}
      >
        Warranty
      </MenuItem>
      <MenuItem>
        <ScheduledOrder />
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <Box>
        <MenuIcon fontSize="medium" onClick={handleOptionOpen} />
      </Box>
      {renderMenu}
      {renderOption}
    </Box>
  );
}
