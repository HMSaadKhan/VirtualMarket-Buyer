import * as React from "react";
import { Card, Box, Typography, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  cardHeadingText: { color: "text.secondary" },
  cardSubText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#ba6a62",
    marginBottom: 5,
  },
});

export default function SellerDetails({ productDetails }) {
  const classes = useStyles();

  return (
    <>
      <Box mb={1}>
        <Card>
          <CardContent>
            <Typography className={classes.cardHeadingText}>
              Shop Name
            </Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.seller.storeName}
            </Typography>

            <Typography className={classes.cardHeadingText}>Email</Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.seller.email}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mb={1}>
        <Card>
          <CardContent>
            <Typography className={classes.cardHeadingText}>
              Shop Address
            </Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.seller.address}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mb={1}>
        <Card>
          <CardContent>
            <Typography className={classes.headingText}>
              Warranty Period
            </Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.warrantyPeriod + " Days"}
            </Typography>

            <Typography className={classes.headingText}>
              Available Stock
            </Typography>
            <Typography className={classes.subText}>
              {productDetails.stock > productDetails.minOrder ? (
                <Typography sx={{ fontWeight: "bold", color: "green" }}>
                  {productDetails.stock + " Pieces"}
                </Typography>
              ) : (
                <Typography sx={{ fontWeight: "bold", color: "red" }}>
                  {productDetails.stock + " Pieces"}
                </Typography>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
