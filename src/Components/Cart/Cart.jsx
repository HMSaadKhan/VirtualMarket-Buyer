import React, { useEffect } from "react";
import "./cart.css";
import { Button, Card, CardContent, Grid } from "@mui/material";
import CartItems from "./CartItems";
import DeleteIcon from "@mui/icons-material/Delete";
import cartService from "../../Services/CartServices";
import { Add, Remove, Delete } from "@mui/icons-material";
import useState from "react-usestateref";
const Cart = (props) => {
  console.log(props);
  const [cartItem, setCartItem, cartItemRef] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const getCartItems = async () => {
    await cartService
      .getCart()
      .then((data) => {
        console.log(data);
        setCartItem(data.items);
        console.log("get cart items");
        setCartValues(data);
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
        setCartItem(null);
        props.stateChanged(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProductId = (data) => {
    console.log(data);
    props.stateChanged(data);
    setCartItem((items) => {
      return items.filter((item) => {
        return item._id !== data;
      });
    });
  };
  const productQtyChange = (data) => {
    setCartItem(cartItemRef.current);
  };
  return (
    <>
      <div className="clearCartButton">
        <Button variant="contained" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="small-container cart-page">
        {cartItem ? (
          <div ml={3}>
            {cartItem.map((item) => (
              <CartItems
                item={item}
                key={item._id}
                getCartItems={getCartItems}
                getProductId={getProductId}
                productQtyChange={productQtyChange}
              />
            ))}
          </div>
        ) : null}

        <div className="total-price">
          <table>
            <h5>Cart Total</h5>
            <tr>
              <td>SubTotal</td>
              <td>{cartValues.subTotal}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              {/* <td>{cartValues.seller.deliveryCharge}</td> */}
            </tr>
            <tr>
              <td>Total</td>
              <td>{cartValues.total}</td>
            </tr>
          </table>
          <div>
            <button className="checkout-btn cart-btn">Checkout</button>
            <br />
            <button className="continue-shopping-btn cart-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
