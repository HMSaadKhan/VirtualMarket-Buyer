import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CheckOutSideBar from "./CheckOutSideBar";
import ItemCard from "./ItemCard";
import CardDetails from "./CardDetails";
import cartService from "../../Services/CartServices";
//import CartItems from "../Cart/CartItems";
import { useHistory } from "react-router-dom";
import cityService from "../../Services/CityService";
import Auth from "../../AuthWrapper/IsLoginFalse";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { HeadingText } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";
import { toast } from "react-toastify";
import LoadingScreen from "../../Components/LoadingScreen";

const useStyles = makeStyles({
  textField: {
    display: "flex",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  cardDetails: {},
  innerContainer: { display: "flex", flexDirection: "column", width: 800 },
});

export default function CheckOut(props) {
  const { stateChanged } = props;
  const history = useHistory();

  const classes = useStyles();

  const [cartItem, setCartItem] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const [deliveryCharge, setdeliveryCharge] = useState();
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setphone] = useState("");
  const [cities, setcities] = useState([]);
  const [bool, setbool] = useState(false);
  const [onlinePaymentOption, setonlinePaymentOption] = useState();
  const getCities = () => {
    cityService
      .GetCities()
      .then((data) => {
        setcities(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getCities, []);

  const selectChange = (e) => {
    setCity(e.target.value);
  };

  const getCartItems = () => {
    cartService
      .getCart()
      .then((data) => {
        setCartItem(data.items);
        setCartValues(data);
        setdeliveryCharge(data.seller.deliveryCharge);
      })
      .catch((err) => {
        setCartItem(null);
        setCartValues(null);
        setdeliveryCharge(null);
        console.log(err.response.data);
      });
  };

  useEffect(getCartItems, []);

  const getDeliveryDetails = () => {
    cartService
      .buyerDeliveryDetails()
      .then((data) => {
        setname(data.data.name);
        setaddress(data.data.address);
        setCity(data.data.city._id);
        setphone(data.data.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getDeliveryDetails, []);

  const paymentProceed = async () => {
    setbool(true);
    await cartService
      .CashOnDelivery({ name, address, phone, city })
      .then((data) => {
        setTimeout(() => {
          getCartItems();
          stateChanged(data);
          setbool(false);
          history.push("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setbool(false);
      });
  };

  const handleName = (data) => {
    setname(data);
  };
  const handleAddress = (data) => {
    setaddress(data);
  };

  const handlePhone = (data) => {
    setphone(data);
  };
  const PaymentMethods = () => {
    cartService.SellerPaymentMethod().then((data) => {
      setonlinePaymentOption(data.data.onlinePaymentOption);
    });
  };
  useEffect(PaymentMethods, []);

  const stripePromise = loadStripe(
    "pk_test_51KgTkABawPiCT74LKv8JcHCRedbnbeBQb2kmzemxbOEPLeYXn59W9vFsq7bT7d3fvgtYqAWYOdF7ZetxUcHutVAP00a87p6k3l"
  );
  return (
    <Auth>
      <LoadingScreen bool={bool} />
      {cartItem ? (
        <>
          <Box className={classes.root}>
            <Box m={2}>
              <HeadingText>Make Your CheckOut Here</HeadingText>
              <Card sx={{ width: 600 }}>
                <CardContent>
                  {cartItem.map((item) => (
                    <ItemCard item={item} key={item._id} />
                  ))}
                </CardContent>
              </Card>
              <br />

              {onlinePaymentOption ? (
                <Elements stripe={stripePromise}>
                  <CardDetails
                    name={name}
                    phone={phone}
                    address={address}
                    city={city}
                    getCartItems={getCartItems}
                    stateChanged={stateChanged}
                  />
                </Elements>
              ) : (
                <>
                  <StyledButton onClick={paymentProceed}>Proceed</StyledButton>
                </>
              )}
            </Box>
            {cartValues ? (
              <CheckOutSideBar
                deliveryCharge={deliveryCharge}
                cartValues={cartValues}
                phone={phone}
                handlePhone={handlePhone}
                name={name}
                handleName={handleName}
                cities={cities}
                city={city}
                selectChange={selectChange}
                address={address}
                handleAdress={handleAddress}
              />
            ) : (
              <></>
            )}
          </Box>
        </>
      ) : (
        <>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
          >
            Add products to cart
          </Typography>
        </>
      )}
    </Auth>
  );
}
