import * as React from "react";
import { Box } from "@mui/material";
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

export default function ProductDetail(props) {
  const product = useParams();
  const [productDetails, SetProductDetails] = useState("");

  const [reviewDetails, setreviewDetails] = useState([]);
  const [schedulebool, setschedulebool] = useState(false);
  const [loading, setloading] = useState(false);

  const getDetails = () => {
    setloading(true);
    productService.getProductDetails(product.id).then((data) => {
      setloading(false);
      console.log(data);
      SetProductDetails(data);
    });
  };
  useEffect(getDetails, [product.id]);

  const getReviews = () => {
    reviewService
      .ReviewGet(product.id)
      .then((data) => {
        setreviewDetails(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(getReviews, [product.id]);

  return (
    <Box>
      <LoadingScreen bool={loading} />

      {productDetails ? (
        <Box sx={{ maxWidth: "100%" }}>
          <ScheduleOrder
            product={product.id}
            bool={schedulebool}
            setbool={setschedulebool}
            minOrder={productDetails.minOrder}
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
                  // xs: "100%",
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
                  // xs: "100%",
                  sm: "100%",
                  md: "50%",
                  // lg: "30%",
                  // xl: "30%",
                },
              }}
            >
              <ProductOverview
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
              <SellerDetails productDetails={productDetails} />
            </Box>
          </FlexBox>
          <Box>
            <Box>
              <NameBar name={"Reviews"} />
              {reviewDetails.reviews ? (
                <>
                  {console.log("hello")}
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
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
