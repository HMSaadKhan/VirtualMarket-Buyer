/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
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
  IconButton,
  Avatar,
} from "@mui/material";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import messageService from "../../Services/MessageService";
import MsgLoading from "../MsgLoading";

import { ChatAnchorContext } from "../../Contexts/ChatAnchor/ChatAnchor";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import cartService from "../../Services/CartServices";
import { SocketAPIContext } from "../../Contexts/SocketAPI/SocketAPi";
import { useContext } from "react";
import { CartCountContext } from "../../Contexts/CartChanger/CartChanger";

const useStyles = makeStyles({
  image: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
  imagemsg: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
  },
  imageprev: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
});

export default function ChatMessages({
  bool,
  setbool,
  chatId,
  chatperson,
  setchatbool,
}) {
  const classes = useStyles();
  const [messages, setmessages] = React.useState([]);
  const [msgText, setmsgText] = React.useState("");
  const [error, seterror] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const cartCount = useContext(CartCountContext);
  const anchorContext = React.useContext(ChatAnchorContext);
  const socket = React.useContext(SocketAPIContext);
  const [image, setImage] = React.useState();

  const FlexBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    margin: "5px",
  });

  const [ImagePreview, SetImagePreview] = React.useState(null);
  const ImageSetting = (e) => {
    const image = e.target.files[0];
    setImage(image);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        SetImagePreview(reader.result);
      }
    };
    console.log(image);
    reader.readAsDataURL(image);
  };

  const getMessages = () => {
    setloading(true);
    setmessages([]);
    messageService
      .getMessage(chatId)
      .then((chats) => {
        setloading(false);
        console.log(chats);
        setmessages(chats.data.reverse());
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response);
        setmessages([]);
      });
  };

  React.useEffect(getMessages, [chatId, bool]);

  // React.useEffect(() => {
  //   socket.on("receivemsg", (senderID, receiverID, msg, roomID) => {
  //     console.log(senderID, receiverID, msg, roomID);
  //     if (chatId === roomID) {
  //       setmessages([msg, ...messages]);
  //     }
  //   });
  // }, [socket]);

  const send = () => {
    const msg = {
      sender: "BUYER",
      createdAt: new Date(),
      content: msgText,
      type: "TEXT" || "OFFER",
    };
    // socket.emit("sendmsg", {
    //   senderID: chatperson.Buyer,
    //   receiverID: chatperson.Seller._id,
    //   msg: msg,
    //   roomID: chatId,
    // });
    messageService
      .sendMessage(chatId, { content: msgText })
      .then((chats) => {
        setmessages([msg, ...messages]);
        //getMessages();
        setmsgText("");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const sendImage = async () => {
    const data = new FormData();
    data.append("image", image);
    const msg = {
      sender: "BUYER",
      createdAt: new Date(),
      type: "IMAGE",
    };
    // socket.emit("sendmsg", {
    //   senderID: chatperson.Buyer,
    //   receiverID: chatperson.Seller._id,
    //   msg: msg,
    //   roomID: chatId,
    // });
    console.log(data);
    await messageService
      .sendImage(chatId, data)
      .then((chats) => {
        setmessages([msg, ...messages]);
        getMessages();
        SetImagePreview(null);
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
      anchorEl={anchorContext.anchor}
      open={bool}
      PaperProps={{
        style: {
          height: 600,
          width: "50ch",
        },
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {chatperson ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  setchatbool(true);
                  setbool(false);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Box>
                <Avatar
                  alt="seller avatar"
                  src={chatperson.Seller.avatar.link}
                  sx={{ width: 36, height: 36, border: 1 }}
                />
              </Box>
              <Box ml={1}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#ba6a62",
                  }}
                >
                  {chatperson.Seller.storeName}
                </Typography>
              </Box>
            </Box>
          ) : (
            <></>
          )}

          <IconButton
            onClick={() => {
              setbool(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "90%",
            overflowY: "scroll",

            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <MsgLoading bool={loading} />
          </Box>
          {messages.length > 0 ? (
            <>
              {messages.map((message, index) => {
                return (
                  <Box
                    key={index}
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
                                width: "80%",
                              }}
                            >
                              <CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                  }}
                                >
                                  {" "}
                                  <Box>
                                    <img
                                      className={classes.image}
                                      src={message.Offer.Product.images[0].link}
                                      alt=""
                                    />
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
                                <Box justifyContent="left">
                                  <FlexBox>
                                    <Typography
                                      sx={{
                                        color: "#ba6a62",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Offered Price:&nbsp;
                                    </Typography>
                                    <Typography>
                                      {message.Offer.price + " PKR"}
                                    </Typography>
                                  </FlexBox>{" "}
                                  <FlexBox>
                                    <Typography
                                      sx={{
                                        color: "#ba6a62",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Quantity:&nbsp;
                                    </Typography>
                                    <Typography>
                                      {message.Offer.quantity + " pieces"}
                                    </Typography>
                                  </FlexBox>
                                  <FlexBox>
                                    <Typography
                                      sx={{
                                        color: "#ba6a62",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Offer Status:&nbsp;
                                    </Typography>
                                    <Typography>
                                      {message.Offer.status}
                                    </Typography>
                                  </FlexBox>
                                </Box>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  disabled={
                                    message.Offer.status === "ACCEPTED"
                                      ? false
                                      : true
                                  }
                                  onClick={() => {
                                    cartService
                                      .addOffer(message.Offer._id)
                                      .then((data) => {
                                        console.log(data.data);
                                        toast.success(data.data, {
                                          position: toast.POSITION.BOTTOM_LEFT,
                                        });
                                        cartCount.setChanger(data);
                                        getMessages();
                                      })
                                      .catch((error) => {
                                        console.log(error.response);
                                        toast.error(error.response.data, {
                                          position: toast.POSITION.BOTTOM_LEFT,
                                        });
                                      });
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </CardContent>
                              <Typography
                                pr={1}
                                pb={1}
                                align="right"
                                sx={{ fontSize: "10px" }}
                              >
                                {moment(message.Offer.createdAt).format("LT")}
                              </Typography>
                            </Card>
                          </>
                        ) : (
                          <>
                            {message.type === "IMAGE" ? (
                              <>
                                <Box>
                                  <Card
                                    sx={{
                                      backgroundColor: "#ba6a63",
                                      // margin: "10px",
                                      minWidth: "100px",
                                      maxWidth: "300px",
                                      padding: "5px",
                                    }}
                                  >
                                    <Box>
                                      <img
                                        className={classes.imagemsg}
                                        src={message.content}
                                        alt="image"
                                      />
                                    </Box>

                                    <Typography
                                      align="right"
                                      sx={{ fontSize: "10px", color: "white" }}
                                    >
                                      {moment(message.createdAt).format("LT")}
                                    </Typography>
                                  </Card>
                                </Box>
                              </>
                            ) : (
                              <>
                                {" "}
                                <Box>
                                  <Card
                                    sx={{
                                      backgroundColor: "#ba6a63",
                                      // margin: "10px",
                                      minWidth: "100px",
                                      maxWidth: "300px",
                                      padding: "5px",
                                    }}
                                  >
                                    <Typography align="left">
                                      {message.content}
                                    </Typography>

                                    <Typography
                                      align="right"
                                      sx={{ fontSize: "10px", color: "white" }}
                                    >
                                      {moment(message.createdAt).format("LT")}
                                    </Typography>
                                  </Card>
                                </Box>
                              </>
                            )}
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
                              backgroundColor: "#fafafa",
                              margin: "5px",
                              minWidth: "100px",
                              maxWidth: "300px",
                              padding: "5px",
                            }}
                          >
                            <Typography align="left">
                              {message.content}
                            </Typography>

                            <Typography align="right" sx={{ fontSize: "10px" }}>
                              {moment(message.createdAt).format("LT")}
                            </Typography>
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
            alignItems: "start    ",
          }}
        >
          <IconButton>
            <label htmlFor="file">
              <AddAPhotoIcon />
            </label>
          </IconButton>
          <form>
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => ImageSetting(e)}
            />
          </form>
          {ImagePreview ? (
            <Box
              sx={{
                border: 1,
                width: "100%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  SetImagePreview(null);
                }}
              >
                <CloseIcon />
              </IconButton>
              <img className={classes.imageprev} src={ImagePreview} />
            </Box>
          ) : (
            <TextField
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
          )}
          {ImagePreview ? (
            <IconButton
              onClick={() => {
                sendImage();
              }}
            >
              <SendIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                send();
              }}
            >
              <SendIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Menu>
  );

  return <Box>{msgBox}</Box>;
}
