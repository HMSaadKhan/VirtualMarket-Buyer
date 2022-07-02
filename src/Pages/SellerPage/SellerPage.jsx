import { Box } from "@mui/material";
import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import sellerService from "../../Services/SellerService";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import chatService from "../../Services/ChatService";
import ChatMessages from "../../Components/Message/ChatMessages";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton } from "@mui/material";
import productService from "../../Services/ProductServices";
import ProductComponent from "../../Pages/Product/ProductComponent";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";
import { toast } from "react-toastify";
import ChatBox from "../../Components/Message/Chatbox";

const useStyles = makeStyles({
  pfimage: {
    objectFit: "contain",
    //backgroundSize: "contain",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
});
export default function SellerPage() {
  const classes = useStyles();
  const seller = useParams();
  console.log(seller);
  const [sellerDetails, setsellerDetails] = React.useState();
  const [chat, setchat] = React.useState();
  const [msgbool, setmsgbool] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [loading, setloading] = React.useState(false);

  const [chatbool, setchatbool] = React.useState(false);
  useEffect(() => {
    setloading(true);
    sellerService
      .sellerDetails(seller.id)
      .then((seller) => {
        setloading(false);
        console.log(seller);
        setsellerDetails(seller.data);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response);
      });
    productService
      .getbySeller(seller.id)
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response);
      });
  }, [seller.id]);

  const chatInitiate = () => {
    chatService
      .chatInitiate({ seller: seller.id })
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
    <Box sx={{ marginBottom: "50px" }}>
      <LoadingScreen bool={loading} />
      <ChatBox bool={chatbool} setbool={setchatbool} />
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
      <Box
        sx={{
          //width: { xs: "100%", md: "50%", lg: "50%", xl: "100%" },
          width: "100%",

          display: "flex ",
          justifyContent: "center",
        }}
      >
        {sellerDetails && (
          <Box sx={{ backgroundColor: "#fafafa", width: "1000px" }}>
            <Box>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      ml={2}
                      sx={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <CardMedia
                        className={classes.pfimage}
                        component="img"
                        height="100%"
                        width="100%"
                        image={sellerDetails.avatar.link}
                        alt="Sller Store Image"
                        border="1"
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        ml={2}
                        variant="h5"
                        color="primary"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {sellerDetails.storeName}
                      </Typography>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography ml={2} variant="subtitle" component="div">
                          {sellerDetails.city.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            ml={2}
                            variant="body2"
                            component="text.secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Online Payments
                          </Typography>
                          {sellerDetails.onlinePaymentOption ? (
                            <CheckCircleIcon
                              fontSize="small"
                              sx={{ color: "green" }}
                            />
                          ) : (
                            <CancelIcon
                              fontSize="small"
                              sx={{ color: "red" }}
                            />
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "block",
                            lg: "block",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            ml={2}
                            variant="body2"
                            component="text.secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Same City Delivery
                          </Typography>
                          <Typography ml={1} variant="subtitle" component="div">
                            {"PKR." + sellerDetails.sameCityDeliveryCharge}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            ml={2}
                            variant="body2"
                            component="text.secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Different City Delivery
                          </Typography>
                          <Typography ml={1} variant="subtitle" component="div">
                            {"PKR." + sellerDetails.diffCityDeliveryCharge}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "block",
                            lg: "block",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            ml={2}
                            variant="body2"
                            component="text.secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Advance Payments
                          </Typography>
                          {sellerDetails.advancePayment ? (
                            <CheckCircleIcon
                              fontSize="small"
                              sx={{ color: "green" }}
                            />
                          ) : (
                            <CancelIcon
                              fontSize="small"
                              sx={{ color: "red" }}
                            />
                          )}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            ml={2}
                            variant="body2"
                            component="text.secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Advance Payment
                          </Typography>
                          <Typography
                            ml={1}
                            variant="body2"
                            component="text.secondary"
                          >
                            {sellerDetails.advancePaymentAmount + "%"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            ml={2}
                            variant="body2"
                            component="text.secondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            {sellerDetails.advancePaymentCriteria === 1 ? (
                              <></>
                            ) : (
                              <>On Min. Order of</>
                            )}
                          </Typography>
                          <Typography
                            ml={1}
                            variant="body2"
                            component="text.secondary"
                          >
                            {sellerDetails.advancePaymentCriteria === 1 ? (
                              <>On All Orders</>
                            ) : (
                              "PKR." + sellerDetails.advancePaymentCriteria
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  mt={2}
                  sx={{
                    justifyContent: "space-between",
                    display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        ml={2}
                        variant="body2"
                        component="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Same City Delivery
                      </Typography>
                      <Typography ml={1} variant="subtitle" component="div">
                        {"PKR." + sellerDetails.sameCityDeliveryCharge}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        ml={2}
                        variant="body2"
                        component="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Different City Delivery
                      </Typography>
                      <Typography ml={1} variant="subtitle" component="div">
                        {"PKR." + sellerDetails.diffCityDeliveryCharge}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        ml={2}
                        variant="body2"
                        sx={{ fontWeight: "bold" }}
                        component="text.secondary"
                      >
                        Advance Payments
                      </Typography>
                      {sellerDetails.advancePayment ? (
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: "green" }}
                        />
                      ) : (
                        <CancelIcon fontSize="small" sx={{ color: "red" }} />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        ml={2}
                        variant="body2"
                        component="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Advance Payment
                      </Typography>
                      <Typography
                        ml={1}
                        variant="body2"
                        component="text.secondary"
                      >
                        {sellerDetails.advancePaymentAmount + "%"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        ml={2}
                        variant="body2"
                        component="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {sellerDetails.advancePaymentCriteria === 1 ? (
                          <></>
                        ) : (
                          <>On Min. Order of</>
                        )}
                      </Typography>
                      <Typography
                        ml={1}
                        variant="body2"
                        component="text.secondary"
                      >
                        {sellerDetails.advancePaymentCriteria === 1 ? (
                          <>On All Orders</>
                        ) : (
                          "PKR." + sellerDetails.advancePaymentCriteria
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  m={2}
                  variant="h5"
                  color="primary"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Products
                </Typography>
                {products.length > 0 ? (
                  <>
                    <Grid container justifyContent="center" spacing={2}>
                      {products.map((product, index) => (
                        <ProductComponent key={index} product={product} />
                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <MidPager name={"No Items Found"} />
                  </>
                )}
              </CardContent>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
