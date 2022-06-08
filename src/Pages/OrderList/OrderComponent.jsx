import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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

const useStyles = makeStyles((theme) => ({
  text: {
    color: "black",
  },
}));

export default function OrderComponent({ order, ChangeOrderStatus }) {
  const classes = useStyles();
  const [index, setindex] = useState();

  const ButtonLabel = () => {
    if (order.status === "PLACED") {
      setindex(1);
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
  useEffect(ButtonLabel, []);

  return (
    <Box m={2}>
      <Card
        sx={{
          backgroundColor: "#fafafa",
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
          <Card sx={{ margin: "10px" }}>
            <CardContent>
              <Box
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
                  <OrderComponentHeading>Order# </OrderComponentHeading>
                  <Typography>{order._id}</Typography>
                </FlexBox>
                <FlexBox>
                  <OrderComponentHeading>Order Type: </OrderComponentHeading>
                  <Typography> {order.type}</Typography>
                </FlexBox>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ margin: "10px" }}>
            <CardContent>
              {order.items.map((items) => (
                <OrderItems
                  orderId={order._id}
                  orderStatus={order.status}
                  items={items}
                  key={items._id}
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
            <Card sx={{ margin: "10px" }}>
              <CardContent>
                <OrderComponentHeading>Shipping Details</OrderComponentHeading>
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
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ margin: "10px" }}>
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
      <Divider />
    </Box>
  );
}
