import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { backdropClasses, Box } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Thankyou() {
  const history = useHistory();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <Box
        sx={{
          maxWidth: 400,
          color: "#fafafa",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://t3.ftcdn.net/jpg/02/91/52/22/360_F_291522205_XkrmS421FjSGTMRdTrqFZPxDY19VxpmL.jpg"
          alt="logo"
        />
        <CardContent sx={{ alignItems: "center", justifyContent: "center" }}>
          {/* <Typography gutterBottom variant="h5" component="div"
        sx={{color: 'red'}}>
          THANK YOU 
        </Typography> */}
          <Typography variant="body2" color="text.secondary" align="center">
            For placing your order. Order confirmation email has be sent in your
            mail box.
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/orders");
            }}
          >
            View Orders
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/");
            }}
          >
            Continue Shopping
          </Button>
        </CardActions>
      </Box>
    </Box>
  );
}
