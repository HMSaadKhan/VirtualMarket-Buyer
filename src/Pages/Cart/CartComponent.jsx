import React, { useEffect } from "react";
import { RadioGroup, Card, CardContent, Checkbox } from "@mui/material";
import useState from "react-usestateref";
import CartItems from "./CartItems";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Labels } from "../../Styles/MyTypographies";
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
  const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    setcartId(cart._id);
  }, []);

  const handleRadio = (e) => {
    if (cart.seller._id == e.target.value) {
      setdeliveryCharge(cart.seller.deliveryCharge);
      setsubtotal(cart.subTotal);
      settotal(cart.total);
    }
  };

  return (
    <>
      <Card sx={{ width: 600, marginBottom: "20px" }}>
        <CardContent>
          <FormControlLabel
            value={cart.seller._id}
            label={cart.seller.storeName}
            control={<Radio />}
            onChange={handleRadio}
          />

          {cart.items.map((item) => {
            return (
              <>
                {/* <FormControlLabel
              control={
                <Radio
                  checked={checked}
                  onChange={handleRadio}
                  value={cart.seller._id}
                  name="radio-buttons"
                />
              }
              // control={<Checkbox checked={checked} onChange={handleChange} />}
              label={<Labels>{cart.seller._id}</Labels>}
            /> */}

                {console.log("Cart Component" + cartId)}
                <CartItems
                  cartId={cartId}
                  item={item}
                  key={item._id}
                  getCartItems={getCartItems}
                  getProductId={getProductId}

                  // productQtyChange={productQtyChange}
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
