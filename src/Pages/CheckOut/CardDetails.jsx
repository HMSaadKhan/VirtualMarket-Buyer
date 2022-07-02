/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cartService from "../../Services/CartServices";
import LoadingScreen from "../../Components/LoadingScreen";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Inputs } from "../../Styles/StyledInput";
import { useContext } from "react";
import { CartCountContext } from "../../Contexts/CartChanger/CartChanger";

const CardDetails = ({
  name,
  phone,
  address,
  city,

  getCartItems,
  cartId,
  advancePayment,
  totalPayment,
  onlinePaymentOption,
  specialInstructions,
}) => {
  const [bool, setbool] = useState(false);
  const cartCount = useContext(CartCountContext);

  const [advanceAmount, setadvanceAmount] = useState();

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
    if (!onlinePaymentOption) {
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

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (paymentMethod) {
      const { id } = paymentMethod;
      setbool(true);

      OnlinePayment(id);
    }
  };
  const paymentProceed = async () => {
    console.log("COD run");
    setbool(true);
    await cartService
      .OnlinePayment(cartId, {
        name,
        address,
        phone,
        city,
        advanceAmount,
        specialInstructions,
      })
      .then((data) => {
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          getCartItems();
          cartCount.setChanger(data);
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
      .OnlinePayment(cartId, {
        id,
        name,
        address,
        phone,
        city,
        advanceAmount,
        specialInstructions,
      })
      .then((data) => {
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          getCartItems();
          cartCount.setChanger(data);

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
        {onlinePaymentOption && (
          <>
            <Box sx={{ display: "flex ", alignItems: "center" }}>
              <Typography
                color="primary"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Advance Payment
              </Typography>
              <Typography
                sx={{ color: "#eeeee", fontWeight: "bold", fontSize: "10px" }}
              >
                {advancePayment > 0 ? <>(required)</> : <>(optional)</>}
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
