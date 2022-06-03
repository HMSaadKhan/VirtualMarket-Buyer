import { Box } from "@mui/material";
import React from "react";
import MenuButtons from "./MenuButtons";
import MenuIconOption from "./MenuIconOption";

export default function MenuButtonsBar() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <Box sx={{ color: "#eeeeee", borderTop: 1, borderBottom: 1 }}>
        <Box sx={{ display: { xs: "inline", md: "none", lg: "none" } }}>
          <MenuIconOption />
        </Box>
        <Box sx={{ display: { xs: "none", md: "inline", lg: "inline" } }}>
          <MenuButtons />
        </Box>
      </Box>
    </Box>
  );
}
