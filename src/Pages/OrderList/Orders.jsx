import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import orderService from "../../Services/OrderService";
import OrderComponent from "./OrderComponent";
import { Card, CardContent, Button } from "@mui/material";
import Auth from "../../AuthWrapper/IsLoginFalse";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/styles";
const Links = styled(Typography)({
  color: "black",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
    color: "#ba6a62",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    justifyContent: "center",
  },
}));

export default function Orders(props) {
  console.log(props);
  const classes = useStyles();
  const history = useHistory();

  const [orderDetails, setorderDetails] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const Orders = () => {
    setloading(true);
    orderService
      .GetOrders()
      .then((data) => {
        console.log(data);
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
            <Box sx={{ width: "100%" }}>
              {orderDetails.map((order) => {
                return (
                  <Box m={2}>
                    <Card sx={{ backgroundColor: "#fafafa" }}>
                      <CardContent
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Typography color="primary">
                              Order#&nbsp;
                            </Typography>
                            <Typography>{order._id}</Typography>
                          </Box>
                          <Links
                            onClick={() => {
                              history.push("/");
                            }}
                          >
                            View
                          </Links>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: {
                              xs: "column",
                              sm: "column",
                              lg: "row",
                            },
                            height: "50px",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Typography color="primary">
                              Order From&nbsp;
                            </Typography>
                            <Typography>{order.Seller.storeName}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography color="primary">
                              Placed On&nbsp;
                            </Typography>
                            <Typography>
                              {moment(order.createdAt).format("lll")}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography color="primary">
                              Status&nbsp;
                            </Typography>
                            <Typography>{order.status}</Typography>
                          </Box>

                          <Button>cancel Order</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <>
              <MidPager name={error} />
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
