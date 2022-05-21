import React from "react";
import { TextField, Card, Box, CardContent } from "@mui/material";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import buyerService from "../../Services/BuyerService";
import IsLoginTrue from "../../AuthWrapper/isLoginTrue";
import { CardHeadings } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  return (
    <IsLoginTrue>
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
              <CardHeadings>FORGOT PASSWORD</CardHeadings>
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
                  <StyledButton
                    sx={{ margin: "0px", width: "100%" }}
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
                  </StyledButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </IsLoginTrue>
  );
};

export default ForgotPassword;
