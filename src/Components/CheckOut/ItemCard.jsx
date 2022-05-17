import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "30px",
    margin: "auto",
  },
}));

const ItemCard = ({ item }) => {
  const classes = useStyles();
  
  return (
    <div>
      <Box className={classes.root}>
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
