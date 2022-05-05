import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

export default function MenuSideBar(props) {
  const history = useHistory();
  const StyledButton = styled(Button)({
    color: "#ba6a62",
    backgroundColor: "#ffff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#C78781",
      color: "#fafafa",
    },
  });

  return (
    <Box>
      <Box m={1} sx={{ width: 250, height: "100%" }}>
        <Card sx={{ backgroundColor: "white" }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <StyledButton>Account</StyledButton>
            <StyledButton
              onClick={(e) => {
                history.push("/changepassword");
              }}
            >
              Change Password
            </StyledButton>
            <StyledButton>Orders</StyledButton>
            <StyledButton>Warranty</StyledButton>
            <StyledButton>Sell on VirtualMarket</StyledButton>
            <StyledButton>LogOut</StyledButton>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
