import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import reviewService from "../../Services/ReviewService";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

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
    width: 500,
  },
  button: {
    color: "#ba6a62",
    backgroundColor: "#fff",
    marginLeft: "10px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#ba6a64",
      color: "#ffff",
    },
  },
}));

export default function CommentWriting({ orderId, itemId }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);
  const [text, setText] = React.useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const Review = () => {
    reviewService
      .ReviewPost(orderId, { item: itemId, rating: value, comment: text })
      .then((data) => {
        console.log(data);
        toast.success(data.statusText, {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        handleClose();
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <Button
        sx={{
          color: "#fff",
          backgroundColor: "#ba6a62",
          marginLeft: "10px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#ba6a64",
            color: "#ffff",
          },
        }}
        onClick={handleClickOpen}
      >
        review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box
          sx={{
            height: "40px",
            display: "flex",

            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            Write your review here{" "}
          </DialogTitle>
          <Box>
            <CancelIcon
              sx={{
                color: "#fff",
                backgroundColor: "#ba6a62",
                marginLeft: "10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ba6a64",
                  color: "#ffff",
                },
              }}
              onClick={handleClose}
            >
              Close
            </CancelIcon>
          </Box>
        </Box>

        <DialogContent>
          <div className={classes.root}>
            <Card>
              <Box>
                <CardContent>
                  <Box
                    sx={{
                      width: 400,
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
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                      </Box>
                    )}
                  </Box>
                </CardContent>
                <Box mr={4} ml={2}>
                  <TextField
                    label="Review"
                    multiline
                    fullWidth
                    maxRows={5}
                    value={text}
                    onChange={handleChange}
                  />
                </Box>
                <Box m={2}>
                  <Button
                    onClick={Review}
                    variant="contained"
                    sx={{
                      color: "#fff",
                      backgroundColor: "#ba6a62",
                      marginLeft: "10px",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ba6a64",
                        color: "#ffff",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
