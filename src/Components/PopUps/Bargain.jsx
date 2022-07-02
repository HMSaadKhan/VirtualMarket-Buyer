import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { Box, Typography, Button, InputAdornment } from "@mui/material/";

import { makeStyles } from "@mui/styles";
import { NameBar } from "../../Styles/NameBar";
import { styled } from "@mui/material/styles";
import bargainService from "../../Services/BargainService";
import LoadingScreen from "../LoadingScreen";
import { Inputs } from "../../Styles/StyledInput";

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
  const { productDetails, bool, setbool, setmsgbool } = props;
  const classes = useStyles();
  const [price, setprice] = React.useState();
  const [quantity, setquantity] = React.useState();
  const [loading, setloading] = React.useState(false);

  const handleClose = () => {
    setbool(!bool);
    setquantity(null);
    setprice(null);
  };
  const OfferSend = () => {
    setloading(true);
    bargainService
      .sendOffer({ product: productDetails._id, price, quantity })
      .then((data) => {
        console.log(data);
        setbool(false);
        setmsgbool(true);
        setloading(false);
        setquantity(null);
        setprice(null);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response);
      });
  };

  return (
    <div>
      <LoadingScreen bool={loading} />
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
                      height: "60px",
                      width: "60px",
                    }}
                  >
                    <Box>
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
              <Inputs
                type="number"
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
              <Inputs
                type="number"
                fullWidth
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">PKR</InputAdornment>
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
