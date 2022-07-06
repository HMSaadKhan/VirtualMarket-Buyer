/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Divider, IconButton, TextField, Typography, Box } from "@mui/material";
import cartService from "../../Services/CartServices";
import { makeStyles } from "@mui/styles";
import LoadingScreen from "../../Components/LoadingScreen";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
}));

const CartItems = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { getCartItems, getProductId, item, cartId, selectedCart, cart } =
    props;
  console.log(cartId);
  const [qty, setqty] = useState(item.quantity);
  const qtyupdate = () => {
    setqty(item.quantity);
  };
  useEffect(qtyupdate, [item.quantity]);

  const id = props.item._id;
  const [loading, setloading] = useState(false);

  const [check, setcheck] = useState(false);
  const checkDisable = () => {
    if (!(item.type === "DEFAULT")) {
      setcheck(true);
    } else {
      setcheck(false);
    }
  };
  useEffect(checkDisable, []);

  const plusButton = async () => {
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
        getCartItems();

        if (err.response.data.qty) {
          setqty(err.response.data.qty);
        }
        setloading(false);

        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <LoadingScreen bool={loading} />

      <Box className={classes.root}>
        <Box
          sx={{
            width: "15%",
          }}
        >
          <img className={classes.image} src={item.product.images[0].link} />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "5ch",
                  sm: "10ch",
                  md: "15ch",
                  lg: "15ch",
                },
              }}
            >
              <Typography
                noWrap
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => {
                  history.push(
                    "/" + item.product.name + "/" + item.product._id
                  );
                }}
              >
                {item.product.name}
              </Typography>
              {item.type === "DEFAULT" ? (
                <></>
              ) : (
                <Typography
                  // align="center"
                  sx={{ ml: 1 }}
                  color="text.secondary"
                >
                  {item.type}
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography align="center" sx={{ color: "#ba6a62" }}>
              PKR.{item.product.price}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex ",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={minusButton}
              disabled={
                check || cart.seller._id === selectedCart ? false : true
              }
            >
              <Remove />
            </IconButton>
            <Box
              sx={{
                width: "10ch",
              }}
            >
              <TextField
                InputProps={{
                  readOnly: check ? true : false,
                }}
                disabled={cart.seller._id === selectedCart ? false : true}
                fullWidth
                size="small"
                value={qty}
                onBlur={(e) => {
                  QuantityInput(e.target.value);
                }}
                //onFocusout="myFunction()"
                onChange={(e) => {
                  setqty(e.target.value);
                  // if (e.filled) {
                  // setTimeout(QuantityInput(e.target.value), 10000);
                  // }
                }}
              />
            </Box>
            <IconButton
              onClick={plusButton}
              disabled={
                check || cart.seller._id === selectedCart ? false : true
              }
            >
              <Add />
            </IconButton>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#ba6a62",
              }}
            >
              PKR.{item.totalPrice}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "10%" }}>
          <IconButton
            onClick={deleteButton}
            disabled={cart.seller._id === selectedCart ? false : true}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default CartItems;
