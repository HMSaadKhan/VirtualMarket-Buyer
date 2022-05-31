import React, { useEffect } from "react";
import {
  Card,
  Button,
  CardContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import cartService from "../../Services/CartServices";
import useState from "react-usestateref";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const CartSideBar = ({
  subtotal,
  deliveryCharge,
  total,
  stateChanged,
  getCartItems,
  cartId,
}) => {
  //const classes = useStyles();
  const history = useHistory();

  const [cartItem, setCartItem, cartItemRef] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  // const [subtotal, setsubtotal, subtotalRef] = useState();
  // const [deliveryCharge, setdeliveryCharge] = useState();
  // const [total, settotal] = useState();
  const [loading, setloading] = useState(false);

  const clearAll = () => {
    setloading(true);
    cartService.clearAll().then((data) => {
      setloading(false);
      toast.success(data.data, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      getCartItems();
      stateChanged(data);
    });
  };

  const ProceedtoCheckOut = async () => {
    setloading(true);
    await cartService
      .ProceedToCheckOut(cartId)
      .then((data) => {
        setloading(false);
        history.push("/check-out/" + cartId);
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <>
      <Box m={2} sx={{ width: "25%" }}>
        <Box>
          <Button
            variant="contained"
            sx={{ width: "100%", marginLeft: 0 }}
            onClick={clearAll}
          >
            Clear all
          </Button>
        </Box>
        <Box>
          <Card sx={{ backgroundColor: "white", maxWidth: 400 }}>
            <CardContent>
              <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                Cart Total
              </Typography>

              <Typography sx={{ display: "flex " }}>
                Sub Total
                <Box ml={8.5}>
                  <Typography>PKR.{subtotal}</Typography>
                </Box>
              </Typography>
              <Typography sx={{ display: "flex " }}>
                Shipping
                <Box ml={9}>
                  <Typography>PKR.{deliveryCharge}</Typography>
                </Box>
              </Typography>
              <Divider />
              <Typography sx={{ display: "flex ", fontWeight: "bold" }}>
                Total{" "}
                <Box ml={12}>
                  <Typography>PKR.{total}</Typography>
                </Box>
              </Typography>
            </CardContent>
            <Box>
              <Button
                variant="contained"
                sx={{ width: "100%", marginLeft: 0 }}
                onClick={() => {
                  ProceedtoCheckOut();
                }}
              >
                Proceed to CheckOut
              </Button>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                sx={{ width: "100%", marginLeft: 0 }}
                onClick={() => {
                  history.push("/");
                }}
              >
                Continue Shopping{" "}
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default CartSideBar;
