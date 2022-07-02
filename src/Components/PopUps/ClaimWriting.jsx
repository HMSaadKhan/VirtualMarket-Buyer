import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import warrantyService from "../../Services/WarrantyService";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ClaimWriting({ id, status, getWarranties }) {
  const classes = useStyles();
  console.log(status, id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setText("");
  };
  const [comment, setText] = React.useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const Review = () => {
    warrantyService
      .claimWarranty(id, { comment })
      .then((data) => {
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleClose();
        getWarranties();
      })
      .catch((error) => {
        console.log(error);
        getWarranties();
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        disabled={
          status === "EXPIRED" || status === "REQUESTED" || status === "PENDING"
            ? true
            : false
        }
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
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            Tell use what happened{" "}
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
            <>
              <Box>
                <Box mr={4} ml={2}>
                  <TextField
                    label="Problem Description"
                    multiline
                    fullWidth
                    maxRows={5}
                    value={comment}
                    onChange={handleChange}
                  />
                </Box>
                <Box m={2}>
                  <Button onClick={Review} variant="contained">
                    Submit
                  </Button>
                </Box>
              </Box>
            </>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
