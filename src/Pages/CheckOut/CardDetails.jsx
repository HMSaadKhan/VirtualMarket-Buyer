/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cartService from "../../Services/CartServices";
import { StyledButton } from "../../Styles/StyledButton";
import LoadingScreen from "../../Components/LoadingScreen";
import { Labels } from "../../Styles/MyTypographies";
import { useHistory } from "react-router-dom";

const CardDetails = ({
  name,
  phone,
  address,
  city,
  stateChanged,
  getCartItems,
}) => {
  const [checked, setChecked] = useState(true);
  const [bool, setbool] = useState(false);
  const [Id, setId] = useState();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

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
    OnlinePayment(id);
  };
  const paymentProceed = async () => {
    console.log("COD run");
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
  const OnlinePayment = async (id) => {
    console.log("OP run");

    console.log(Id, name, address, phone, city);
    await cartService
      .OnlinePayment({ id, name, address, phone, city })
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

  return (
    <>
      <LoadingScreen bool={bool} />
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={<Labels>Online Payment</Labels>}
      />
      {checked ? (
        <Box>
          <CardElement />
          <StyledButton disabled={!stripe || !elements} onClick={handleSubmit}>
            Place order
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
