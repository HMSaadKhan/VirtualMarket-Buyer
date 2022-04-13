import React, { useEffect } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import CartItems from "./CartItems";
import DeleteIcon from "@mui/icons-material/Delete";
import cartService from "../../Services/CartServices";
import { Add, Remove, Delete } from "@mui/icons-material";
import useState from "react-usestateref";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    backgroundColor: "#ba6a62",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ba6a64",
      color: "#ffff",
    },
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  clearCartButton: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "49%",
    paddingTop: "2%",
    marginBottom: "1%",
    width: "20%",
  },
}));
const Cart = (props) => {
  const classes = useStyles();
  const history = useHistory();

  console.log(props);
  const [cartItem, setCartItem, cartItemRef] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const [subtotal, setsubtotal, subtotalRef] = useState(0);
  const [deliveryCharge, setdeliveryCharge] = useState(0);
  const [total, settotal] = useState(0);
  const getCartItems = async () => {
    await cartService
      .getCart()
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          toast.success(data.statusText, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        setCartItem(data.items);
        console.log("get cart items");
        settotal(data.total);
        setdeliveryCharge(data.seller.deliveryCharge);
        setsubtotal(data.subTotal);
      })
      .catch((err) => {
        console.log(err.response);
        
        if (err.response.data === "No Items in Cart") {
          console.log("I ran");
          setCartItem(null);
          settotal(0);
          setsubtotal(0);
          setdeliveryCharge(0);
        }
      });
  };
  useEffect(getCartItems, []);

  const clearCart = () => {
    cartService
      .clearCart()
      .then((data) => {
        console.log(data);
        setCartItem(null);
        settotal(0);
        setsubtotal(0);
        setdeliveryCharge(0);
        getCartItems();
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
  const ProceedtoCheckOut = async () => {
    await cartService
      .ProceedToCheckOut()
      .then((data) => {
        history.push("/check-out");
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <>
      {console.log(cartItem)}
      <div className={classes.clearCartButton}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>

      <div className={classes.root}>
        <div>
          {cartItem ? (
            <Box m={2}>
              {cartItem.map((item) => (
                <CartItems
                  item={item}
                  key={item._id}
                  getCartItems={getCartItems}
                  getProductId={getProductId}
                  productQtyChange={productQtyChange}
                />
              ))}
            </Box>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <Box m={2} sx={{ width: 300 }}>
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                  Cart Total
                </Typography>

                <Typography sx={{ display: "flex " }}>
                  Subtotal
                  <Box ml={8.5}>
                    <Typography>{subtotalRef.current}</Typography>
                  </Box>
                </Typography>
                <Typography sx={{ display: "flex " }}>
                  Shipping{" "}
                  <Box ml={8}>
                    <Typography>{deliveryCharge}</Typography>
                  </Box>
                </Typography>
                <Typography sx={{ display: "flex " }}>
                  total{" "}
                  <Box ml={12}>
                    <Typography>{total}</Typography>
                  </Box>
                </Typography>
              </CardContent>
              <Box>
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={() => {
                    ProceedtoCheckOut();
                  }}
                >
                  Place Order{" "}
                </Button>
              </Box>
              <Box mt={2}>
                <Button
                  className={classes.button}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Continue Shopping{" "}
                </Button>
              </Box>
            </Card>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Cart;
