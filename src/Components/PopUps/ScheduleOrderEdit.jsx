import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Typography, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import Counter from "../Counter";
import DateTimePicker from "react-datetime-picker";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import scheduleService from "../../Services/ScheduleService";
const StyledButton = styled(Button)({
  margin: "10px",
  color: "#ffff",
  backgroundColor: "#ba6a62",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#C78781",
    color: "#fafafa",
  },
});

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ScheduleOrderEdit(props) {
  const { bool, setbool, product, _id, schedule } = props;
  console.log(schedule);
  // const [schedule, setschedule] = useState();

  const classes = useStyles();

  // const scheduledData = () => {
  //   scheduleService.getSingleScheduledOrder(props._id).then((data) => {
  //     console.log(data.data);
  //     setschedule(data.data);
  //     setquantity(data.data.quantity);
  //     setscheduledTime(data.data.scheduledTime);
  //     setrepeat(data.data.repeat);
  //     setrepetitionType(data.data.repetitionType);
  //     setpresetRepetition(data.data.presetRepetition);
  //     setcustomRepetition(data.data.customRepetition);
  //   });
  // };
  // React.useEffect(scheduledData, [props._id]);

  const Preset = [
    "WEEKLY",
    "FORTNIGHTLY",
    "MONTHLY",
    "BI-MONTHLY",
    "TRI-MONTHLY",
    "EXPIRED",
  ];
  const [scheduledTime, setscheduledTime] = React.useState(
    new Date(schedule.scheduledTime)
  );
  const [repeat, setrepeat] = React.useState(schedule.repeat);
  const [repetitionType, setrepetitionType] = React.useState(
    schedule.repetitionType
  );
  const [presetRepetition, setpresetRepetition] = React.useState(
    schedule.presetRepetition
  );
  const [quantity, setquantity] = React.useState(schedule.quantity);
  const [customRepetition, setcustomRepetition] = React.useState(
    schedule.customRepetition ? 0 : 0
  );

  const handleChange = (event) => {
    setrepeat(event.target.checked);
  };
  const handleClose = () => {
    setbool(!bool);
  };
  const handleRadio = (e) => {
    setrepetitionType(e.target.value);
  };
  const selectChange = (e) => {
    setpresetRepetition(e.target.value);
  };

  const scheduleOrder = () => {
    console.log(
      quantity,
      scheduledTime,
      repeat,
      repetitionType,
      presetRepetition,
      customRepetition
    );
    scheduleService
      .editScheduledOrder(_id, {
        quantity,
        scheduledTime,
        repeat,
        repetitionType,
        presetRepetition,
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
        <Box
          sx={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle id="responsive-dialog-title"></DialogTitle>
          <Box>
            <CancelIcon
              sx={{
                color: "#ba6a62",
              }}
              onClick={(e) => {
                setbool(false);
              }}
            >
              Close
            </CancelIcon>
          </Box>
        </Box>

        <DialogContent>
          <div className={classes.root}>
            {schedule ? (
              <Box>
                <Typography>Quanity</Typography>
                <Counter quantity={quantity} value={setquantity} />
                <Typography>Date & time</Typography>
                <DateTimePicker
                  format="dd-MM-yyyy HH"
                  onChange={setscheduledTime}
                  value={scheduledTime}
                />
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{
                          color: "#ba6a62",
                        }}
                        checked={repeat}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#ba6a62",
                        }}
                      >
                        Repeat
                      </Typography>
                    }
                  />
                </Box>
                {repeat ? (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={repetitionType === "PRESET"}
                            onChange={handleRadio}
                            value="PRESET"
                            name="radio-buttons"
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: "bold",
                              color: "#ba6a62",
                            }}
                          >
                            Preset
                          </Typography>
                        }
                      />
                      {repetitionType === "PRESET" ? (
                        <Select
                          variant="standard"
                          value={presetRepetition}
                          onChange={(e) => {
                            selectChange(e);
                          }}
                        >
                          {Preset.map((item) => (
                            <MenuItem key={item.id} value={item}>
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
                            checked={repetitionType === "CUSTOM"}
                            onChange={handleRadio}
                            value="CUSTOM"
                            name="radio-buttons"
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: "bold",
                              color: "#ba6a62",
                            }}
                          >
                            Custom
                          </Typography>
                        }
                      />
                      {repetitionType === "CUSTOM" ? (
                        <Counter
                          quantity={schedule.customRepetition}
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
            ) : (
              <></>
            )}

            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <StyledButton onClick={scheduleOrder}>schedule</StyledButton>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
