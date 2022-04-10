import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import cartService from "../../Services/CartServices";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "30px",
    margin: "auto",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
}));

const CartItems = (props) => {
  console.log(props.item);
  const classes = useStyles();
  const { getCartItems, getProductId, item } = props;
  const qty = item.quantity;
  const _id = props.item._id;

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
      <Card sx={{ width: 800, margin: "10px" }}>
        <Box className={classes.root}>
          <Box>
            <img className={classes.image} src={item.product.images[0].link} />
          </Box>
          <Box>
            <Typography>{item.product.name}</Typography>
            {item.type == "DEFAULT" ? (
              <></>
            ) : (
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {item.type}
              </Typography>
            )}
          </Box>
          <Typography sx={{ color: "#ba6a62" }}>
            {item.product.price}
          </Typography>

          <Box className="quantityInput">
            <IconButton>
              <Remove onClick={minusButton} />
            </IconButton>
            <input value={qty} />
            <IconButton>
              <Add className="btn-quantity" onClick={plusButton} />
            </IconButton>
          </Box>

          <Typography sx={{ fontWeight: "bold", color: "#ba6a62" }}>
            {item.totalPrice}
          </Typography>
          <Box>
            <Delete onClick={deleteButton} />
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default CartItems;
