import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect } from "react";
import { Button, Card, IconButton, TextField } from "@mui/material";
import "./cart.css";

import cartService from "../../Services/CartServices";

const CartItems = (props) => {
  console.log(props);
  const { getCartItems, getProductId } = props;
  // const [qty, setQty] = useState(0);
  const qty = props.item.quantity;
  console.log(qty);
  const _id = props.item._id;
  console.log(_id);

  const plusButton = async () => {
    await cartService
      .incQty(_id)
      .then((e) => {
        console.log(e);
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const minusButton = async () => {
    await cartService
      .decQty(_id)
      .then((e) => {
        console.log(e);
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteButton = async () => {
    await cartService
      .deleteItem(_id)
      .then((e) => {
        console.log(e);
        getProductId(_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Card m={2} sx={{ width: 800 }}>
        <div className="cardContent">
          <div>
            <img
              className="cartImage"
              src={props.item.product.images[0].link}
              alt="image"
            />
            <span>{props.item.product.name}</span>
            <br />
            <span>
              {!props.item.type == "DEFAULT" ? <>props.item.type</> : <></>}
            </span>
          </div>
          <div className="Price">PKR {props.item.product.price}</div>
          <div className="quantityInput">
            <IconButton>
              <Remove onClick={minusButton} />
            </IconButton>
            <input value={qty} />
            <IconButton>
              <Add className="btn-quantity" onClick={plusButton} />
            </IconButton>
          </div>
          <div className="Price">PKR {qty * props.item.product.price}</div>

          <div>
            <Delete onClick={deleteButton} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartItems;
