import React from "react";

import { Box, Typography } from "@mui/material";
import WarrantyComponent from "./WarrantyComponent";
import { makeStyles } from "@material-ui/styles";
import MenuSideBar from "../MenuSideBar";
import Auth from "../AuthWrapper/Auth";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    backgroundColor: "#ba6a62",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ba6a64",
      color: "#ffff",
    },
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  clearCartButton: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "49%",
    paddingTop: "2%",
    marginBottom: "1%",
    width: "20%",
  },
}));
const Warranty = (props) => {
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
        <Box m={2}>
          <MenuSideBar />
        </Box>
        <Box className={classes.root}>
          <WarrantyComponent />
        </Box>
      </Box>
    </Auth>
  );
};

export default Warranty;
