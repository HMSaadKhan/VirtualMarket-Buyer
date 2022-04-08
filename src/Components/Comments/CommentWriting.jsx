import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@material-ui/styles";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
  },
}));

export default function CommentWriting() {
  const classes = useStyles();
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);
  const [text, setText] = React.useState("Controlled");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Card>
        <Box>
          <CardContent>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </CardContent>
          <Box mr={4} ml={2}>
            <TextField
              label="Comment"
              multiline
              fullWidth
              maxRows={5}
              value={text}
              onChange={handleChange}
            />
          </Box>
          <Box m={2}>
            <Button variant="contained" sx={{ backgroundColor: "#ba6a62" }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
