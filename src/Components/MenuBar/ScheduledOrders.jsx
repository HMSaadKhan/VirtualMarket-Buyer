import { Menu, Box, IconButton, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import scheduleService from "../../Services/ScheduleService";
import ScheduleOrderEdit from "../PopUps/ScheduleOrderEdit";
import moment from "moment";
import { styled } from "@mui/material/styles";

const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const ScheduledOrder = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [scheduleOrders, setScheduleOrders] = useState([]);
  const [editScheduleOrders, setEditScheduleOrders] = useState("");

  const [schedulebool, setschedulebool] = useState(false);
  const [scheduleId, setscheduleId] = useState();

  const getSchedule = () => {
    scheduleService.getScheduledOrder().then((data) => {
      console.log(data.data);
      setScheduleOrders(data.data);
    });
  };
  React.useEffect(getSchedule, [anchorEl]);

  const editSchedule = (_id) => {
    setscheduleId(_id);
    scheduleService.getSingleScheduledOrder(_id).then((data) => {
      console.log(data.data);
      setEditScheduleOrders(data.data);
      setschedulebool(true);
      handleMenuClose();
    });
  };

  const deleteSchedule = (_id) => {
    scheduleService.deleteScheduledOrder(_id).then((data) => {
      getSchedule();
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setEditScheduleOrders(null);
  };

  const renderMenu = (
    <Menu
      elevation={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="basic-menu"
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: "200px",
          width: "65ch",
        },
      }}
    >
      <div>
        {scheduleOrders.length > 0 ? (
          <>
            {scheduleOrders.map((items) => {
              return (
                <Box key={items._id}>
                  {items ? (
                    <Box>
                      <Box>
                        <Box
                          m={2}
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <img
                              height="100"
                              width="100"
                              src={items.Product.images[0].link}
                              alt=""
                            />
                          </Box>
                          <Box>
                            <Box>
                              <Box sx={{ width: "100%" }}>
                                <Typography
                                  sx={{ color: "#ba6a62", fontWeight: "bold" }}
                                  noWrap
                                >
                                  {items.Product.name}
                                </Typography>
                              </Box>
                              <Box sx={{ width: "100%" }}>
                                <FlexBox>
                                  <Typography
                                    sx={{
                                      color: "#ba6a62",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Qty:{" "}
                                  </Typography>
                                  <Typography>{items.quantity}</Typography>
                                </FlexBox>
                              </Box>
                              <Box>
                                <FlexBox>
                                  <Typography
                                    sx={{
                                      color: "#ba6a62",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Schedule At:
                                  </Typography>

                                  <Box ml={1}>
                                    {moment(items.scheduledTime).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </Box>
                                </FlexBox>
                              </Box>

                              <Box>
                                {items.repetitionType === "CUSTOM" ? (
                                  <>
                                    <Box>
                                      <FlexBox>
                                        <Typography
                                          sx={{
                                            color: "#ba6a62",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Repetition Type:
                                        </Typography>

                                        <Typography ml={1}>
                                          {items.customRepetition} Days
                                        </Typography>
                                      </FlexBox>
                                    </Box>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {items.repetitionType === "PRESET" ? (
                                  <>
                                    <Box>
                                      <FlexBox>
                                        <Typography
                                          sx={{
                                            color: "#ba6a62",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Repetition:
                                        </Typography>

                                        <Typography ml={1}>
                                          {items.presetRepetition}
                                        </Typography>
                                      </FlexBox>
                                    </Box>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <IconButton
                              onClick={(e) => {
                                editSchedule(items._id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>

                            <IconButton
                              onClick={(e) => {
                                deleteSchedule(items._id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Divider />
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
              );
            })}
          </>
        ) : (
          <Typography
            align="center"
            sx={{ color: "#ba6a62", fontWeight: "bold" }}
          >
            No Orders Scheduled
          </Typography>
        )}
      </div>
    </Menu>
  );

  return (
    <div>
      {editScheduleOrders ? (
        <>
          <ScheduleOrderEdit
            bool={schedulebool}
            setbool={setschedulebool}
            schedule={editScheduleOrders}
            _id={scheduleId}
          />
        </>
      ) : (
        <></>
      )}
      <Typography onClick={handleProfileMenuOpen}>Schedule Items</Typography>
      {renderMenu}
    </div>
  );
};

export default ScheduledOrder;
