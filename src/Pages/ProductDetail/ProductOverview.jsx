/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  Card,
  Box,
  Typography,
  CardContent,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import cartService from "../../Services/CartServices";
import { toast } from "react-toastify";
import useState from "react-usestateref";
import { useParams, useHistory } from "react-router-dom";
import favoriteService from "../../Services/FavoritesService";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ScheduleOrder from "../../Components/PopUps/ScheduleOrder";
import { FlexBox } from "../../Styles/StyledBox";
import LoadingScreen from "../../Components/LoadingScreen";
import buyerService from "../../Services/BuyerService";
import Counter from "../../Components/Counter";

const useStyles = makeStyles({
  name: {
    fontSize: "15px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ba6a62",
  },

  headingText: { fontSize: "15px", fontWeight: "bold", color: "#ba6a62" },
  subText: { color: "secondary" },
  description: { height: "auto", width: "auto" },
});

export default function ProductOverview({
  productDetails,
  stateChanged,
  reviewDetails,
  getDetails,
  setbargainbool,
}) {
  const history = useHistory();
  const classes = useStyles();
  const product = useParams();
  const [quantity, SetQuantity] = useState(productDetails.minOrder);

  const [favoriteChecked, setFavoriteChecked] = React.useState(
    productDetails.favourite
  );
  const [bool, setbool] = useState(false);
  const [schedulebool, setschedulebool] = useState(false);
  const [overallRating, setoverallRating] = useState(reviewDetails.rating);
  const [totalRating, settotalRating] = useState(reviewDetails.total | 0);
  const [type, settype] = useState();
  const [disable, setDisable] = useState(true);
  const [loading, setloading] = useState(false);
  const [addtoCartCheck, setaddtoCartCheck] = useState(false);

  const favoriteHandleChange = (event) => {
    if (event.target.checked === true) {
      setloading(true);
      favoriteService
        .AddtoFavorite({ product: product.id })
        .then((data) => {
          setloading(false);
          setFavoriteChecked(true);
          getDetails();
        })
        .catch((error) => {
          setloading(false);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        });
    }
    if (event.target.checked === false) {
      setloading(true);
      favoriteService
        .DeletefromFavorite(product.id)
        .then((data) => {
          setloading(false);
          setFavoriteChecked(false);
          getDetails();
        })
        .catch((error) => {
          setloading(false);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        });
    }
  };

  const addToCart = (Type) => {
    setloading(true);
    cartService
      .addToCart({ product: product.id, quantity, type: Type })
      .then((data) => {
        stateChanged(data);
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setloading(false);
        setbool(false);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response);
        if (error.response.data === "Product Out of Stock") {
          window.location.reload();
        }
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const stockCheck = () => {
    if (productDetails.stock < quantity || quantity < productDetails.minOrder) {
      setaddtoCartCheck(true);
    } else {
      setaddtoCartCheck(false);
    }
  };
  useEffect(stockCheck, [quantity]);

  return (
    <>
      <LoadingScreen bool={loading} />
      <ScheduleOrder
        product={productDetails._id}
        bool={schedulebool}
        setbool={setschedulebool}
        minOrder={productDetails.minOrder}
        stock={productDetails.stock}
      />
      <Card>
        <CardContent>
          <FlexBox sx={{ justifyContent: "space-between" }}>
            <Box>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#ba6a62" }}
              >
                {productDetails.name}
              </Typography>
              <Box sx={{ display: "flex", alignItem: "center" }}>
                <Typography>
                  <Rating
                    value={overallRating}
                    size="small"
                    precision={0.25}
                    readOnly
                  />
                </Typography>
                <Typography>({totalRating})</Typography>
              </Box>
              <Box sx={{ display: "flex " }}>
                <Typography className={classes.headingText}>Brand</Typography>
                <Typography ml={1} className={classes.subText}>
                  {productDetails.brand}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex ",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Checkbox
                  checked={favoriteChecked}
                  onChange={favoriteHandleChange}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              </Box>
              <Box>
                <Tooltip title="schedule Item">
                  <ScheduleIcon
                    sx={{
                      color: "#ba6a62",
                    }}
                    onClick={(e) => {
                      if (buyerService.isLoggedIn()) {
                        setschedulebool(true);
                      } else {
                        history.push("/login");
                        // history.push("/login", [
                        //   "/:anything/:name/:id/",
                        //   "/" +
                        //     productDetails.name +
                        //     "/" +
                        //     productDetails._id +
                        //     "/",
                        // ]);
                      }
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </FlexBox>
          <Divider />
          <Box>
            <Typography
              m={1}
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#ba6a62",
              }}
            >
              PKR. {productDetails.price}
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: "flex ", alignItems: "center" }}>
              <Counter
                check={
                  productDetails.minOrder > productDetails.stock ? true : false
                }
                num={quantity}
                setNum={SetQuantity}
                minValue={productDetails.minOrder}
                maxValue={productDetails.stock}
              />
            </Box>
            <Box>
              {quantity > productDetails.stock && productDetails.stock > 0 ? (
                <>
                  {productDetails.minOrder > productDetails.stock ? (
                    <></>
                  ) : (
                    <>
                      <Typography m={1} color="red" variant="subtitle">
                        {" "}
                        Maximum {productDetails.stock} products can be ordered
                      </Typography>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
              {quantity < productDetails.minOrder ? (
                <>
                  <Typography m={1} color="red" variant="subtitle">
                    {" "}
                    Minimum {productDetails.minOrder} product can be ordered
                  </Typography>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box m={1}>
              <Button
                disabled={addtoCartCheck}
                variant="contained"
                onClick={(e) => {
                  settype("DEFAULT");
                  addToCart("DEFAULT");
                }}
              >
                Add to cart
              </Button>
            </Box>

            {productDetails.sampleOrder ? (
              <Box m={1}>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    settype("SAMPLE");
                    addToCart("SAMPLE");
                  }}
                >
                  Sample Order
                </Button>
              </Box>
            ) : (
              <></>
            )}
            <Box m={1}>
              <Button
                variant="contained"
                onClick={() => {
                  setbargainbool(true);
                }}
              >
                Bargain
              </Button>
            </Box>
            {/* <Box m={1}>
                      <Button variant="contained" disabled={disable}>
                        Custom Order
                      </Button>
                    </Box> */}
          </Box>
          <Box className={classes.description}>
            <Typography mt={2} mb={2}>
              {productDetails.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
