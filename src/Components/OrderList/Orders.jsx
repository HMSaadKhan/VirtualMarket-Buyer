import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import orderService from "../../Services/OrderService";
import OrderComponent from "./OrderComponent";
import OrderMenu from "./OrderMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
  },
}));

export default function Orders(props) {
  console.log(props);
  const status = props.match.params.status;
  const classes = useStyles();

  const [orderDetails, setorderDetails] = useState([]);
  const [orderItems, setorderItems] = useState();

  const Orders = () => {
    orderService
      .GetOrders()
      .then((data) => {
        console.log(data);
        setorderDetails(data);
      })
      .catch((data) => {
        console.log(data);
      });
  };
  React.useEffect(Orders, []);

  return (
    <Box className={classes.root}>
      <OrderMenu />
      <Box sx={{ width: "50%", marginLeft: "2%" }}>
        <Box>
          {orderDetails.length > 0 ? (
            <>
              {orderDetails.map((order) => (
                <OrderComponent order={order} key={order._id} />
              ))}
            </>
          ) : (
            <>
              <Typography
                ml={30}
                mt={25}
                sx={{ fontSize: "20px", fontWeight: "bold", color: "red" }}
              >
                No {status} Orders Yet
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
