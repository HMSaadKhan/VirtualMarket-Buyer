import { Box, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "../../Styles/StyledBox";
import { Link } from "react-router-dom";
import { styled } from "@mui/styles";

const Links = styled(Typography)({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function TopBar() {
  return (
    <div>
      <Box sx={{ color: "#fafafa", width: "100%", height: "30px" }}>
        <Box
          pl={2}
          pr={2}
          sx={{
            display: "flex",
            justifyContent: "Right",
          }}
        >
          <Links
            sx={{ color: "black" }}
            onClick={(e) => {
              {
                window.open(
                  "https://virtualmarket-seller.netlify.app/login",
                  "_blank"
                );
              }
            }}
          >
            Become a Seller
          </Links>
        </Box>
      </Box>
    </div>
  );
}
