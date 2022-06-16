/* eslint-disable no-use-before-define */
import React from "react";
import {
  Box,
  Menu,
  Card,
  Typography,
  Button,
  TextField,
  CardContent,
} from "@mui/material";
import moment from "moment";

import { useHistory } from "react-router-dom";

import messageService from "../../Services/MessageService";

import { ChatAnchorContext } from "../../Contexts/ChatAnchor/ChatAnchor";

import { styled } from "@mui/material/styles";

export default function ChatMessages({ bool, setbool, chatId, anchor }) {
  const history = useHistory();
  const [messages, setmessages] = React.useState([]);
  const [msgText, setmsgText] = React.useState("");
  //const anchorContext = React.useContext(ChatAnchorContext);
  console.log(bool, setbool, chatId);
  const FlexBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    margin: "5px",
    flexWrap: "wrap",
  });

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
  }, [chatId, bool, messages]);

  const send = () => {
    messageService
      .sendMessage(chatId, { content: msgText })
      .then((chats) => {
        setmessages([
          {
            sender: "SELLER",
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
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "right",
                          padding: "10px",
                        }}
                      >
                        {message.type === "OFFER" ? (
                          <>
                            <Card
                              sx={{
                                backgroundColor: "#fafafa",
                              }}
                            >
                              <CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {" "}
                                  <Box
                                    sx={{
                                      display: "flex ",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "70px",
                                      width: "70px",
                                    }}
                                  >
                                    <Box>
                                      <img
                                        height="100%"
                                        width="100%"
                                        objectFit="contain"
                                        src={
                                          message.Offer.Product.images[0].link
                                        }
                                        alt=""
                                      />
                                    </Box>
                                  </Box>
                                  <Box>
                                    <Box sx={{ width: "100%" }}>
                                      <Typography
                                        sx={{
                                          color: "#ba6a62",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {message.Offer.Product.name}
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
                                          Brand:
                                        </Typography>
                                        <Typography>
                                          {message.Offer.Product.brand}
                                        </Typography>
                                      </FlexBox>
                                    </Box>
                                  </Box>
                                </Box>
                                <FlexBox justifyContent="center">
                                  <FlexBox>
                                    <Typography
                                      sx={{
                                        color: "#ba6a62",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Offered Price:
                                    </Typography>
                                    <Typography>
                                      {message.Offer.price + " RS"}
                                    </Typography>
                                  </FlexBox>{" "}
                                  <FlexBox>
                                    <Typography
                                      sx={{
                                        color: "#ba6a62",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Required pieces:
                                    </Typography>
                                    <Typography>
                                      {message.Offer.quantity}
                                    </Typography>
                                  </FlexBox>{" "}
                                  <FlexBox>
                                    <Typography
                                      sx={{
                                        color: "#ba6a62",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Offer Status:
                                    </Typography>
                                    <Typography>
                                      {message.Offer.status}
                                    </Typography>
                                  </FlexBox>
                                </FlexBox>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  disabled={
                                    message.Offer.status === "ACCEPTED"
                                      ? false
                                      : true
                                  }
                                >
                                  Add to cart
                                </Button>
                              </CardContent>
                            </Card>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Box>
                              <Card
                                sx={{
                                  backgroundColor: "#ba6a63",
                                  // margin: "10px",
                                  padding: "5px",
                                }}
                              >
                                <Typography>{message.content}</Typography>
                              </Card>
                            </Box>
                          </>
                        )}
                      </Box>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "left",
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
