import * as React from "react";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import useState from "react-usestateref";

export default function Counter(props) {
  const [quantity, SetQuantity] = useState(0);

  const plusButton = () => {
    SetQuantity(quantity + 1);
  };
  const minusButton = () => {
    SetQuantity(quantity - 1);
  };

  return (
    <>
      <Box sx={{ display: "flex ", alignItems: "center" }}>
        <IconButton onClick={minusButton}>
          <Remove />
        </IconButton>
        <Box sx={{ width: "20%" }}>
          <TextField value={quantity} />
        </Box>
        <IconButton onClick={plusButton}>
          <Add />
        </IconButton>
      </Box>
    </>
  );
}
