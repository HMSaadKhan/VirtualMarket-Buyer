import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import { Inputs } from "../../Styles/StyledInput";
import Counter from "../Counter";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "30px",
  },
});

export default function CommentsDisplay({ review }) {
  console.log(review);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box
      // sx={{
      //   width: {
      //     xs: "50%",
      //     sm: "50%",
      //     md: "30%",
      //     lg: "30%",
      //     xl: "30%",
      //   },
      // }}
      >
        <Card
          sx={{
            display: "flex",
            minWidth: 400,
            maxWidth: 400,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography>
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  precision={0.5}
                />
              </Typography>
              <Typography sx={{ color: "#ba6a62" }}>
                by <span>{review.Buyer.fName} </span>
                <span>{review.Buyer.lName}</span>
              </Typography>

              <Typography>{review.comment}</Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
