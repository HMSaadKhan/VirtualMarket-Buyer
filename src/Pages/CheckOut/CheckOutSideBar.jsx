import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

const useStyles = makeStyles({
  textField: {
    display: "flex",
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
  },

  cardDetails: {},
  innerContainer: { display: "flex", flexDirection: "column", width: 800 },
});

export default function CheckOutSideBar(props) {
  const classes = useStyles();

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
    paymentProceed,
  } = props;
  const delivery_charge = deliveryCharge;
  const handleRadio = (e) => {
    handleCOD(e.target.value);
  };

  return (
    <Box>
      {cartValues ? (
        <Box m={5} sx={{ width: 250 }}>
          <Card sx={{ backgroundColor: "white" }}>
            <CardContent>
              <Typography
                m={1}
                sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
              >
                Cart Total
              </Typography>
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
              <Typography
                m={1}
                sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
              >
                Shipping Details
              </Typography>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  "& .MuiSelect-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  value={name}
                  label="Name"
                  size="small"
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
              <Divider />
              {/* <Box>
                <Typography
                  m={1}
                  sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
                >
                  Payment Method
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="COD"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="COD"
                      onChange={(e) => {
                        handleRadio(e);
                      }}
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Credit Card"
                      onChange={(e) => {
                        handleRadio(e);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box> */}
              <Divider />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
