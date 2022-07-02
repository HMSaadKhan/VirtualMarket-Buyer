import { Box } from "@mui/material";
import React from "react";
import { FlexBox } from "../../Styles/StyledBox";
import CategoriesSideBar from "./CategoriesSideBar";
import LandingImages from "./LandingImages";

function LandingComponent() {
  return (
    <Box>
      <FlexBox
        sx={{
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: {
              sm: "35%",
              md: "25%",
              lg: "20%",
              xl: "20%",
            },
            display: { xs: "none", sm: "inline", md: "inline" },
          }}
        >
          <CategoriesSideBar />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "65%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            },
            display: { xs: "inline", sm: "inline", md: "inline" },
          }}
        >
          <LandingImages />
        </Box>
      </FlexBox>
    </Box>
  );
}

export default LandingComponent;
