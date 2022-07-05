import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useHistory } from "react-router-dom";
import Select from "@mui/material/Select";
import { Button, MenuItem } from "@mui/material";
import { HeadingText } from "../../Styles/MyTypographies";
import { FlexBox } from "../../Styles/StyledBox";

export default function CheckOutSideBar(props) {
  const {
    cartValues,
    deliveryCharge,
    handleName,
    name,
    address,
    handleAddress,
    handlePhone,
    phone,
    selectChange,
    cities,
    city,
  } = props;
  const [check, setcheck] = React.useState(true);
  const history = useHistory();
  return (
    <Box>
      {cartValues ? (
        <Box m={5} sx={{ width: 250 }}>
          <Card sx={{ backgroundColor: "white", maxWidth: 300 }}>
            <CardContent>
              <HeadingText>Cart Total</HeadingText>
              <FlexBox sx={{ justifyContent: "space-between" }}>
                <Typography>Subtotal</Typography>
                <Typography align="left">PKR.{cartValues.subTotal}</Typography>
              </FlexBox>
              <FlexBox sx={{ justifyContent: "space-between" }}>
                <Typography>Shipping</Typography>
                <Typography>PKR.{deliveryCharge}</Typography>
              </FlexBox>
              <Divider />
              <FlexBox sx={{ justifyContent: "space-between" }}>
                <Typography>Total</Typography>
                <Typography>PKR.{cartValues.total}</Typography>
              </FlexBox>
              <Divider />
              <FlexBox sx={{ justifyContent: "space-between" }}>
                <Box sx={{ width: "50%" }}>
                  <Typography>Advance</Typography>
                </Box>
                <Typography>PKR.{cartValues.advance}</Typography>
              </FlexBox>
              <FlexBox sx={{ justifyContent: "space-between" }}>
                <Box sx={{ width: "50%" }}>
                  <Typography>Cash on Delivery</Typography>
                </Box>
                <Typography>PKR.{cartValues.cashOnDelivery}</Typography>
              </FlexBox>

              <Divider />
              <Box
                sx={{
                  display: "flex ",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <HeadingText>Shipping Details</HeadingText>
                <Button
                  onClick={() => {
                    history.push("/accountsettings");
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  "& .MuiSelect-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  disabled={check}
                  value={name}
                  label="Name"
                  InputLabelProps={{ shrink: name ? true : false }}
                  onChange={(e) => {
                    handleName(e.target.value);
                  }}
                />
                <TextField
                  disabled={check}
                  value={phone}
                  label="Phone"
                  size="small"
                  InputLabelProps={{ shrink: phone ? true : false }}
                  onChange={(e) => {
                    handlePhone(e.target.value);
                  }}
                />
                <TextField
                  disabled={check}
                  value={address}
                  multiline
                  label="Address"
                  size="small"
                  InputLabelProps={{ shrink: address ? true : false }}
                  onChange={(e) => {
                    handleAddress(e.target.value);
                  }}
                />
                <Box ml={1} mt={0.5} mb={0.5}>
                  <FormControl sx={{ minWidth: 215 }}>
                    <InputLabel>City</InputLabel>

                    <Select
                      disabled={check}
                      label="City"
                      size="small"
                      value={city}
                      onChange={(e) => {
                        selectChange(e);
                      }}
                    >
                      {cities.map((item) => (
                        <MenuItem key={item} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
