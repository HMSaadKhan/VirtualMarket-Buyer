import { Box } from "@mui/material";
import React from "react";
import { FlexBox } from "../../Styles/StyledBox";
import CategoriesBar from "./CategoriesBar";
import LandingImages from "./LandingImages";

function LandingComponent() {
  return (
    <FlexBox sx={{ justifyContent: "center" }}>
      <CategoriesBar />
      <LandingImages />
    </FlexBox>
  );
}

export default LandingComponent;
