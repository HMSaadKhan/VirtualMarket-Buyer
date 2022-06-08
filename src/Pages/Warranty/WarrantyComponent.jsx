import React from "react";
import { Card, Typography, Box, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClaimWriting from "../../Components/PopUps/ClaimWriting";

import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",

    alignItems: "center",
    justifyContent: "space-between",
  },
});

const WarrantyComponent = ({ warranty, getWarranties }) => {
  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginTop: "5%", marginBottom: "5%" }}>
        <Card>
          <CardContent>
            <Box
              className={classes.root}
              sx={{ flexDirection: { xs: "column", sm: "column", lg: "row" } }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography>{warranty.productName}</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography align="center" sx={{ color: "#ba6a62" }}>
                  {"Qty:" + warranty.quantity}
                </Typography>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography align="center">
                  {moment(new Date(warranty.createdAt)).format("MMMM Do YYYY")}
                </Typography>
              </Box>
              <Box sx={{ width: "100%", color: "red" }}>
                <Typography align="center">
                  {moment(new Date(warranty.expiry)).format("MMMM Do YYYY")}
                </Typography>
              </Box>
              <Box sx={{ width: "100%", fontWeight: "bold" }}>
                <Typography align="center" sx={{ fontWeight: "bold" }}>
                  {warranty.status}
                </Typography>
              </Box>
              <Box>
                <ClaimWriting
                  id={warranty._id}
                  status={warranty.status}
                  getWarranties={getWarranties}
                />
              </Box>
            </Box>
            {warranty.sellerComment ? (
              <>
                {" "}
                <Box>
                  <Typography sx={{ fontWeight: "bold", color: "#ba6a62" }}>
                    Seller Remarks:
                  </Typography>
                  {warranty.sellerComment}
                </Box>
              </>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default WarrantyComponent;
