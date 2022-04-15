import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  container: { width: "50%" },
}));

export default function CommentsDisplay({ review }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography>
                <Rating name="read-only" value={review.rating} readOnly />
              </Typography>
              <Typography sx={{ color: "#ba6a62" }}>by Saad Khan</Typography>

              <Typography>{review.comment}</Typography>
            </CardContent>
          </Box>
        </Card>
      </div>
    </div>
  );
}
