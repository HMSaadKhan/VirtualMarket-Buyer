import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import WarrantyComponent from "./WarrantyComponent";
import { makeStyles } from "@mui/styles";
import Auth from "../../AuthWrapper/Auth";
import warrantyService from "../../Services/WarrantyService";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
const Warranty = (props) => {
  const [warranties, setwarranties] = useState();
  const getWarranties = () => {
    warrantyService.getWarranty().then((warranty) => {
      setwarranties(warranty.data);
    });
  };
  useEffect(getWarranties, []);
  const classes = useStyles();
  return (
    <Auth>
      <Box sx={{ backgroundColor: "#ba6a62", color: "white" }}>
        <Typography
          sx={{
            marginLeft: "20%",
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Warranty
        </Typography>
      </Box>

      <Box sx={{ display: "flex ", justifyContent: "center" }}>
        <Box className={classes.root}>
          {warranties ? (
            <Box>
              {warranties.map((warranty, index) => (
                <WarrantyComponent key={index} warranty={warranty} />
              ))}
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Auth>
  );
};

export default Warranty;
