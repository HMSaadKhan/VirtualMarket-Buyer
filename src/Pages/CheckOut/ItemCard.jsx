/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { HeadingText } from "../../Styles/MyTypographies";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
});

const ItemCard = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <Box className={classes.root}>
        <Box
          sx={{
            width: { xs: "50%", sm: "25%", md: "20%", lg: "25%" },
          }}
        >
          <img className={classes.image} src={item.product.images[0].link} />
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "center", lg: "space-around" },
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => {
                history.push("/" + item.product.name + "/" + item.product._id);
              }}
            >
              {item.product.name}
            </Typography>
            {item.type === "DEFAULT" ? (
              <></>
            ) : (
              <Typography sx={{}} color="text.secondary">
                {item.type}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ color: "#ba6a62" }}>
              PKR.{item.product.price}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "start",
                sm: "start",
                md: "center",
                lg: "center",
              },
            }}
          >
            <HeadingText>Qty:</HeadingText>
            <Typography>{item.quantity}</Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", color: "#ba6a62" }}>
              PKR.{item.totalPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default ItemCard;
