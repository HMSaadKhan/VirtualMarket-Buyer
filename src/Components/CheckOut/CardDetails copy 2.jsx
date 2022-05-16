import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    display: "flex",
  },
  cssLabel: {
    color: "#ba6a62",
  },
}));

export default function CardDetails() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: "#ba6a62",
            }}
            checked={checked}
            onChange={handleChange}
          />
        }
        label={
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
          >
            Online Payment
          </Typography>
        }
      />
      {checked ? (
        <>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", color: "#ba6a62" }}
          >
            Card Details
          </Typography>
          <Box>
            <Card m={1}>
              <CardContent className={classes.textField}>
                <Box
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "25ch",
                    },

                    width: 250,
                    m: 1,
                  }}
                >
                  <TextField label="Name" size="small" />
                  <TextField label="CVC" size="small" />
                </Box>
                <Box
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "25ch",
                    },
                    width: 250,
                    m: 1,
                  }}
                >
                  <TextField label="Card Number" size="small" />
                  <TextField label="Expiry Date" size="small" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
