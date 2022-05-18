import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
}));

export default function SellerMismatch({ bool, setbool, sellerMismatch }) {
  const classes = useStyles();

  const handleClose = () => {
    setbool(false);
  };

  return (
    <div>
      <Dialog open={bool} onClose={handleClose}>
        <Box
          sx={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle id="responsive-dialog-title"></DialogTitle>
          <Box>
            <CancelIcon
              sx={{
                color: "#ba6a62",
              }}
              onClick={(e) => {
                setbool(false);
              }}
            >
              Close
            </CancelIcon>
          </Box>
        </Box>

        <DialogContent>
          <div className={classes.root}>
            <Box>
              <Typography>
                You Have Already A Seller's product in your cart. DO you want to
                remove that product or Continue to have it.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <StyledButton onClick={handleClose}>keep</StyledButton>
              <StyledButton onClick={sellerMismatch}>remove</StyledButton>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
