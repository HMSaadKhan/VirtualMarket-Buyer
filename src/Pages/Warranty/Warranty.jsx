import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import WarrantyComponent from "./WarrantyComponent";
import { makeStyles } from "@mui/styles";
import Auth from "../../AuthWrapper/Auth";
import warrantyService from "../../Services/WarrantyService";
import { NameBar } from "../../Styles/NameBar";

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
      <NameBar name={"Warranty"} />

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
