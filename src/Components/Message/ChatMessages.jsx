/* eslint-disable no-use-before-define */
import React from "react";
import {
  Box,
  Menu,
  Card,
  CardContent,
  Divider,
  Avatar,
  Typography,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import moment from "moment";

import { useHistory } from "react-router-dom";

import ChatIcon from "@mui/icons-material/Chat";
import chatService from "../../Services/ChatService";
import messageService from "../../Services/MessageService";

export default function ChatMessages({ bool, setbool, chatId, anchor }) {
  const history = useHistory();
  const ref = React.useRef();
  const [msgbool, setmsgbool] = React.useState(false);

  const [messagesent, setmessagesent] = React.useState();
  const [messages, setmessages] = React.useState([]);
  const [msgText, setmsgText] = React.useState("");
  console.log(chatId);

  React.useEffect(() => {
    setmessages([]);
    messageService
      .getMessage(chatId)
      .then((chats) => {
        console.log(chats);
        setmessages(chats.data.reverse());
      })
      .catch((error) => {
        console.log(error.response);
        setmessages([]);
      });
  }, [chatId, bool]);
  React.useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, msgText]);

  const send = () => {
    messageService
      .sendMessage(chatId, { content: msgText })
      .then((chats) => {
        setmessages([
          {
            sender: "BUYER",
            createdAt: new Date(),
            content: msgText,
            type: "TEXT",
          },
          ...messages,
        ]);
        setmsgText("");
        console.log(chats.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const msgBox = (
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
      anchorEl={anchor}
      open={bool}
      PaperProps={{
        style: {
          height: 600,
          width: "50ch",
        },
      }}
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: 580,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          focus="false"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            m={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>Messages</Typography>
          </Box>
          <Button
            onClick={() => {
              setbool(false);
              console.log("button");
            }}
          >
            Close
          </Button>
        </Box>
        <Box
          sx={{
            height: "90%",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {messages ? (
            <>
              {messages.map((message) => {
                return (
                  <Box
                    key={message._id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    // ref={ref}
                  >
                    {message.sender === "BUYER" ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "right",
                          }}
                        >
                          <Card
                            sx={{
                              backgroundColor: "#ba6a63",
                              margin: "10px",
                              padding: "10px",
                            }}
                          >
                            <Typography>{message.content}</Typography>
                          </Card>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "right",
                          }}
                        >
                          <Card
                            sx={{
                              backgroundColor: "yellow",
                              margin: "10px",
                              padding: "10px",
                            }}
                          >
                            <Typography>{message.content}</Typography>
                          </Card>
                        </Box>
                      </>
                    )}
                  </Box>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Box>

        <Box
          m={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <TextField
            autoFocus
            fullWidth
            multiline
            value={msgText}
            onChange={(e) => {
              setmsgText(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                send();
                // write your functionality here
              }
            }}
          />

          <Button
            onClick={() => {
              send();
            }}
          >
            {" "}
            send
          </Button>
        </Box>
      </Box>
    </Menu>
  );

  return <Box>{msgBox}</Box>;
}
