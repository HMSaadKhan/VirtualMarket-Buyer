import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import warrantyService from "../../Services/WarrantyService";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
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
const DisabledButton = styled(Button)({
  margin: "10px",
  color: "#ffff",
  backgroundColor: "#856562",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#C78781",
    color: "#fafafa",
  },
  "&:disabled": {
    backgroundColor: "#d4cecd",
    color: "#fafafa",
  },
});
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ClaimWriting({ id, status, getWarranties }) {
  const classes = useStyles();
  console.log(status, id);
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(false);

  const checkDisable = () => {
    if (status === "EXPIRED" || status === "REQUESTED") {
      setDisable(true);
    }
  };
  React.useEffect(checkDisable, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        // toast.error(error.response.data, {
        //   position: toast.POSITION.BOTTOM_LEFT,
        // });
      });
  };

  return (
    <div>
      {disable ? (
        <DisabledButton disabled={disable} onClick={handleClickOpen}>
          Claim
        </DisabledButton>
      ) : (
        <StyledButton onClick={handleClickOpen}>Claim</StyledButton>
      )}

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
