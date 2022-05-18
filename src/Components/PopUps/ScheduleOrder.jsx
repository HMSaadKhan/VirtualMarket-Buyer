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

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

export default function ScheduleOrder(props) {
  const { minOrder, bool, setbool, product } = props;
  const classes = useStyles();
  const [datentime, setdatentime] = React.useState(new Date());
  const [checked, setChecked] = React.useState(true);
  const [radio, setRadio] = React.useState(true);
  const [preset, setpreset] = React.useState("");
  const [quantity, setquantity, quantityref] = React.useState(props.minOrder);
  const [customRepetition, setcustomRepetition] = React.useState(0);

  const Preset = [
    "WEEKLY",
    "FORTNIGHTLY",
    "MONTHLY",
    "BI-MONTHLY",
    "TRI-MONTHLY",
    "EXPIRED",
  ];

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClose = () => {
    setbool(!bool);
  };
  const handleRadio = (e) => {
    setRadio(e.target.value);
  };
  const selectChange = (e) => {
    setpreset(e.target.value);
  };

  const scheduleOrder = () => {
    scheduleService
      .addscheduledOrder({
        product,
        quantity,
        scheduledTime: datentime,
        repeat: checked,
        repetitionType: radio,
        presetRepetition: preset,
        customRepetition,
      })
      .then((data) => {
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setbool(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <Dialog open={bool} onClose={handleClose}>
        <NameBar name={"Schedule Item"} />

        <DialogContent>
          <div className={classes.root}>
            <Box>
              <HeadingText>Quantity</HeadingText>
              <Counter quantity={quantity} value={setquantity} />
              <HeadingText>Date & Time</HeadingText>
              <DateTimePicker
                format="dd-MM-yyyy HH"
                onChange={setdatentime}
                value={datentime}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label={<Labels>Repeat</Labels>}
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                {checked ? (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={radio === "PRESET"}
                            onChange={handleRadio}
                            value="PRESET"
                            name="radio-buttons"
                          />
                        }
                        label={<Labels>Preset</Labels>}
                      />
                      {radio === "PRESET" ? (
                        <Select
                          variant="standard"
                          value={preset}
                          onChange={(e) => {
                            selectChange(e);
                          }}
                        >
                          {Preset.map((item) => (
                            <MenuItem key={item._id} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={radio === "CUSTOM"}
                            onChange={handleRadio}
                            value="CUSTOM"
                            name="radio-buttons"
                          />
                        }
                        label={<Labels>Custom</Labels>}
                      />
                      {radio === "CUSTOM" ? (
                        <Counter
                          quantity={customRepetition}
                          value={setcustomRepetition}
                        />
                      ) : (
                        <></>
                      )}
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <StyledButton onClick={scheduleOrder}>schedule</StyledButton>
              <StyledButton
                onClick={(e) => {
                  setbool(false);
                }}
              >
                Cancel
              </StyledButton>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
