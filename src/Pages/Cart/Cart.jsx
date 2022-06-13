import React, { useEffect } from "react";
import { RadioGroup, Box } from "@mui/material";
import cartService from "../../Services/CartServices";
import useState from "react-usestateref";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../AuthWrapper/IsLoginFalse";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";
import CartSideBar from "./CartSideBar";
import CartComponent from "./CartComponent";

const Cart = (props) => {
  //const classes = useStyles();
  const history = useHistory();

  const [cartItem, setCartItem] = useState([]);
  const [subtotal, setsubtotal] = useState();
  const [deliveryCharge, setdeliveryCharge] = useState();
  const [total, settotal] = useState();
  const [cartId, setcartId] = useState();
  const [loading, setloading] = useState(false);
  const [radiodefault, setRadiodefault] = React.useState();
  const [errormessage, setErrorMessage] = useState();

  const getCartItems = () => {
    setloading(true);
    cartService
      .getCart()
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          toast.success(data.statusText, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }

        setloading(false);
        console.log(data);
        setCartItem(data);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMessage(err.response.data);

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
    if (!errormessage) {
      if (cartItem.length > 0) {
        setdeliveryCharge(cartItem[0].seller.deliveryCharge);
        setsubtotal(cartItem[0].subTotal);
        settotal(cartItem[0].total);
        setcartId(cartItem[0]._id);
        setRadiodefault(cartItem[0].seller._id);
      }
    }
  };
  useEffect(setCharges, [cartItem, errormessage]);

  return (
    <Auth>
      <LoadingScreen bool={loading} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", lg: "row" },
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "50%" }}></Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", lg: "100%" },
          }}
        >
          <Box m={2}>
            {!errormessage ? (
              <>
                {cartItem.length > 0 ? (
                  <>
                    <RadioGroup
                      name="use-radio-group"
                      value={cartItem[0].seller._id}
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
                  <></>
                )}
              </>
            ) : (
              <>
                <Box>
                  <MidPager name={errormessage} />
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", lg: "50%" } }}>
          {" "}
          <CartSideBar
            cartId={cartId}
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            getCartItems={getCartItems}
            total={total}
            stateChanged={props.stateChanged}
          />
        </Box>
      </Box>
    </Auth>
  );
};

export default Cart;
