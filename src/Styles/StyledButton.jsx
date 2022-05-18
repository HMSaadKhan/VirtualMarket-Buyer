import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)({
  margin: "10px",
  color: "#ffff",
  backgroundColor: "#ba6a62",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#C78781",
    color: "#fafafa",
  },
});
export const WhiteButton = styled(Button)({
  color: "#ba6a62",
  backgroundColor: "#fff",
  marginLeft: "10px",
  marginTop: "10px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#ba6a64",
    color: "#ffff",
  },
});
