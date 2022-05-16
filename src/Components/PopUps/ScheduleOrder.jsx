import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Typography, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
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
    console.log(
      product,
      quantity,
      datentime,
      checked,
      radio,
      preset,
      customRepetition
    );
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
            <Box>
              <Typography>Quanity</Typography>
              <Counter quantity={quantity} value={setquantity} />
              <Typography>Date & time</Typography>
              <DateTimePicker
                format="dd-MM-yyyy HH"
                onChange={setdatentime}
                value={datentime}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#ba6a62",
                      }}
                      checked={checked}
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
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <StyledButton onClick={scheduleOrder}>schedule</StyledButton>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
