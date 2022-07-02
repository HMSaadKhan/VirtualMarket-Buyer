/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
import React, { useContext, useState } from "react";
import {
  Box,
  Menu,
  IconButton,
  Divider,
  Avatar,
  Typography,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import { ChatAnchorContext } from "../../Contexts/ChatAnchor/ChatAnchor";
import ChatMessages from "./ChatMessages";
import ChatIcon from "@mui/icons-material/Chat";
import chatService from "../../Services/ChatService";
import Fab from "@mui/material/Fab";
import buyerService from "../../Services/BuyerService";
import { MidPager } from "../../Styles/MidPager";
import { SocketAPIContext } from "../../Contexts/SocketAPI/SocketAPi";
import ChatLoading from "../ChatLoading";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
export default function ChatBox({ bool, setbool }) {
  const [chats, setchats] = useState([]);
  const [chatid, setchatid] = useState();
  const [error, seterror] = useState("");
  const [msgbool, setmsgbool] = useState(false);
  const [loading, setloading] = useState(false);
  const [chatperson, setchatperson] = useState();

  const socket = useContext(SocketAPIContext);

  const bg = (data) => {
    if (data) {
      return "white";
    } else {
      return "red";
    }
  };

  React.useEffect(() => {
    if (buyerService.isLoggedIn()) {
      const buyer = jwtDecode(buyerService.getToken());

      socket.emit("connectUser", buyer._id);
    }
  }, [socket]);

  const anchorContext = useContext(ChatAnchorContext);
  const ref = React.useRef();

  React.useEffect(() => {
    setloading(true);
    setchats([]);
    chatService
      .getChats()
      .then((chats) => {
        console.log(chats.data);
        setchats(chats.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setloading(false);
        seterror(error.response.data);
      });
  }, [bool]);
  React.useEffect(() => {
    anchorContext.setanchor(ref.current);
  }, [bool]);

  const chatList = (
    <Menu
      elevation={5}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="basic-menu"
      keepMounted
      anchorEl={anchorContext.anchor}
      open={bool}
      PaperProps={{
        style: {
          // height: { sx: "600", sm: "600" },
          // width: { sx: "100%", sm: "100%" },
          height: 600,
          width: "50ch",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              ml={2}
              sx={{ fontSize: "20px", fontWeight: "bold", color: "#ba6a62" }}
            >
              Chats
            </Typography>
          </Box>
          <IconButton
            onClick={() => {
              setbool(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <ChatLoading bool={loading} />
      </Box>
      <Box>
        {chats.length > 0 ? (
          <>
            {chats.map((chat) => {
              return (
                <MenuItem
                  key={chat._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    backgroundColor: bg(chat.buyerRead),
                  }}
                  onClick={() => {
                    setmsgbool(true);
                    setchatid(chat._id);
                    setbool(false);
                    setchatperson(chat);
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = bg(chat.buyerRead))
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = bg(chat.buyerRead))
                  }
                >
                  {/* <Card>
                    <CardContent> */}

                  <Box sx={{ width: "20%" }}>
                    <Avatar
                      alt="seller avatar"
                      src={chat.Seller.avatar.link}
                      sx={{ width: 56, height: 56, border: 1 }}
                    />
                  </Box>
                  <Box
                    ml={1}
                    sx={{
                      display: "flex",
                      maxWidth: "100%",
                      minWidth: "50%",

                      flexDirection: "column",
                      justifyContent: "left",
                    }}
                  >
                    <Box>
                      <Typography>{chat.Seller.storeName}</Typography>
                    </Box>
                    <Box>
                      <Typography noWrap align="left">
                        {chat.lastMessage}
                      </Typography>
                    </Box>
                  </Box>
                  <Box pr={5} sx={{ width: "100%" }}>
                    <Typography sx={{ fontSize: "12px" }}>
                      {moment(chat.lastUpdated).calendar()}
                    </Typography>
                  </Box>

                  {/* </CardContent>
                  </Card> */}
                  <Divider />
                </MenuItem>
              );
            })}
          </>
        ) : (
          <>{error.length > 1 && <MidPager name={error} />}</>
        )}
      </Box>
    </Menu>
  );
  return (
    <Box>
      <ChatMessages
        bool={msgbool}
        setbool={setmsgbool}
        chatId={chatid}
        chatperson={chatperson}
        setchatbool={setbool}
      />
      <Fab
        ref={ref}
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 70, right: "1%", zIndex: 4 }}
        onClick={(e) => {
          buyerService.isLoggedIn()
            ? setbool(true)
            : toast.error(error, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
        }}
      >
        <ChatIcon />
      </Fab>

      <Box
        sx={{
          width: "30ch",
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 4,
          backgroundColor: "white",
        }}
      >
        {/* <ListItem disablePadding sx={{}} ref={ref}>
          <ListItemButton
            onClick={(e) => {
              setbool(true);
            }}
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem> */}
      </Box>
      {chatList}
    </Box>
  );
}
