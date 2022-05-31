import React, { useEffect } from "react";
import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import CartItems from "./CartItems";
import cartService from "../../Services/CartServices";
import useState from "react-usestateref";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../AuthWrapper/IsLoginFalse";
import { StyledButton } from "../../Styles/StyledButton";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";

const Cart = (props) => {
  //const classes = useStyles();
  const history = useHistory();

  console.log(props);
  const [cartItem, setCartItem, cartItemRef] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const [subtotal, setsubtotal, subtotalRef] = useState();
  const [deliveryCharge, setdeliveryCharge] = useState();
  const [total, settotal] = useState();
  const [loading, setloading] = useState(false);
  const getCartItems = () => {
    setloading(true);
    cartService
      .getCart()
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          toast.success(data.statusText, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }

        setloading(false);
        setCartItem(data.items);

        settotal(data.total);
        setdeliveryCharge(data.seller.deliveryCharge);
        setsubtotal(data.subTotal);
      })
      .catch((err) => {
        console.log(err.response);

        setloading(false);

        if (err.response.data === "No Items in Cart") {
          setCartItem(null);
          settotal();
          setsubtotal();
          setdeliveryCharge();
        }
      });
  };
  useEffect(getCartItems, []);

  const clearCart = () => {
    setloading(true);
    cartService.clearCart().then((data) => {
      setloading(false);
      toast.success(data.data, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      getCartItems();
      props.stateChanged(data);
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

  const ProceedtoCheckOut = async () => {
    setloading(true);
    await cartService
      .ProceedToCheckOut()
      .then((data) => {
        setloading(false);
        history.push("/check-out");
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <Auth>
      <LoadingScreen bool={loading} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "25%" }}></Box>

        <Box m={2}>
          {cartItem ? (
            <Box>
              {cartItem.map((item) => (
                <CartItems
                  item={item}
                  key={item._id}
                  getCartItems={getCartItems}
                  getProductId={getProductId}
                  // productQtyChange={productQtyChange}
                />
              ))}
            </Box>
          ) : (
            <Box>
              <MidPager name={"No items in Cart"} />
            </Box>
          )}
        </Box>
        <Box m={2} sx={{ width: "25%" }}>
          <Box>
            <StyledButton
              sx={{ width: "100%", marginLeft: 0 }}
              onClick={clearCart}
            >
              Clear Cart
            </StyledButton>
          </Box>
          <Box>
            <Box>
              <Box>
                <Card sx={{ backgroundColor: "white", maxWidth: 400 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                      Cart Total
                    </Typography>

                    <Typography sx={{ display: "flex " }}>
                      Sub Total
                      <Box ml={8.5}>
                        <Typography>PKR.{subtotalRef.current}</Typography>
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
                    <StyledButton
                      sx={{ width: "100%", marginLeft: 0 }}
                      onClick={() => {
                        ProceedtoCheckOut();
                      }}
                    >
                      Place Order{" "}
                    </StyledButton>
                  </Box>
                  <Box mt={2}>
                    <StyledButton
                      sx={{ width: "100%", marginLeft: 0 }}
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Continue Shopping{" "}
                    </StyledButton>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Auth>
  );
};

export default Cart;
