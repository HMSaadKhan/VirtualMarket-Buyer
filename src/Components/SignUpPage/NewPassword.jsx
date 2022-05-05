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

const ChangenewPassword = (props) => {
  const [otp, setOtp] = React.useState();
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const _id = props.match.params.id;
  return (
    <>
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
                NEW PASSWORD
              </Typography>
              <Box sx={{}}>
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
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default ChangenewPassword;
