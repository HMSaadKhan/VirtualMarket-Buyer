import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Container } from "@mui/material";

export const Containers = styled(Container)({
  width: "100%",
  height: " 50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const SpaceBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const MarginBox = styled(Box)({
  margin: "5px",
});
