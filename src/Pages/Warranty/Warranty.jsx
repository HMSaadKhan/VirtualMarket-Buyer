import React, { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import WarrantyComponent from "./WarrantyComponent";
import { makeStyles } from "@mui/styles";
import Auth from "../../AuthWrapper/IsLoginFalse";
import warrantyService from "../../Services/WarrantyService";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";
import { useHistory } from "react-router-dom";
import { MidPager } from "../../Styles/MidPager";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
const Warranty = (props) => {
  const status = props.match.params.status;
  console.log(props);
  const [loading, setloading] = useState(false);
  const [warranties, setwarranties] = useState();
  const [error, seterror] = useState();
  const getWarranties = () => {
    setloading(true);
    warrantyService
      .getWarranty(status)
      .then((warranty) => {
        console.log(warranty.data);
        setloading(false);
        setwarranties(warranty.data);
      })
      .catch((error) => {
        console.log(error.response);
        setloading(false);
        seterror(error.response.data);
      });
  };
  useEffect(getWarranties, [status]);
  const history = useHistory();
  const classes = useStyles();
  return (
    <Auth>
      <LoadingScreen bool={loading} />
      <NameBar name={"Warranty"} />

      <Box
        sx={{
          display: "flex ",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: "50px",
        }}
      >
        <Box sx={{ display: "flex ", justifyContent: "center" }}>
          <Box sx={{ width: "50%" }}>
            <Box sx={{ display: "flex ", justifyContent: "center" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  history.push("/warranty/ACTIVE");
                }}
              >
                Active
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  history.push("/warranty/EXPIRED");
                }}
              >
                Expired
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.root}>
          {warranties ? (
            <Box>
              {warranties.map((warranty, index) => (
               
                  <WarrantyComponent
                    key={index}
                    warranty={warranty}
                    getWarranties={getWarranties}
                  />
               
              ))}
            </Box>
          ) : (
            <MidPager name={error} />
          )}
        </Box>
      </Box>
    </Auth>
  );
};

export default Warranty;
