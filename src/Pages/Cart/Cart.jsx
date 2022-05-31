import React, { useEffect } from "react";
import {
  Card,
  RadioGroup,
  CardContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CartItems from "./CartItems";
import cartService from "../../Services/CartServices";
import useState from "react-usestateref";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../AuthWrapper/IsLoginFalse";
import { StyledButton } from "../../Styles/StyledButton";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";
import CartSideBar from "./CartSideBar";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Labels } from "../../Styles/MyTypographies";
import Radio from "@mui/material/Radio";
import CartComponent from "./CartComponent";

const Cart = (props) => {
  //const classes = useStyles();
  const history = useHistory();

  const [cartItem, setCartItem, cartItemRef] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const [subtotal, setsubtotal, subtotalRef] = useState();
  const [deliveryCharge, setdeliveryCharge] = useState();
  const [total, settotal] = useState();
  const [cartId, setcartId] = useState();
  const [loading, setloading] = useState(false);
  const [radio, setRadio] = React.useState(false);

  const getCartItems = () => {
    console.log("cart run");
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
        setCartItem(data);
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

  const getProductId = (data) => {
    console.log(data);
    props.stateChanged(data);
    setCartItem((items) => {
      return items.filter((item) => {
        return item._id !== data;
      });
    });
  };

  const setCharges = () => {
    if (cartItem.length > 0) {
      setdeliveryCharge(cartItem[0].seller.deliveryCharge);
      setsubtotal(cartItem[0].subTotal);
      settotal(cartItem[0].total);
    }
  };
  useEffect(setCharges, [cartItem]);

  return (
    <Auth>
      <LoadingScreen bool={loading} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box m={2}>
          {cartItem.length > 0 ? (
            <>
              <RadioGroup
                name="use-radio-group"
                defaultValue={cartItem["0"].seller._id}
              >
                {cartItem.map((cart) => {
                  return (
                    <>
                      <CartComponent
                        cart={cart}
                        setcartId={setcartId}
                        cartId={cartId}
                        key={cart.seller._id}
                        getCartItems={getCartItems}
                        getProductId={getProductId}
                        setdeliveryCharge={setdeliveryCharge}
                        setsubtotal={setsubtotal}
                        settotal={settotal}
                      />
                    </>
                  );
                })}
              </RadioGroup>
            </>
          ) : (
            <Box>
              <MidPager name={"No items in Cart"} />
            </Box>
          )}
        </Box>

        <CartSideBar
          cartId={cartId}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          total={total}
          stateChanged={props.stateChanged}
        />
      </Box>
    </Auth>
  );
};

export default Cart;
