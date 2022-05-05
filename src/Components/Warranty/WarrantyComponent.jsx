import React from "react";
import { Card, Typography, Box, CardContent } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ClaimWriting from "../PopUps/ClaimWriting";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

const WarrantyComponent = (props) => {
  const classes = useStyles();

  return (
    <Box sx={{ width: 500, marginTop: "5%", marginBottom: "5%" }}>
      <Card>
        <CardContent>
          <Box className={classes.root}>
            <Box sx={{ width: "100%" }}>
              <Typography>name</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#ba6a62" }}>Quantity</Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography>Warranty Date</Typography>
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
