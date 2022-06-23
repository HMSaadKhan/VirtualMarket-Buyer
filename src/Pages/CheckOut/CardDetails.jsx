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
import { TextField, Typography, Button } from "@mui/material";
import { Inputs } from "../../Styles/StyledInput";

const CardDetails = ({
  name,
  phone,
  address,
  city,
  stateChanged,
  getCartItems,
  cartId,
  advancePayment,
  totalPayment,
  onlinePaymentOption,
}) => {
  console.log(advancePayment);
  console.log(totalPayment);
  const [checked, setChecked] = useState(true);
  const [bool, setbool] = useState(false);
  const [Id, setId] = useState();
  const [advanceAmount, setadvanceAmount] = useState();
  const [proceedDisable, setproceedDisable] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  React.useEffect(() => {
    setadvanceAmount(advancePayment);
  }, [advancePayment]);

  const proceed = () => {
    if (onlinePaymentOption && advanceAmount === 0) {
      paymentProceed();
    }
    if (advanceAmount > 0) {
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (paymentMethod) {
      const { id } = paymentMethod;
      setbool(true);
      console.log(id);

      // if (paymentMethod.id) {
      OnlinePayment(id);
      // } else {
      //   paymentProceed();
      // }
    } else setproceedDisable(true);
  };
  const paymentProceed = async () => {
    console.log("COD run");
    setbool(true);
    await cartService
      .OnlinePayment(cartId, { name, address, phone, city, advanceAmount })
      .then((data) => {
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          getCartItems();
          stateChanged(data);
          setbool(false);
          history.push("/thankyou");
        }, 2000);
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

    console.log(id, name, address, phone, city, advanceAmount);
    await cartService
      .OnlinePayment(cartId, { id, name, address, phone, city, advanceAmount })
      .then((data) => {
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          getCartItems();
          stateChanged(data);
          setbool(false);
          history.push("/thankyou");
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
    <Box sx={{}}>
      <LoadingScreen bool={bool} />

      <Box>
        {/* {advanceAmount < totalPayment && advanceAmount >= advancePayment &&()} */}
      </Box>

      {/* <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={<Labels>Online Payment</Labels>}
      /> */}
      {/* {checked ? ( */}

      <Box>
        {onlinePaymentOption && (
          <>
            <Box sx={{ display: "flex ", alignItems: "center" }}>
              <Typography
                color="primary"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Online Payment
              </Typography>
              <Typography
                sx={{ color: "#eeeee", fontWeight: "bold", fontSize: "10px" }}
              >
                (optional)
              </Typography>
            </Box>
            <Inputs
              type="number"
              label="Advance Amount"
              value={advanceAmount}
              onChange={(e) => {
                setadvanceAmount(e.target.value);
              }}
            />
            {advanceAmount > 0 && (
              <>
                {" "}
                <Box mt={2}>
                  <Typography
                    mb={2}
                    color="primary"
                    sx={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    Card Details
                  </Typography>
                  <CardElement />
                </Box>
              </>
            )}
          </>
        )}
        <Box sx={{ display: "flex ", alignItems: "center" }}>
          <Typography
            color="primary"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Proceed
          </Typography>
        </Box>
        <Box mt={1}>
          <Button
            variant="contained"
            onClick={proceed}
            disabled={
              advanceAmount < advancePayment || advanceAmount > totalPayment
                ? true
                : false
            }
          >
            Place order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default CardDetails;
