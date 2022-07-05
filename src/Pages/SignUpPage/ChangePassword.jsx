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

  const changePasswordfun = () => {
    buyerService
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
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "150px",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "40%",
                md: "30%",
                lg: "30%",
                xl: "25%",
              },
            }}
          >
            <Card sx={{ padding: "20px" }}>
              <CardContent>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#ba6a62",
                    fontSize: "18px",
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
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          changePasswordfun();
                          // write your functionality here
                        }
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
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          changePasswordfun();
                          // write your functionality here
                        }
                      }}
                    />
                  </>

                  <Box mt={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={changePasswordfun}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangenewPassword;
