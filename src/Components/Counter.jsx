import * as React from "react";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import useState from "react-usestateref";

export default function Counter(props) {
  const { quantity, value, minValue } = props;
  console.log(props);
  const [qty, SetQty] = useState(quantity);

  const plusButton = () => {
    SetQty(qty + 1);
    value(qty + 1);
  };
  const minusButton = () => {
    if (qty > minValue) {
      value(qty - 1);
      SetQty(qty - 1);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex ", alignItems: "center" }}>
        <IconButton onClick={minusButton}>
          <Remove />
        </IconButton>
        <Box sx={{ width: "20%" }}>
          <TextField value={qty} />
        </Box>
        <IconButton onClick={plusButton}>
          <Add />
        </IconButton>
      </Box>
    </>
  );
}
