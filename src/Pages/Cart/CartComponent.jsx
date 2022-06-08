import React, { useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import CartItems from "./CartItems";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CartComponent = ({
  cart,
  getCartItems,
  getProductId,
  setdeliveryCharge,
  setsubtotal,
  settotal,
  setcartId,
  cartId,
  key,
}) => {
  //const classes = useStyles();
  useEffect(() => {
    setcartId(cart._id);
  }, [cart._id]);

  const handleRadio = (e) => {
    if (cart.seller._id === e.target.value) {
      setdeliveryCharge(cart.seller.deliveryCharge);
      setsubtotal(cart.subTotal);
      settotal(cart.total);
      setcartId(cart._id);
    }
  };

  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          border: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <CardContent>
          <FormControlLabel
            value={cart.seller._id}
            label={"Items from '" + cart.seller.storeName + "'"}
            control={<Radio />}
            onChange={handleRadio}
          />

          {cart.items.map((item) => {
            return (
              <>
                <CartItems
                  cartId={cartId}
                  item={item}
                  key={item._id}
                  getCartItems={getCartItems}
                  getProductId={getProductId}
                />
              </>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default CartComponent;
