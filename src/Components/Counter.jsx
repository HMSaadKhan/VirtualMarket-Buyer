import * as React from "react";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import useState from "react-usestateref";

import { Inputs } from "../Styles/StyledInput";
export default function Counter(props) {
  const { num, setNum, minValue, maxValue, check } = props;
  console.log(num, minValue, maxValue, check);
  //const [qty, SetQty] = useState(num);
  const [minusButtonCheck, setMinusButton] = useState(true);
  const [plusButtonCheck, setPlusButton] = useState(false);
  const [errorCheck, seterror] = useState(false);
  const [errortext, seterrortext] = useState();

  const minusButton = () => {
    if (num <= minValue) {
      setMinusButton(false);
      setPlusButton(false);
    } else {
      //  SetQty(qty - 1);
      setNum(num - 1);
      setPlusButton(false);
    }
  };

  React.useEffect(minusButton, []);

  const plusButton = () => {
    if (num >= maxValue) {
      setPlusButton(true);
      setMinusButton(false);
    } else {
      setMinusButton(false);
      //SetQty(qty + 1);
      setNum(parseInt(num) + 1);
    }
  };
  React.useEffect(minusButton, []);

  const NumChange = (e) => {
    if (e.target.value < minValue) {
      //SetQty(e.target.value);
      setNum(e.target.value);
    } else {
      //SetQty(e.target.value);
      setNum(e.target.value);
      seterror(false);
      seterrortext("");
    }
    if (e.target.value > maxValue) {
      seterror(true);
      seterrortext("cannot be greater than " + maxValue);
    }
  };

  return (
    <Box sx={{ display: "flex ", alignItems: "start" }}>
      <IconButton disabled={minusButtonCheck} onClick={minusButton}>
        <Remove />
      </IconButton>
      <Box sx={{ width: "30%" }}>
        <Inputs
          sx={{ color: "black" }}
          InputProps={{
            readOnly: check ? true : false,
          }}
          type="number"
          error={errorCheck}
          value={num}
          onChange={(e) => {
            NumChange(e);
          }}
        />
      </Box>
      <IconButton disabled={plusButtonCheck} onClick={plusButton}>
        <Add />
      </IconButton>
    </Box>
  );
}
