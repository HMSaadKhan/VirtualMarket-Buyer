import { Box, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "../../Styles/StyledBox";
import { Link } from "react-router-dom";
import { styled } from "@mui/styles";
import Logo from "./virtualmarket.png";
import { useHistory } from "react-router-dom";

const Links = styled(Typography)({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function TopBar() {
  const history = useHistory();
  return (
    <div>
      <Box
        sx={{
          color: "#fafafa",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Box
            sx={{
              color: "#ba6a62",
              cursor: "pointer",
              height: "100",
              width: "100",
              display: { xs: "inline", md: "none", lg: "none", xl: "none" },
            }}
            onClick={(e) => {
              history.push("/");
            }}
          >
            <img src={Logo} height="65" width="88" objectfit="contain" />
          </Box>
        </div>
        <Box sx={{}}>
          <Links
            sx={{ color: "black", cursor: "pointer" }}
            onClick={(e) => {
              {
                window.open(
                  "https://virtualmarket-seller.netlify.app/login",
                  "_blank"
                );
              }
            }}
          >
            Join us as a Seller
          </Links>
        </Box>
      </Box>
    </div>
  );
}
