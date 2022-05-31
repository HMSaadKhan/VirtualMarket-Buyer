import * as React from "react";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import useState from "react-usestateref";
import { styled } from "@mui/material/styles";

import { Inputs } from "../Styles/StyledInput";
export default function Counter(props) {
  const { num, setNum, minValue, maxValue } = props;
  console.log(props);
  const [qty, SetQty] = useState(num);
  const [minusButtonCheck, setMinusButton] = useState(true);
  const [plusButtonCheck, setPlusButton] = useState(false);
  const [errorCheck, seterror] = useState(false);
  const [errortext, seterrortext] = useState();

  const minusButton = () => {
    console.log(qty, minValue, maxValue);
    if (qty <= minValue) {
      setMinusButton(false);
      setPlusButton(false);
      console.log("minus button If");
    } else {
      SetQty(qty - 1);
      setNum(qty - 1);
      setPlusButton(false);
      console.log("minus button else");
    }
  };

  const plusButton = () => {
    console.log(qty, minValue, maxValue);
    if (qty >= maxValue) {
      console.log("plus button if");
      setPlusButton(true);
      setMinusButton(false);
    } else {
      setMinusButton(false);
      console.log("plus button else");
      SetQty(qty + 1);
      setNum(qty + 1);
    }
  };

  const NumChange = (e) => {
    if (e.target.value < minValue) {
      seterrortext("cannot be less than " + minValue);
      SetQty(e.target.value);
      setNum(e.target.value);
    } else {
      SetQty(e.target.value);
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
          error={errorCheck}
          value={qty}
          helperText={errortext}
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
