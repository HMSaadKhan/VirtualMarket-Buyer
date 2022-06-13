import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Box from "@mui/material/Box";
import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import Counter from "../Counter";
import DateTimePicker from "react-datetime-picker";
import Radio from "@mui/material/Radio";
import scheduleService from "../../Services/ScheduleService";
import { NameBar } from "../../Styles/NameBar";
import { HeadingText, Labels } from "../../Styles/MyTypographies";
import { StyledButton } from "../../Styles/StyledButton";
import { CalendarTodayOutlined, Delete } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
const useStyles = makeStyles({
  root: {
    width: 500,
    height: 350,
  },
});

export default function Bargain(props) {
  const { productDetails, bool, setbool } = props;
  const classes = useStyles();

  const handleClose = () => {
    setbool(!bool);
  };
  const scheduleOrder = () => {};

  return (
    <div>
      <Dialog open={bool} onClose={handleClose}>
        <NameBar name={productDetails.name} />

        <DialogContent>
          <div className={classes.root}>
            <Box>
              <HeadingText>Quantity</HeadingText>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
