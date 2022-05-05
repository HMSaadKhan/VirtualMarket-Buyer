import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import cartService from "../../Services/CartServices";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "30px",
    margin: "auto",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
}));

const CartItems = (props) => {
  console.log(props.item);
  const classes = useStyles();
  const { getCartItems, getProductId, item } = props;
  const qty = item.quantity;
  const _id = props.item._id;
  const [samplePrice, setsamplePrice] = useState(0);
  const [check, setcheck] = useState(false);
  const checkDisable = () => {
    if (item.type === "SAMPLE") {
      setcheck(true);
    } else {
      setcheck(false);
    }
  };
  useEffect(checkDisable, []);
  const plusButton = async () => {
    await cartService
      .incQty(_id)
      .then((e) => {
        console.log(e);
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const minusButton = async () => {
    await cartService
      .decQty(_id)
      .then((e) => {
        console.log(e);
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteButton = async () => {
    await cartService
      .deleteItem(_id)
      .then((e) => {
        console.log(e);

        getProductId(_id);
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Card sx={{ width: 800, margin: "10px" }}>
        <Box className={classes.root}>
          <Box sx={{ width: "20%" }}>
            <img className={classes.image} src={item.product.images[0].link} />
          </Box>
          <Box sx={{ width: "25%" }}>
            <Typography>{item.product.name}</Typography>
            {item.type == "DEFAULT" ? (
              <></>
            ) : (
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {item.type}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography sx={{ color: "#ba6a62" }}>
              PKR.{item.product.price}
            </Typography>
          </Box>
          <Box sx={{ width: "30%" }}>
            <Box
              sx={{
                display: "flex ",
                alignItems: "center",
              }}
            >
              <IconButton disabled={check}>
                <Remove onClick={minusButton} />
              </IconButton>
              <Box sx={{ width: "50%" }}>
                <TextField size="small" value={qty} />
              </Box>
              <IconButton disabled={check}>
                <Add onClick={plusButton} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#ba6a62",
              }}
            >
              PKR.{item.totalPrice}
            </Typography>
          </Box>
          <Box>
            <Delete onClick={deleteButton} />
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default CartItems;
