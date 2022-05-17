import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Divider } from "@mui/material/";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import orderService from "../../Services/OrderService";
import CommentWriting from "../../Components/PopUps/CommentWriting";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // // justifyContent: "center",
    // transform: "translate(-50%, -50%)",
    // alignItems: "center"
  },
}));

export default function OrderItems({ items, orderStatus, orderId }) {
  const classes = useStyles();
  console.log(items);
  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography>{items.productName}</Typography>
        </Box>
        <Box sx={{ width: "25%" }}>
          <Typography>{items.quantity}</Typography>
        </Box>
        <Box sx={{ width: "25%" }}>
          <Typography>{items.totalPrice}</Typography>
        </Box>
        {orderStatus === "DELIVERED" && items.reviewed === false ? (
          <Box sx={{ width: "25%" }}>
            <CommentWriting orderId={orderId} itemId={items._id} />
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Divider />
    </>
  );
}
