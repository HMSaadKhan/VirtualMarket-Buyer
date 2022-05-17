/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Button, fabClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import cartService from "../../Services/CartServices";
import { StyledButton } from "../../Styles/StyledButton";
import LoadingScreen from "../../Components/LoadingScreen";

// });

const CardDetails = ({
  name,
  phone,
  address,
  city,
  stateChanged,
  getCartItems,
}) => {
  const [checked, setChecked] = React.useState(true);
  const [bool, setbool] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    const { id } = paymentMethod;
    setbool(true);
    console.log(id);
    paymentProceed(id);
  };
  const paymentProceed = async (id) => {
    if (!checked) {
      setbool(true);
      await cartService
        .CashOnDelivery({ name, address, phone, city })
        .then((data) => {
          setTimeout(() => {
            getCartItems();
            stateChanged(data);
            setbool(false);
          }, 1000);
          stateChanged(data);
          // history.push("/");
          console.log(data);
        })
        .catch((err) => {
          setbool(false);
          console.log(err);
        });
    } else {
      await cartService
        .OnlinePayment({ id, name, address, phone, city })
        .then((data) => {
          // stateChanged(data);
          setbool(false);
          console.log(data);
        })
        .catch((err) => {
          toast.error(err.response.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });

          setbool(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      {console.log(bool)}
      <LoadingScreen bool={bool} />
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
      {checked ? (
        <Box>
          <CardElement />
          <StyledButton disabled={!stripe || !elements} onClick={handleSubmit}>
            Proceed
          </StyledButton>
        </Box>
      ) : (
        <Box>
          <StyledButton onClick={paymentProceed}>Proceed</StyledButton>
        </Box>
      )}
    </>
  );
};
export default CardDetails;
