import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import useState from "react-usestateref";

import { Badge, Menu, MenuItem, IconButton } from "@mui/material";
import { Search, Chat, ShoppingCart, Notifications } from "@mui/icons-material";
import cartService from "../../Services/CartServices";

const Container = styled.div`
  height: 70px;
  background-color: #eee;
`;
const Wrapper = styled.div`
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1``;
const SearchBar = styled.div`
  display: flex;
  flex=1;
  align-items: center;
  cursor:pointer;
`;

const Input = styled.input`
  border: 3px;
  height: 25px;
  width: 500px;
`;
const RightCorner = styled.div`
display: flex;
flex=1;
`;
const RightComponents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;

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
  return (
    <Container>
      <Wrapper>
        <Logo onClick={() => history.push("/")}> Virtual Market</Logo>
        <SearchBar>
          <Input />
          <Search />
        </SearchBar>
        <RightCorner>
          <RightComponents>
            <Chat />
          </RightComponents>

          <RightComponents>
            <IconButton component={Link} to="/Cart">
              <Badge badgeContent={qty} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </RightComponents>
        </RightCorner>
      </Wrapper>
      {renderMenu}

    </Container>
  );
};

export default MenuBar;
// export {getCartCount}

