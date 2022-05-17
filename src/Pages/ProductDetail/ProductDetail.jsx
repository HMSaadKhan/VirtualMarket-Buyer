import * as React from "react";
import { styled } from "@mui/material/styles";
import { Add, Remove } from "@mui/icons-material";
import {
  Card,
  Box,
  Typography,
  CardContent,
  IconButton,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import productService from "../../Services/ProductServices";
import cartService from "../../Services/CartServices";
import { toast } from "react-toastify";
import useState from "react-usestateref";
import { useParams } from "react-router-dom";
import CommentsDisplay from "../../Components/PopUps/CommentsDisplay";
import reviewService from "../../Services/ReviewService";
import favoriteService from "../../Services/FavoritesService";
import SellerMismatch from "../../Components/PopUps/SellerMismatch";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DateTimePicker from "react-datetime-picker";
import ScheduleOrder from "../../Components/PopUps/ScheduleOrder";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  name: {
    fontSize: "15px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ba6a62",
  },
  images: {
    width: "60px",
    height: "60px",
    marginRight: "10px",
    //objectFit: "cover",
    backgroundSize: "cover",
  },

  headingText: { fontSize: "15px", fontWeight: "bold", color: "#ba6a62" },
  subText: { color: "secondary" },
  description: { height: "auto", width: "auto" },
  cardHeadingText: { color: "text.secondary" },
  cardSubText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#ba6a62",
    marginBottom: 5,
  },
});

export default function ProductDetail(props) {
  const classes = useStyles();
  const product = useParams();
  const [productDetails, SetProductDetails] = useState("");
  const [quantity, SetQuantity] = useState();
  const [minusButtonCheck, setMinusButton] = useState(true);
  const [plusButtonCheck, setPlusButton] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [reviews, setreviews] = useState([]);
  const [favoriteChecked, setFavoriteChecked] = React.useState(false);
  const [bool, setbool] = useState(false);
  const [schedulebool, setschedulebool] = useState(false);
  const [overallRating, setoverallRating] = useState();
  const [totalRating, settotalRating] = useState("");
  const [type, settype] = useState();
  const [value, onChange] = useState(new Date());

  const StyledButton = styled(Button)({
    color: "#ffff",
    backgroundColor: "#ba6a62",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#C78781",
      color: "#fafafa",
    },
  });
  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const favoriteHandleChange = (event) => {
    setFavoriteChecked(event.target.checked);
    if (event.target.checked === true) {
      favoriteService
        .AddtoFavorite({ product: product.id })
        .then((data) => {
          toast.success(data.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        });
    }
    if (event.target.checked === false) {
      favoriteService
        .DeletefromFavorite(product.id)
        .then((data) => {
          console.log(data);
          toast.success(data.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        });
    }
  };
  const getDetails = () => {
    productService
      .getProductDetails(product.id)
      .then((data) => {
        SetProductDetails(data);
        SetQuantity(data.minOrder);
        setFavoriteChecked(data.favourite);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getDetails, []);

  const addToCart = (Type) => {
    console.log(Type);
    cartService
      .addToCart({ product: product.id, quantity, type: Type })
      .then((data) => {
        props.stateChanged(data);
        toast.success(data.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setbool(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        if (error.response.data === "Seller Mismatch") {
          setbool(true);
          console.log(error.response.data);
        }
      });
  };
  const minusButton = () => {
    if (quantity <= productDetails.minOrder) {
      setMinusButton(false);
      setPlusButton(false);
    } else {
      SetQuantity(quantity - 1);
      setPlusButton(false);
    }
  };

  const plusButton = () => {
    if (quantity >= productDetails.stock) {
      setPlusButton(true);
      setMinusButton(false);
    } else {
      setMinusButton(false);
      SetQuantity(quantity + 1);
    }
  };

  const getReviews = () => {
    reviewService
      .ReviewGet(product.id)
      .then((data) => {
        setreviews(data.reviews);
        setoverallRating(data.rating);
        settotalRating(data.total);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(getReviews, []);

  const sellerMismatch = () => {
    cartService
      .clearCart()
      .then((data) => {
        addToCart(type);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SellerMismatch
        bool={bool}
        setbool={setbool}
        sellerMismatch={sellerMismatch}
      />
      {/* <ScheduleOrder
        product={product.id}
        bool={schedulebool}
        setbool={setschedulebool}
        minOrder={productDetails.minOrder}
      /> */}
      {productDetails ? (
        <Box>
          <ScheduleOrder
            product={product.id}
            bool={schedulebool}
            setbool={setschedulebool}
            minOrder={productDetails.minOrder}
          />
          <Box className={classes.root}>
            <Box m={4} sx={{ width: "60%" }}>
              <Card>
                <CardContent>
                  <Box ml={2}>
                    <img
                      width="300"
                      height="300"
                      src={productDetails.images[imageIndex].link}
                      alt="main Image"
                    />
                  </Box>
                </CardContent>
              </Card>
              <Box m={1}>
                <Card>
                  <CardContent>
                    {productDetails.images.map((images, index) => (
                      <img
                        className={classes.images}
                        key={index}
                        src={images.link}
                        alt="images"
                        onClick={(e) => {
                          setImageIndex(index);
                        }}
                        loading="lazy"
                      />
                    ))}
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box m={4} sx={{ width: "100%" }}>
              <Card>
                <CardContent>
                  <StyledBox>
                    <Box>
                      <Typography className={classes.name}>
                        {productDetails.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItem: "center" }}>
                        <Typography>
                          <Rating
                            value={overallRating}
                            size="small"
                            precision={0.25}
                          />
                        </Typography>
                        <Typography>({totalRating})</Typography>
                      </Box>
                      <Box sx={{ display: "flex " }}>
                        <Typography className={classes.headingText}>
                          Brand
                        </Typography>
                        <Typography ml={1} className={classes.subText}>
                          {productDetails.brand}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Typography className={classes.name}>
                          <Checkbox
                            sx={{
                              color: "#ba6a62",
                              "&.Mui-checked": {
                                color: "#ba6a62",
                              },
                            }}
                            checked={favoriteChecked}
                            onChange={favoriteHandleChange}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                          />
                        </Typography>
                      </Box>
                      <Box>
                        {console.log(value)}
                        <ScheduleIcon
                          onClick={(e) => {
                            setschedulebool(true);
                          }}
                        />
                      </Box>
                    </Box>
                  </StyledBox>
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
                  <Box sx={{ display: "flex ", alignItems: "center" }}>
                    <IconButton
                      disabled={minusButtonCheck}
                      onClick={minusButton}
                    >
                      <Remove />
                    </IconButton>
                    <Box sx={{ width: "10%" }}>
                      <TextField size="small" value={quantity} />
                    </Box>
                    <IconButton disabled={plusButtonCheck} onClick={plusButton}>
                      <Add />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box m={1}>
                      <StyledButton
                        onClick={(e) => {
                          settype("DEFAULT");
                          addToCart("DEFAULT");
                        }}
                      >
                        Add to cart
                      </StyledButton>
                    </Box>
                    <Box m={1}>
                      <StyledButton>Bargain</StyledButton>
                    </Box>
                    <Box m={1}>
                      <StyledButton>Custom Order</StyledButton>
                    </Box>
                    <Box m={1}>
                      <StyledButton
                        onClick={(e) => {
                          settype("SAMPLE");
                          addToCart("SAMPLE");
                        }}
                      >
                        Sample Order
                      </StyledButton>
                    </Box>
                  </Box>
                  <Box className={classes.description}>
                    <Typography mt={2} mb={2}>
                      {productDetails.description}
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box m={4} sx={{ width: "40%" }}>
              <Box>
                <Box mb={1}>
                  <Card>
                    <CardContent>
                      <Typography className={classes.cardHeadingText}>
                        Shop Name
                      </Typography>
                      <Typography className={classes.cardSubText}>
                        {productDetails.seller.storeName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box mb={1}>
                  <Card>
                    <CardContent>
                      <Typography className={classes.cardHeadingText}>
                        Shop Address
                      </Typography>
                      <Typography className={classes.cardSubText}>
                        {productDetails.seller.address}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box mb={1}>
                  <Card>
                    <CardContent>
                      <Typography className={classes.headingText}>
                        Warranty Period
                      </Typography>
                      <Typography className={classes.subText}>
                        {productDetails.warrantyPeriod} Days
                      </Typography>

                      <Typography className={classes.headingText}>
                        Available Stock
                      </Typography>
                      <Typography className={classes.subText}>
                        {productDetails.stock} Pieces
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box mb={1}>
                  <Card>
                    <CardContent>
                      <Typography className={classes.cardHeadingText}>
                        Phone No
                      </Typography>
                      <Typography className={classes.cardSubText}>
                        {productDetails.seller.phone}
                      </Typography>
                      <Typography className={classes.cardHeadingText}>
                        Email
                      </Typography>
                      <Typography className={classes.cardSubText}>
                        {productDetails.seller.email}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box sx={{ backgroundColor: "#ba6a62", color: "white" }}>
              <Typography
                sx={{
                  marginLeft: "20%",
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Comments
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "7%" }}>
              {reviews ? (
                <>
                  {reviews.map((review) => (
                    <CommentsDisplay review={review} key={review._id} />
                  ))}
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
    </>
  );
}
