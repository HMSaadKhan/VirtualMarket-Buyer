import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import orderService from "../../Services/OrderService";
import OrderComponent from "./OrderComponent";

import Auth from "../../AuthWrapper/Auth";
import { NameBar } from "../../Styles/NameBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
    <Auth>
      <NameBar name={"Orders"} />

      <Box className={classes.root}>
        <Box sx={{ width: "50%" }}>
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
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  No Orders Yet
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Auth>
  );
}
