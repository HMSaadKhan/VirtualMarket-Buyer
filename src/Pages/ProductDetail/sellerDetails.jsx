import * as React from "react";
import { Card, Box, Typography, CardContent, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import chatService from "../../Services/ChatService";
import { makeStyles } from "@mui/styles";
import ChatMessages from "../../Components/Message/ChatMessages";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const useStyles = makeStyles({
  cardHeadingText: { color: "text.secondary" },
  cardSubText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#ba6a62",
    marginBottom: 5,
  },
});

export default function SellerDetails({ productDetails, msgbool, setmsgbool }) {
  const classes = useStyles();
  const history = useHistory();
  const [chat, setchat] = React.useState();

  React.useEffect(() => {
    if (msgbool) {
      chatInitiate();
    }
  }, [msgbool]);

  const chatInitiate = () => {
    chatService
      .chatInitiate({ seller: productDetails.seller._id })
      .then((data) => {
        setchat(data.data);
        setmsgbool(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <>
      <Box mb={1}>
        <Card>
          {chat && (
            <>
              {/* {console.log(chat)} */}
              <ChatMessages
                bool={msgbool}
                setbool={setmsgbool}
                chatId={chat._id}
                chatperson={chat}
              />
              {/* <ChatBox chat={chat} bool={chatbool} setbool={setchatbool} /> */}
            </>
          )}

          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography className={classes.cardHeadingText}>
                  Shop Name
                </Typography>
                <Typography
                  className={classes.cardSubText}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/seller/" + productDetails.seller._id);
                  }}
                >
                  {productDetails.seller.storeName}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  onClick={(e) => {
                    chatInitiate();
                  }}
                >
                  <ChatIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography className={classes.cardHeadingText}>
              Seller City
            </Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.seller.city.name}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box mb={1}>
        <Card>
          <CardContent>
            <Typography className={classes.cardHeadingText}>
              Minimum Order Quantity
            </Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.minOrder + " Product"}
            </Typography>
            <Typography className={classes.headingText}>
              Warranty Period
            </Typography>
            <Typography className={classes.cardSubText}>
              {productDetails.warrantyPeriod + " Days"}
            </Typography>

            <Typography className={classes.headingText}>
              Available Stock
            </Typography>
            <Typography className={classes.subText}>
              {productDetails.stock > productDetails.minOrder ? (
                <Typography sx={{ fontWeight: "bold", color: "green" }}>
                  {productDetails.stock + " Pieces"}
                </Typography>
              ) : (
                <Typography sx={{ fontWeight: "bold", color: "red" }}>
                  Out of Stock
                </Typography>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
