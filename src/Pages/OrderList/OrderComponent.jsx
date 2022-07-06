/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Card, Button } from "@mui/material/";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import OrderItems from "./OrderItems";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { OrderComponentHeading } from "../../Styles/MyTypographies";
import { FlexBox, SpaceBetween } from "../../Styles/StyledBox";
import LoadingScreen from "../../Components/LoadingScreen";
import { toast } from "react-toastify";

import orderService from "../../Services/OrderService";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  text: {
    color: "black",
  },
}));

export default function OrderComponent() {
  const orderId = useParams();
  const classes = useStyles();
  const [index, setindex] = useState();

  const [order, setorder] = useState("");
  const [loading, setloading] = useState(false);

  const Orders = () => {
    setloading(true);
    orderService
      .orderDetails(orderId.id)
      .then((data) => {
        setloading(false);
        setorder(data.data);
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  };
  useEffect(Orders, []);

  const ButtonLabel = () => {
    if (order.status === "PLACED") {
      setindex(1);
      console.log("Placed");
    }
    if (order.status === "PACKAGING") {
      setindex(2);
    }
    if (order.status === "SHIPPING") {
      setindex(3);
    }
    if (order.status === "DELIVERED" || order.status === "RETURNED") {
      setindex(4);
    }
  };
  useEffect(ButtonLabel, [order]);

  return (
    <Box
      m={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
        },
      }}
    >
      <LoadingScreen bool={loading} />
      {order && (
        <Card
          sx={{
            backgroundColor: "#fafafa",
            width: {
              xs: "800px",
              sm: "800px",
              md: "800px",
              lg: "800px",
              xl: "800px",
            },
          }}
        >
          <CardContent
            sx={{
              padding: {
                xs: "0",
                sm: "0",
                md: "20",
                lg: "20",
                xl: "20",
              },
            }}
          >
            <Box
              m={2}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                },

                justifyContent: "space-between",
              }}
            >
              <FlexBox>
                <OrderComponentHeading>Order#&nbsp; </OrderComponentHeading>
                <Typography>{order._id}</Typography>
              </FlexBox>
              <FlexBox>
                <Button
                  disabled={order.status !== "PLACED" ? true : false}
                  onClick={() => {
                    orderService
                      .cancelOrder(order._id)
                      .then((data) => {
                        console.log(data);
                        Orders();
                        toast.success(data.data, {
                          position: toast.POSITION.BOTTOM_LEFT,
                        });
                      })
                      .catch((error) => {
                        console.log(error.response);
                        toast.error(error.response.data, {
                          position: toast.POSITION.BOTTOM_LEFT,
                        });
                      });
                  }}
                >
                  cancel Order
                </Button>
              </FlexBox>
            </Box>
            <Typography
              ml={1}
              color="primary"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Products
            </Typography>
            <Card sx={{ margin: "10px" }}>
              <CardContent>
                {order.items.map((items) => (
                  <OrderItems
                    orderId={order._id}
                    orderStatus={order.status}
                    items={items}
                    key={items._id}
                    Orders={Orders}
                  />
                ))}
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                ml={1}
                color="primary"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Billing Details
              </Typography>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <SpaceBetween>
                    <OrderComponentHeading>Sub Total</OrderComponentHeading>
                    <Typography>PKR. {order.subTotal}</Typography>
                  </SpaceBetween>
                  <SpaceBetween sx={{ alignItems: "start" }}>
                    <Box sx={{ width: "25%" }}>
                      <OrderComponentHeading>
                        Delivery Charge
                      </OrderComponentHeading>
                    </Box>
                    <Typography>PKR. {order.deliveryCharge}</Typography>
                  </SpaceBetween>
                  <Divider />
                  <SpaceBetween>
                    <OrderComponentHeading>Total</OrderComponentHeading>
                    <Typography>PKR. {order.total}</Typography>
                  </SpaceBetween>
                  <Divider />
                  <SpaceBetween>
                    <OrderComponentHeading>Advance</OrderComponentHeading>
                    <Typography>PKR. {order.advance}</Typography>
                  </SpaceBetween>
                  <SpaceBetween>
                    <OrderComponentHeading>
                      Cash on Delivery
                    </OrderComponentHeading>
                    <Typography>PKR. {order.cashOnDelivery}</Typography>
                  </SpaceBetween>
                </CardContent>
              </Card>
              <Typography
                ml={1}
                color="primary"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Shipping Details
              </Typography>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <SpaceBetween>
                    <OrderComponentHeading>Name</OrderComponentHeading>
                    <Typography>{order.buyerName}</Typography>
                  </SpaceBetween>
                  <SpaceBetween sx={{ alignItems: "start" }}>
                    <OrderComponentHeading>Address</OrderComponentHeading>
                    <Box sx={{}}>
                      <Typography align="right" className={classes.text}>
                        {order.deliveryAddress}
                      </Typography>
                    </Box>
                  </SpaceBetween>
                  <SpaceBetween>
                    <OrderComponentHeading>City</OrderComponentHeading>
                    <Typography>{order.deliveryCity.name}</Typography>
                  </SpaceBetween>
                  <SpaceBetween>
                    <OrderComponentHeading>Phone</OrderComponentHeading>
                    <Typography>{order.buyerContact}</Typography>
                  </SpaceBetween>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ margin: "10px" }}>
              {console.log(index)}
              <Stepper activeStep={index} alternativeLabel>
                {order.events.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      {label.name}
                      <br />
                      {moment(new Date(label.date)).format("MMMM Do YYYY")}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
