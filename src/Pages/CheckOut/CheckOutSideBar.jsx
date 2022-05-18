import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { HeadingText } from "../../Styles/MyTypographies";

export default function CheckOutSideBar(props) {
  const {
    cartValues,
    deliveryCharge,
    handleCOD,
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
  const delivery_charge = deliveryCharge;

  return (
    <Box>
      {cartValues ? (
        <Box m={5} sx={{ width: 250 }}>
          <Card sx={{ backgroundColor: "white", maxWidth: 300 }}>
            <CardContent>
              <HeadingText>Cart Total</HeadingText>
              <Typography m={1} sx={{ display: "flex " }}>
                Subtotal
                <Box ml={8}>
                  <Typography>PKR.{cartValues.subTotal}</Typography>
                </Box>
              </Typography>
              <Typography m={1} sx={{ display: "flex " }}>
                Shipping{" "}
                <Box ml={8}>
                  <Typography>PKR.{delivery_charge}</Typography>
                </Box>
              </Typography>
              <Divider />
              <Typography m={1} sx={{ display: "flex " }}>
                total{" "}
                <Box ml={12}>
                  <Typography>PKR.{cartValues.total}</Typography>
                </Box>
              </Typography>
              <Divider />
              <HeadingText>Shipping Details</HeadingText>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  "& .MuiSelect-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  value={name}
                  label="Name"
                  InputLabelProps={{ shrink: name ? true : false }}
                  onChange={(e) => {
                    handleName(e.target.value);
                  }}
                />
                <TextField
                  value={phone}
                  label="Phone"
                  size="small"
                  InputLabelProps={{ shrink: phone ? true : false }}
                  onChange={(e) => {
                    handlePhone(e.target.value);
                  }}
                />
                <TextField
                  value={address}
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
