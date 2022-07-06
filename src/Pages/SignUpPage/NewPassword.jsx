import React from "react";
import { TextField, Card, Box, CardContent, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import buyerService from "../../Services/BuyerService";
import { CardHeadings } from "../../Styles/MyTypographies";

import IsLoginTrue from "../../AuthWrapper/isLoginTrue";
import LoadingScreen from "../../Components/LoadingScreen";
import { useParams } from "react-router-dom";

const ChangenewPassword = (props) => {
  const [otp, setOtp] = React.useState();
  const [password, setPassword] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const history = useHistory();
  const id = useParams();

  const updatePassword = () => {
    setloading(true);
    buyerService
      .resetPassword(id.id, { otp, password }) //if gives error then check otp datatype
      .then((data) => {
        setloading(false);

        toast.success(data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        history.push("/Login");
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };
  return (
    <IsLoginTrue>
      <LoadingScreen bool={loading} />
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
          <Card sx={{ minWidth: 300, maxWidth: 300, padding: "20px" }}>
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        updatePassword();
                        // write your functionality here
                      }
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        updatePassword();
                        // write your functionality here
                      }
                    }}
                  />
                </>

                <Box mt={2}>
                  <Button
                    disabled={otp || password ? false : true}
                    variant="contained"
                    sx={{ margin: "0px", width: "100%" }}
                    onClick={(e) => {
                      updatePassword();
                    }}
                  >
                    Update Password
                  </Button>
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
