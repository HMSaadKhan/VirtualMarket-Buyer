/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-lone-blocks */
import { Box, Typography } from "@mui/material";
import React from "react";

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
              display: {
                xs: "inline",
                sm: "none",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
            onClick={(e) => {
              history.push("/");
            }}
          >
            <img src={Logo} height="65" width="88" objectfit="contain" />
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "inline",
                md: "inline",
                lg: "inline",
                xl: "inline",
              },
            }}
          >
            <Box pl={2} sx={{ display: "flex" }}>
              <Typography
                align="right"
                sx={{
                  color: "black",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                contact us:&nbsp;
              </Typography>
              <Typography
                align="right"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                virtualmarket06@gmail.com
              </Typography>
            </Box>
          </Box>
        </div>
        <Box pr={2} sx={{ }}>
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
