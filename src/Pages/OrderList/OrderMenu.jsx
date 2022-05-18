import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#ba6a62",
    backgroundColor: "#fff",
    marginLeft: "10px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#ba6a62",
      color: "#ffff",
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function OrderMenu() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <Card className={classes.root}>
        <>
          <Button
            className={classes.button}
            onClick={(e) => {
              history.push("/AccountSettings");
            }}
          >
            Account Details
          </Button>
          <Button
            className={classes.button}
            onClick={(e) => {
              history.push("/changepassword");
            }}
          >
            Change Password
          </Button>
          <Button
            className={classes.button}
            onClick={(e) => {
              history.push("/orders");
            }}
          >
            Orders
          </Button>
        </>
      </Card>
    </Box>
  );
}
