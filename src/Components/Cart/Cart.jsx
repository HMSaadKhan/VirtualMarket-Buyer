import React, { useEffect, useState } from "react";
import "./cart.css";
import { Button, Card, CardContent, Grid } from "@mui/material";
import CartItems from "./CartItems";
import DeleteIcon from "@mui/icons-material/Delete";
import cartService from "../../Services/CartServices";
import { Add, Remove, Delete } from "@mui/icons-material";

const Cart = (props) => {
  const [cartItem, setCartItem] = useState([]);
  const getCartItems = async () => {
    await cartService
      .getCart()
      .then((data) => {
        console.log(data);
        console.log("get cart items");

        setCartItem(data.items);
        console.log(cartItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getCartItems, []);
  console.log(cartItem);
  const clearCart = () => {
    cartService
      .clearCart()
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="clearCartButton">
        <Button variant="contained" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
      <div className="small-container cart-page">
        <Grid container ml={7} spacing={4}>
          {console.log(cartItem)}
          {cartItem.map((item, id) => (
            <CartItems item={item} key={id} getCartItems={getCartItems} />
          ))}
        </Grid>
        <div className="total-price">
          <table>
            <h5>Cart Total</h5>
            <tr>
              <td>SubTotal</td>
              <td>180,000</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>181,000</td>
            </tr>
          </table>
          <div>
            <Button variant="contained" className="checkout-btn cart-btn">
              Checkout
            </Button>
            <br />
            <Button
              variant="contained"
              className="continue-shopping-btn cart-btn"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
