/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@material-ui/styles";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import cartService from "../../Services/CartServices";

const CardDetails = ({
  name,
  phone,
  address,
  city,
  getId,
  onlinePaymentCheck,
}) => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    onlinePaymentCheck(event.target.checked);
  };
  const stripe = useStripe();
  const elements = useElements();
  const [Id, setId] = React.useState();

  const createPayment = async () => {
    if (elements === null) {
      console.log("i returned");
      return;
    }
    console.log("i not returned");

    const x = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log("here");

    console.log(x);

    // console.log(error);

    // console.log(paymentMethod);
    // const { id } = paymentMethod;
    // console.log(id);
    // getId(id);
  };
  useEffect(createPayment, [checked]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (elements == null) {
  //     return;
  //   }

  //   const { paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //   });

  //   const { id } = paymentMethod;
  //   setId(id);
  // };
  // const paymentProceed = async () => {
  //   console.log(Id);
  //   await cartService
  //     .OnlinePayment({ id: Id, name, address, phone, city })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: "#ba6a62",
            }}
            checked={checked}
            onChange={handleChange}
          />
        }
        label={
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
          >
            Online Payment
          </Typography>
        }
      />
      {checked ? <CardElement /> : <></>}
    </>
  );
};
export default CardDetails;
