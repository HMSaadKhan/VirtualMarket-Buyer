import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import productService from "../../Services/ProductServices";
import useState from "react-usestateref";
import { useParams } from "react-router-dom";
import CommentsDisplay from "../../Components/PopUps/CommentsDisplay";
import reviewService from "../../Services/ReviewService";
import ScheduleOrder from "../../Components/PopUps/ScheduleOrder";
import { FlexBox } from "../../Styles/StyledBox";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";
import ProductImages from "./ProductImages";
import ProductOverview from "./ProductOverview";
import SellerDetails from "./sellerDetails";
import ChatBox from "../../Components/Message/Chatbox";
import Bargain from "../../Components/PopUps/Bargain";

export default function ProductDetail(props) {
  const { id } = useParams();

  const [productDetails, SetProductDetails] = useState("");

  const [reviewDetails, setreviewDetails] = useState([]);
  const [schedulebool, setschedulebool] = useState(false);
  const [loading, setloading] = useState(false);
  const [reviewError, setreviewError] = useState("");
  const [chatbool, setchatbool] = React.useState(false);
  const [msgbool, setmsgbool] = React.useState(false);
  const [bargainbool, setbargainbool] = React.useState(false);

  const getDetails = () => {
    setloading(true);
    productService.getProductDetails(id).then((data) => {
      setloading(false);
      console.log(data);
      SetProductDetails(data);
    });
  };
  useEffect(getDetails, [id]);
  console.log(msgbool);

  const getReviews = () => {
    reviewService
      .ReviewGet(id)
      .then((data) => {
        setreviewDetails(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response);
        setreviewError(err.response.data);
      });
  };
  useEffect(getReviews, [id]);

  return (
    <Box sx={{ marginBottom: "100px" }}>
      <LoadingScreen bool={loading} />
      <ChatBox bool={chatbool} setbool={setchatbool} />

      {productDetails ? (
        <Box sx={{ maxWidth: "100%" }}>
          <ScheduleOrder
            product={id}
            bool={schedulebool}
            setbool={setschedulebool}
            minOrder={productDetails.minOrder}
          />
          <Bargain
            productDetails={productDetails}
            bool={bargainbool}
            setbool={setbargainbool}
            setmsgbool={setmsgbool}
          />

          <FlexBox
            sx={{
              flexWrap: {
                xs: "wrap",
                sm: "wrap",
                md: "noWrap",
                lg: "noWrap",
                xl: "noWrap",
              },
              alignItems: "Start",
            }}
          >
            <Box
              m={4}
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "30%",
                  // lg: "30%",
                  // xl: "30%",
                },
              }}
            >
              <ProductImages productDetails={productDetails} />
            </Box>
            <Box
              m={4}
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "50%",
                  // lg: "30%",
                  // xl: "30%",
                },
              }}
            >
              <ProductOverview
                setbargainbool={setbargainbool}
                productDetails={productDetails}
                stateChanged={props.stateChanged}
                reviewDetails={reviewDetails}
                getDetails={getDetails}
              />
            </Box>
            <Box
              m={4}
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "20%",
                  // lg: "30%",
                  // xl: "30%",
                },
                display: { xs: "none", sm: "inline" },
              }}
            >
              <SellerDetails
                productDetails={productDetails}
                msgbool={msgbool}
                setmsgbool={setmsgbool}
              />
            </Box>
          </FlexBox>
          {/* <Box>
            <NameBar name={"Deals"} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DealComponent />
            </Box>
          </Box> */}
          <Box>
            <NameBar name={"Reviews"} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!reviewError ? (
                <Box
                  sx={
                    {
                      // width: {
                      //   xs: "100%",
                      //   sm: "100%",
                      //   md: "20%",
                      //   lg: "100%",
                      //   xl: "100%",
                      // },
                    }
                  }
                >
                  {reviewDetails.reviews ? (
                    <>
                      <Box>
                        {reviewDetails.reviews.map((review) => (
                          <CommentsDisplay review={review} key={review._id} />
                        ))}
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#ba6a62",
                    }}
                  >
                    {reviewError}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
