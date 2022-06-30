import React   from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { MenuItem, Select, Typography } from "@mui/material";
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
    height: 350,
  },
});

export default function ScheduleOrderEdit(props) {
  console.log(props);
  const { bool, setbool, _id, schedule } = props;

  const classes = useStyles();

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
    schedule.customRepetition ? schedule.customRepetition : 0
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
        <NameBar name={"Edit Schedule Item"} />

        <DialogContent>
          <div className={classes.root}>
            {schedule ? (
              <Box>
                <HeadingText>Quanity</HeadingText>
                <Counter
                  num={quantity}
                  setNum={setquantity}
                  minValue={schedule.Product.minOrder}
                  maxValue={schedule.Product.stock}
                />
                <Box>
                  {quantity > schedule.Product.stock &&
                  schedule.Product.stock > 0 ? (
                    <>
                      {schedule.Product.minOrder > schedule.Product.stock ? (
                        <></>
                      ) : (
                        <>
                          <Typography m={1} color="red" variant="subtitle">
                            {" "}
                            Maximum {schedule.Product.stock} products can be
                            ordered
                          </Typography>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {quantity < schedule.Product.minOrder ? (
                    <>
                      <Typography m={1} color="red" variant="subtitle">
                        {" "}
                        Minimum {schedule.Product.minOrder} product can be
                        ordered
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
                <HeadingText>Date & time</HeadingText>
                <DateTimePicker
                  format="dd-MM-yyyy HH"
                  onChange={setscheduledTime}
                  value={scheduledTime}
                />
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox checked={repeat} onChange={handleChange} />
                    }
                    label={<Labels>Repeat</Labels>}
                  />
                </Box>
                <Box sx={{ marginLeft: "10px" }}>
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
                          label={<Labels>Preset</Labels>}
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
                          label={<Labels>Custom</Labels>}
                        />
                        {repetitionType === "CUSTOM" ? (
                          <>
                            <Counter
                              num={customRepetition}
                              setNum={setcustomRepetition}
                              minValue={1}
                              maxValue={365}
                            />
                            <Box>
                              {customRepetition > 365 ? (
                                <>
                                  <Typography
                                    m={1}
                                    color="red"
                                    variant="subtitle"
                                  >
                                    {" "}
                                    Maximum 365 days can be scheduled
                                  </Typography>
                                </>
                              ) : (
                                <></>
                              )}
                              {customRepetition < 1 ? (
                                <>
                                  <Typography
                                    m={1}
                                    color="red"
                                    variant="subtitle"
                                  >
                                    {" "}
                                    Minimum 1 day can be scheduled
                                  </Typography>
                                </>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </>
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
            ) : (
              <></>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                paddingTop: "100px",
                alignItems: "end",
              }}
            >
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
