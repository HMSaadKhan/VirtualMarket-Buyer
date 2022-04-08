import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: "15px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ba6a62",
  },
  button: {
    color: "#ffff",
    backgroundColor: "#ba6a62",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#ba6a67",
      color: "#fafafa",
    },
  },
  headingText: { fontSize: "15px", fontWeight: "bold", color: "#ba6a62" },
  subText: { color: "secondary" },
  description: { height: "150px", width: "auto", overflow: "auto" },
}));

export default function BasicGrid() {
  const classes = useStyles();
  return (
    <Box>
      <Box>
        <Typography className={classes.name}>Name</Typography>
        <Typography className={classes.price}>PKR. Price</Typography>
      </Box>
      <Box className={classes.description}>
        <Typography mt={2} mb={2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.headingText}>Warranty Period</Typography>
        <Typography className={classes.subText}>Days: Price</Typography>
        <Typography className={classes.headingText}>Available Stock</Typography>
        <Typography className={classes.subText}>pieces</Typography>
      </Box>
      <Box>
        <Button className={classes.button}>Add to cart</Button>
        <Button className={classes.button}>Bargain</Button>
        <Button className={classes.button}>Custom Order</Button>
      </Box>
    </Box>
  );
}
