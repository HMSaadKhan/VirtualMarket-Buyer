import React from "react";
import {
  TextField,
  Button,
  Card,
  Box,
  Typography,
  CardContent,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import buyerService from "../../Services/BuyerService";
import LoginAuth from "../../AuthWrapper/LoginAuth";

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState("hello@123.com");
  const history = useHistory();
  return (
    <LoginAuth>
      <Box>
        <Box
          // sx={{ paddingLeft: "40%", paddingTop: "5%", paddingBottom: "5%" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <Card sx={{ width: "20%", padding: "20px" }}>
            <CardContent>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#ba6a62",
                  fontSize: "18px",
                  marginLeft: "20%",
                }}
              >
                FORGOT PASSWORD
              </Typography>
              <Box sx={{}}>
                <>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </>

                <Box mt={2}>
                  <Button
                    sx={{
                      color: "#ffff",
                      backgroundColor: "#ba6a62",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ba6a67",
                        color: "#fafafa",
                      },
                    }}
                    onClick={async (e) => {
                      await buyerService
                        .forgotPassword(email)
                        .then((data) => {
                          toast.success(data.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });

                          history.push("resetPassword/" + data._id);
                        })
                        .catch((err) => {
                          toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        });
                    }}
                  >
                    Send OTP
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </LoginAuth>
  );
};

export default ForgotPassword;
