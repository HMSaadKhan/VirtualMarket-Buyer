import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import orderService from "../../Services/OrderService";
import OrderComponent from "./OrderComponent";

import Auth from "../../AuthWrapper/IsLoginFalse";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    justifyContent: "center",
  },
}));

export default function Orders(props) {
  console.log(props);
  const classes = useStyles();

  const [orderDetails, setorderDetails] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const Orders = () => {
    setloading(true);
    orderService
      .GetOrders()
      .then((data) => {
        setloading(false);
        setorderDetails(data);
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        seterror(error.response.data);
      });
  };
  React.useEffect(Orders, []);

  return (
    <Auth>
      <LoadingScreen bool={loading} />
      <NameBar name={"Orders"} />

      <Box className={classes.root}>
        <Box>
          {orderDetails.length > 0 ? (
            <Box sx={{ backgroundColor: "red", width: "100%" }}>
              {orderDetails.map((order) => {
                return <OrderComponent order={order} key={order._id} />;
              })}
            </Box>
          ) : (
            <>
              {error}
              <Typography
                sx={{
                  display: "flex",
                  fontSize: "20px",
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Typography>
            </>
          )}
        </Box>
      </Box>
    </Auth>
  );
}
