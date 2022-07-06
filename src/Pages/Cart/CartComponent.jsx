import React, { useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import CartItems from "./CartItems";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useHistory } from "react-router-dom";

const CartComponent = ({
  cart,
  getCartItems,
  getProductId,
  setdeliveryCharge,
  setsubtotal,
  setradiochange,
  settotal,
  setcartId,
  cartId,

  radiochange,
}) => {
  const history = useHistory();
  //const classes = useStyles();
  useEffect(() => {
    setcartId(cart._id);
  }, [cart._id]);

  const handleRadio = (e) => {
    if (cart.seller._id === e.target.value) {
      setdeliveryCharge(cart.seller.deliveryCharge);
      setsubtotal(cart.subTotal);
      settotal(cart.total);
      setradiochange(cart.seller._id);
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
                  selectedCart={radiochange}
                  cartId={cartId}
                  cart={cart}
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
