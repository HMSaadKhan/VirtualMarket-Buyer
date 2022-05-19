import React from "react";
import { Card, Typography, Box, CardContent, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClaimWriting from "../../Components/PopUps/ClaimWriting";

import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const WarrantyComponent = ({ warranty }) => {
  const classes = useStyles();
  console.log(new Date(warranty.expiry));
  console.log(warranty.expiry);
  return (
    <Box>
      <Box sx={{ width: 1000, marginTop: "5%", marginBottom: "5%" }}>
        <Card>
          <CardContent>
            <Box className={classes.root}>
              <Box sx={{ width: "100%" }}>
                <Typography>{warranty.productName}</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#ba6a62" }}>
                  {warranty.quantity}
                </Typography>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography>
                  {" "}
                  {moment(new Date(warranty.createdAt)).format("MMMM Do YYYY")}
                </Typography>
              </Box>
              <Box sx={{ width: "100%", color: "red" }}>
                <Typography>
                  {" "}
                  {moment(new Date(warranty.expiry)).format("MMMM Do YYYY")}
                </Typography>
              </Box>
              <Box sx={{ width: "100%", fontWeight: "bold" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {" "}
                  {warranty.status}
                </Typography>
              </Box>
              <Box>
                <ClaimWriting id={warranty._id} status={warranty.status} />
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
