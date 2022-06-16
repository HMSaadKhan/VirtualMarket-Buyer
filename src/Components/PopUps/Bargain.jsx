import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material/";
import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import Counter from "../Counter";
import DateTimePicker from "react-datetime-picker";
import Radio from "@mui/material/Radio";
import scheduleService from "../../Services/ScheduleService";
import { NameBar } from "../../Styles/NameBar";
import { HeadingText, Labels } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";
import { CalendarTodayOutlined, Delete } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";

import { styled } from "@mui/material/styles";
import bargainService from "../../Services/BargainService";

const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    maxHeight: 350,
  },
});

export default function Bargain(props) {
  const { productDetails, bool, setbool } = props;
  const classes = useStyles();
  const [price, setprice] = React.useState();
  const [quantity, setquantity] = React.useState();

  const handleClose = () => {
    setbool(!bool);
  };
  const OfferSend = () => {
    bargainService
      .sendOffer({ product: productDetails._id, price, quantity })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog open={bool} onClose={handleClose}>
        <NameBar name={"Bargain"} />
        <DialogContent>
          <div className={classes.root}>
            {productDetails ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      display: "flex ",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                      width: "100px",
                    }}
                  >
                    <Box>
                      <img
                        height="100%"
                        width="100%"
                        objectFit="contain"
                        src={productDetails.images[0].link}
                        alt=""
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          sx={{ color: "#ba6a62", fontWeight: "bold" }}
                        >
                          {productDetails.name}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <FlexBox>
                          <Typography
                            sx={{
                              color: "#ba6a62",
                              fontWeight: "bold",
                            }}
                          >
                            Brand:
                          </Typography>
                          <Typography>{productDetails.brand}</Typography>
                        </FlexBox>
                        <FlexBox>
                          <Typography
                            sx={{
                              color: "#ba6a62",
                              fontWeight: "bold",
                            }}
                          >
                            Price:
                          </Typography>
                          <Typography>
                            {productDetails.price + " Rs"}{" "}
                          </Typography>
                        </FlexBox>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ) : (
              <></>
            )}
            <Box>
              <Typography
                sx={{
                  color: "#ba6a62",
                  fontWeight: "bold",
                }}
              >
                Quantity:
              </Typography>
              <TextField
                value={quantity}
                onChange={(e) => {
                  setquantity(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">pieces</InputAdornment>
                  ),
                }}
              />
              <Typography
                sx={{
                  color: "#ba6a62",
                  fontWeight: "bold",
                }}
              >
                Price Offer:
              </Typography>
              <TextField
                fullWidth
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">RS</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "end",
              }}
            >
              <Button
                sx={{ margin: "10px" }}
                variant="contained"
                onClick={OfferSend}
              >
                offer
              </Button>
              <Button
                sx={{ margin: "10px" }}
                variant="contained"
                onClick={(e) => {
                  setbool(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
