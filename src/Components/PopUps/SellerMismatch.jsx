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
import { NameBar } from "../../Styles/NameBar";
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
        <NameBar name={"Oops !"} />

        <DialogContent>
          <div className={classes.root}>
            <Box>
              <Typography>
                You have items from another Seller in your cart. Continuing will
                remove the existing Products from your Cart.
                <br /> DO you wish to continue?
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <StyledButton onClick={handleClose}>Cancel</StyledButton>

              <StyledButton onClick={sellerMismatch}>Continue</StyledButton>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
