import React from "react";
import { TextField, Card, Box, CardContent } from "@mui/material";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import buyerService from "../../Services/BuyerService";
import { CardHeadings } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";
import IsLoginTrue from "../../AuthWrapper/isLoginTrue";

const ChangenewPassword = (props) => {
  const [otp, setOtp] = React.useState();
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const _id = props.match.params.id;
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
              <CardHeadings align="center">NEW PASSWORD</CardHeadings>
              <Box>
                <>
                  <TextField
                    label="OTP"
                    fullWidth
                    variant="standard"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </>
                <>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="New Password"
                    type="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </>

                <Box mt={2}>
                  <StyledButton
                    sx={{ margin: "0px", width: "100%" }}
                    onClick={async (e) => {
                      await buyerService
                        .resetPassword(_id, { otp, password }) //if gives error then check otp datatype
                        .then((data) => {
                          toast.success(data.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                          history.push("/Login");
                        })
                        .catch((err) => {
                          toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        });
                    }}
                  >
                    Update Password
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

export default ChangenewPassword;
