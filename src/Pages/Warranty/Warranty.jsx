import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import WarrantyComponent from "./WarrantyComponent";
import { makeStyles } from "@mui/styles";
import Auth from "../../AuthWrapper/IsLoginFalse";
import warrantyService from "../../Services/WarrantyService";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
const Warranty = (props) => {
  const [loading, setloading] = useState(false);
  const [warranties, setwarranties] = useState();
  const getWarranties = () => {
    setloading(true);
    warrantyService.getWarranty().then((warranty) => {
      console.log(warranty.data);
      setloading(false);
      setwarranties(warranty.data);
    });
  };
  useEffect(getWarranties, []);
  const classes = useStyles();
  return (
    <Auth>
      <LoadingScreen bool={loading} />
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
