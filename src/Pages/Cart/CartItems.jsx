/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Divider, IconButton, TextField, Typography, Box } from "@mui/material";
import cartService from "../../Services/CartServices";
import { makeStyles } from "@mui/styles";
import LoadingScreen from "../../Components/LoadingScreen";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
}));

const CartItems = (props) => {
  const classes = useStyles();
  const { getCartItems, getProductId, item, cartId } = props;
  console.log("Cart item" + cartId);
  const [qty, setqty] = useState(item.quantity);
  const qtyupdate = () => {
    setqty(item.quantity);
  };
  useEffect(qtyupdate, [item.quantity]);

  const id = props.item._id;
  const [loading, setloading] = useState(false);

  const [check, setcheck] = useState(false);
  const checkDisable = () => {
    if (item.type === "SAMPLE") {
      setcheck(true);
    } else {
      setcheck(false);
    }
  };
  useEffect(checkDisable, []);
  const plusButton = async () => {
    console.log("cart item inside function" + cartId);
    setloading(true);

    await cartService
      .incQty(cartId, { id })
      .then((e) => {
        getCartItems();
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };
  const minusButton = async () => {
    setloading(true);
    console.log("cart item inside function" + cartId);
    await cartService
      .decQty(cartId, { id })
      .then((e) => {
        getCartItems();
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };
  const deleteButton = async () => {
    setloading(true);
    await cartService
      .deleteItem(cartId, { id })
      .then((e) => {
        getProductId(id);
        getCartItems();
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        getCartItems();
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };
  const QuantityInput = async (quantity) => {
    setloading(true);
    await cartService
      .setQuantity(cartId, { id, quantity })
      .then((e) => {
        getCartItems();

        setloading(false);
      })
      .catch((err) => {
        // getCartItems();

        if (err.response.data.qty) {
          setqty(err.response.data.qty);
        }
        setloading(false);
        console.log(err.response);
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <LoadingScreen bool={loading} />

      <Box className={classes.root}>
        <Box sx={{ width: "20%" }}>
          <img className={classes.image} src={item.product.images[0].link} />
        </Box>
        <Box sx={{ width: "25%" }}>
          <Typography>{item.product.name}</Typography>
          {item.type === "DEFAULT" ? (
            <></>
          ) : (
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              {item.type}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: "15%" }}>
          <Typography sx={{ color: "#ba6a62" }}>
            PKR.{item.product.price}
          </Typography>
        </Box>
        <Box sx={{ width: "30%" }}>
          <Box
            sx={{
              display: "flex ",
              alignItems: "center",
            }}
          >
            <IconButton onClick={minusButton} disabled={check}>
              <Remove />
            </IconButton>
            <Box sx={{ width: "50%" }}>
              <TextField
                size="small"
                value={qty}
                onChange={(e) => {
                  setqty(e.target.value);
                  if (e.filled) {
                    setTimeout(QuantityInput(e.target.value), 500000);
                  }
                }}
              />
            </Box>
            <IconButton onClick={plusButton} disabled={check}>
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ width: "20%" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#ba6a62",
            }}
          >
            PKR.{item.totalPrice}
          </Typography>
        </Box>
        <Box>
          <Delete onClick={deleteButton} />
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default CartItems;
