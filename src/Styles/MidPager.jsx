import { styled } from "@mui/material/styles";
import { Typography, Box, Container } from "@mui/material";

export const OuterCounter = styled(Container)({
  width: "100%",
  height: " 50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const InnerText = styled(Typography)({
  fontSize: "30px",
  fontWeight: "bold",
  color: "#ba6a62",
});

export const MidPager = ({ name }) => {
  console.log(name);
  return (
    <OuterCounter>
      <InnerText>{name}</InnerText>
    </OuterCounter>
  );
};
