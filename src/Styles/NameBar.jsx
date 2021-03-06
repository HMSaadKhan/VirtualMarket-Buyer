import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";

const BG = styled(Box)({
  backgroundColor: "#ba6a62",
  color: "white",
});
const InnerText = styled(Typography)({
  marginLeft: "10%",
  marginTop: "10px",
  marginBottom: "10px",
  fontSize: "30px",
  fontWeight: "bold",
});

export const NameBar = ({ name }) => {
  return (
    <BG>
      <InnerText align="left">{name}</InnerText>
    </BG>
  );
};
