import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  IconButton,
  listItemSecondaryActionClasses,
  TextField,
} from "@mui/material";
import "./cart.css";
import styled from "styled-components";
import { withRouter } from "react-router";
import cartService from "../../Services/CartServices";

const CartItems = (props) => {
  console.log(props);
  const { onDelete, getCartItems } = props;
  const [quantity, setQuantity] = useState(props.item.quantity);
  const _id = props.item._id;
  console.log(_id);

  const plusButton = () => {
    cartService
      .incQty(_id)
      .then((e) => {
        console.log(e);
        setQuantity(quantity + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const minusButton = () => {
    cartService
      .decQty(_id)
      .then((e) => {
        console.log(e);

        setQuantity(quantity - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteButton = () => {
    cartService
      .deleteItem(_id)
      .then((e) => {
        console.log(e);
        getCartItems(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Card m={2} sx={{ minWidth: 800 }}>
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
            <input value={quantity} />
            <IconButton>
              <Add className="btn-quantity" onClick={plusButton} />
            </IconButton>
          </div>
          <div>PKR {quantity * props.item.product.price}</div>

          <div>
            <Delete onClick={deleteButton} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(CartItems);
