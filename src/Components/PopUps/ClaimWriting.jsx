import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import reviewService from "../../Services/ReviewService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
}));

export default function ClaimWriting() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [text, setText] = React.useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const Review = () => {
    reviewService
      .ReviewPost()
      .then((data) => {
        toast.success(data.statusText, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleClose();
      })
      .catch((error) => {
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
        Claim
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
            Tell use what happened{" "}
          </DialogTitle>
          <Box>
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
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>

        <DialogContent>
          <div className={classes.root}>
            <Card>
              <Box>
                <Box mr={4} ml={2}>
                  <TextField
                    label="Problem Description"
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
