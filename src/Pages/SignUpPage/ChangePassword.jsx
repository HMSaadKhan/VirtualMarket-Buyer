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
  const [oldPassword, setOldPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState("");
  const history = useHistory();
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
                UPDATE PASSWORD
              </Typography>
              <Box sx={{}}>
                <>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Old Password"
                    type="Password"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </>
                <>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
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
                        .changePassword({ oldPassword, newPassword }) //if gives error then check oldPassword datatype
                        .then((data) => {
                          toast.success(data.data, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                          history.push("/AccountSettings");
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
