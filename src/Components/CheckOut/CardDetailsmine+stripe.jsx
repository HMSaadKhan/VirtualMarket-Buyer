import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@material-ui/styles";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) => ({
  textField: {
    display: "flex",
  },
  cssLabel: {
    color: "#ba6a62",
  },
}));

export default function CardDetails() {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [Id, setId] = React.useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const { id } = paymentMethod;
    setId(id);
  };
  return (
    <div>
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
        <>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
          >
            Card Details
          </Typography>
          <Box>
            <Card m={1}>
              <CardContent className={classes.textField}>
                <Box
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "25ch",
                    },

                    width: 250,
                    m: 1,
                  }}
                >
                  <TextField label="Name" size="small" />
                  <CardCvcElement />
                </Box>
                <Box
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "25ch",
                    },
                    width: 250,
                    m: 1,
                  }}
                >
                  <Box>
                    <CardNumberElement />
                  </Box>
                  <Box>
                    <CardExpiryElement />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
