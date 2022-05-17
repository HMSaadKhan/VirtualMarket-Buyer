import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";

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
  console.log(item);
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.root}>
        <Box sx={{ width: "20%" }}>
          <img className={classes.image} src={item.product.images[0].link} />
        </Box>
        <Box>
          <Typography>{item.product.name}</Typography>
          {item.type == "DEFAULT" ? (
            <></>
          ) : (
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              {item.type}
            </Typography>
          )}
        </Box>
        <Typography sx={{ color: "#ba6a62" }}>
          PKR.{item.product.price}
        </Typography>

        <Typography>{item.quantity}</Typography>

        <Typography sx={{ fontWeight: "bold", color: "#ba6a62" }}>
          PKR.{item.totalPrice}
        </Typography>
      </Box>
      <Divider />
    </div>
  );
};

export default ItemCard;
