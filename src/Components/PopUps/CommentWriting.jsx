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
import { makeStyles } from "@mui/styles";
import reviewService from "../../Services/ReviewService";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  margin: "10px",
  color: "#ffff",
  backgroundColor: "#ba6a62",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#C78781",
    color: "#fafafa",
  },
});

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
}));

export default function CommentWriting({ orderId, itemId, Orders }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setText("");
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
        toast.success(data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        handleClose();
        Orders();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <StyledButton onClick={handleClickOpen}>review</StyledButton>
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
                color: "#ba6a62",
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
                  <StyledButton onClick={Review} variant="contained">
                    Submit
                  </StyledButton>
                </Box>
              </Box>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
