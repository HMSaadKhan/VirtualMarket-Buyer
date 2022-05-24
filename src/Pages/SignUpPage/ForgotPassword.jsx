import React from "react";
import { TextField, Card, Box, CardContent } from "@mui/material";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import buyerService from "../../Services/BuyerService";
import IsLoginTrue from "../../AuthWrapper/isLoginTrue";
import { CardHeadings } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";
import LoadingScreen from "../../Components/LoadingScreen";

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const history = useHistory();
  return (
    <IsLoginTrue>
      <LoadingScreen bool={loading} />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <Card sx={{ minWidth: 300, maxWidth: 300, padding: "20px" }}>
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
                      setloading(true);
                      await buyerService
                        .forgotPassword(email)
                        .then((data) => {
                          setloading(false);
                          toast.success(data.message, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });

                          history.push("resetPassword/" + data._id);
                        })
                        .catch((err) => {
                          setloading(false);
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
