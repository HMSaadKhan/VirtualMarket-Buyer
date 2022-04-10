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
  console.log(props);
  const { shippingDetails } = props;
  const classes = useStyles();
  const [cartItem, setCartItem] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const [deliveryCharge, setdeliveryCharge] = useState();
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [phone, setphone] = useState();
  const [onlinePaymentOption, setonlinePaymentOption] = useState();
  const getCartItems = async () => {
    await cartService
      .getCart()
      .then((data) => {
        console.log(data);
        setCartItem(data.items);
        console.log("get cart items");
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
        console.log(data.data);
        console.log("get Delivery Details");
        setname(data.data.name);
        setaddress(data.data.address);
        setcity(data.data.city.name);
        setphone(data.data.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getDeliveryDetails, [CartItems]);

  const handleName = (data) => {
    console.log(data);
    setname(data);
  };
  const handleAddress = (data) => {
    console.log(data);
    setaddress(data);
  };
  const handleCity = (data) => {
    console.log(data);
    setcity(data);
  };
  const handlePhone = (data) => {
    console.log(data);
    setphone(data);
  };
  const PaymentMethods = () => {
    cartService
      .SellerPaymentMethod()
      .then((data) => {
        console.log(data.data.onlinePaymentOption);
        setonlinePaymentOption(data.data.onlinePaymentOption);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(PaymentMethods, []);
  const paymentProceed = async () => {
    await cartService
      .CashOnDelivery({ name, address, phone, city })
      .then((data) => {
        console.log(data);
        props.stateChanged(data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className={classes.root}>
      <Box m={2}>
        <Typography sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}>
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
        {console.log(onlinePaymentOption)}
        {onlinePaymentOption ? <CardDetails /> : <></>}
      </Box>
      {cartValues ? (
        <CheckOutSideBar
          deliveryCharge={deliveryCharge}
          cartValues={cartValues}
          phone={phone}
          handlePhone={handlePhone}
          name={name}
          handleName={handleName}
          city={city}
          handleCity={handleCity}
          address={address}
          handleAdress={handleAddress}
          paymentProceed={paymentProceed}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
