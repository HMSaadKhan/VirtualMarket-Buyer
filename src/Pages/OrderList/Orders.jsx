import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import orderService from "../../Services/OrderService";
import { Card, CardContent, Button } from "@mui/material";
import Auth from "../../AuthWrapper/IsLoginFalse";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/styles";
import { toast } from "react-toastify";
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
                            <Typography noWrap sx={{ width: "30ch" }}>
                              {order._id}
                            </Typography>
                          </Box>
                          <Links
                            onClick={() => {
                              history.push("/orderdetail/" + order._id);
                            }}
                          >
                            View
                          </Links>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                              xs: "start",
                              sm: "start",
                              md: "center",
                              lg: "center",
                            },
                            flexDirection: {
                              xs: "column",
                              sm: "column",
                              md: "row",
                              lg: "row",
                            },
                            height: {
                              xs: "60",
                              sm: "60",
                              md: "50",
                              lg: "50",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Typography color="primary">
                              Order From&nbsp;
                            </Typography>
                            <Typography
                              sx={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => {
                                history.push("/seller/" + order.Seller._id);
                              }}
                            >
                              {order.Seller.storeName}
                            </Typography>
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
