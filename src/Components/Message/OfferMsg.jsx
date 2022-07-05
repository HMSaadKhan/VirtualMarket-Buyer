import React from "react";
import { Box, Card, Typography, Button, CardContent } from "@mui/material";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { CartCountContext } from "../../Contexts/CartChanger/CartChanger";
import cartService from "../../Services/CartServices";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "5px",
  flexWrap: "wrap",
});
const useStyles = makeStyles({
  image: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
  imagemsg: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
  },
  imageprev: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
});

export default function OfferMsg({ message, getMessages }) {
  const classes = useStyles();
  const cartCount = useContext(CartCountContext);
  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#fafafa",
          width: "300px",
        }}
      >
        <CardContent>
          {message.Offer.Product ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                {" "}
                <Box>
                  <img
                    className={classes.image}
                    src={message.Offer.Product.images[0].link}
                    alt=""
                  />
                </Box>
                <Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        color: "#ba6a62",
                        fontWeight: "bold",
                      }}
                    >
                      {message.Offer.Product.name}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <FlexBox>
                      <Typography
                        sx={{
                          color: "#ba6a62",
                          fontWeight: "bold",
                        }}
                      >
                        Brand:
                      </Typography>
                      <Typography>{message.Offer.Product.brand}</Typography>
                    </FlexBox>
                  </Box>
                </Box>
              </Box>
              <Box justifyContent="left">
                <FlexBox>
                  <Typography
                    sx={{
                      color: "#ba6a62",
                      fontWeight: "bold",
                    }}
                  >
                    Offered Price:&nbsp;
                  </Typography>
                  <Typography>{message.Offer.price + " PKR"}</Typography>
                </FlexBox>{" "}
                <FlexBox>
                  <Typography
                    sx={{
                      color: "#ba6a62",
                      fontWeight: "bold",
                    }}
                  >
                    Quantity:&nbsp;
                  </Typography>
                  <Typography>{message.Offer.quantity + " pieces"}</Typography>
                </FlexBox>
                <FlexBox>
                  <Typography
                    sx={{
                      color: "#ba6a62",
                      fontWeight: "bold",
                    }}
                  >
                    Offer Status:&nbsp;
                  </Typography>
                  <Typography>{message.Offer.status}</Typography>
                </FlexBox>
              </Box>
              <Button
                variant="contained"
                fullWidth
                disabled={message.Offer.status === "ACCEPTED" ? false : true}
                onClick={() => {
                  cartService
                    .addOffer(message.Offer._id)
                    .then((data) => {
                      console.log(data.data);
                      toast.success(data.data, {
                        position: toast.POSITION.BOTTOM_LEFT,
                      });
                      cartCount.setChanger(data);
                      getMessages();
                    })
                    .catch((error) => {
                      console.log(error.response);
                      toast.error(error.response.data, {
                        position: toast.POSITION.BOTTOM_LEFT,
                      });
                    });
                }}
              >
                Add to cart
              </Button>
            </>
          ) : (
            <Typography color="primary">Offer No Longer Available</Typography>
          )}
        </CardContent>
        <Typography pr={1} pb={1} align="right" sx={{ fontSize: "10px" }}>
          {moment(message.Offer.createdAt).format("LT")}
        </Typography>
      </Card>
    </div>
  );
}
