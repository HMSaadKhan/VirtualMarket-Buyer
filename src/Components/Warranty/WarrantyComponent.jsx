import React from "react";
import { Card, Typography, Box, CardContent } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ClaimWriting from "../PopUps/ClaimWriting";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const WarrantyComponent = ({ warranty }) => {
  const classes = useStyles();
  console.log(warranty);

  return (
    <Box sx={{ width: 500, marginTop: "5%", marginBottom: "5%" }}>
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
                {moment(warranty.createdAt).format("MMMM Do YYYY")}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", color: "red" }}>
              <Typography>
                {" "}
                {moment(warranty.expiry).format("MMMM Do YYYY")}
              </Typography>
            </Box>
            <Box>
              <ClaimWriting />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WarrantyComponent;
