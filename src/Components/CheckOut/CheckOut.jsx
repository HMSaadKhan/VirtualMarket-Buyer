import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";
import CheckOutSideBar from "./CheckOutSideBar";
import ItemCard from "./ItemCard";
import CardDetails from "./CardDetails";
import cartService from "../../Services/CartServices";
import CartItems from "../Cart/CartItems";
import { useHistory } from "react-router-dom";
import cityService from "../../Services/CityService";
import Auth from "../AuthWrapper/Auth";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const useStyles = makeStyles((theme) => ({
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
}));

export default function CheckOut(props) {
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
  const [onlinePaymentOption, setonlinePaymentOption] = useState();
  const [onlinePaymentProceed, setOnlinePaymentProceed] = useState();
  const [Id, setId] = React.useState();
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

  const getCartItems = async () => {
    await cartService
      .getCart()
      .then((data) => {
        setCartItem(data.items);
        setCartValues(data);
        setdeliveryCharge(data.seller.deliveryCharge);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getCartItems, []);
  const getDeliveryDetails = async () => {
    await cartService
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
  useEffect(getDeliveryDetails, [CartItems]);

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
    cartService
      .SellerPaymentMethod()
      .then((data) => {
        setonlinePaymentOption(data.data.onlinePaymentOption);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(PaymentMethods, []);

  const paymentProceed = async () => {
    if (!onlinePaymentProceed) {
      console.log(onlinePaymentProceed);
      await cartService
        .CashOnDelivery({ name, address, phone, city })
        .then((data) => {
          props.stateChanged(data);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await cartService
        .OnlinePayment({ id: Id, name, address, phone, city })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onlinePaymentCheck = (data) => {
    console.log(data);
    setOnlinePaymentProceed(data);
  };
  const onlinePaymentId = (data) => {
    console.log(data);
    setId(data);
  };

  const stripePromise = loadStripe(
    "pk_test_51KgTkABawPiCT74LKv8JcHCRedbnbeBQb2kmzemxbOEPLeYXn59W9vFsq7bT7d3fvgtYqAWYOdF7ZetxUcHutVAP00a87p6k3l"
  );
  return (
    <Auth>
      <Box className={classes.root}>
        <Box m={2}>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
          >
            Make Your CheckOut Here
          </Typography>
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
                onlinePaymentCheck={onlinePaymentCheck}
                onlinePaymentId={onlinePaymentId}
              />
            </Elements>
          ) : (
            <></>
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
            paymentProceed={paymentProceed}
          />
        ) : (
          <></>
        )}
      </Box>
    </Auth>
  );
}
