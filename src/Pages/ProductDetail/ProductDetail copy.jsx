// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import { Add, Remove } from "@mui/icons-material";
// import {
//   Card,
//   Box,
//   Typography,
//   CardContent,
//   IconButton,
//   TextField,
//   Button,
//   Divider,
//   Tooltip,
// } from "@mui/material";
// import Rating from "@mui/material/Rating";
// import { makeStyles } from "@mui/styles";
// import { useEffect } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import productService from "../../Services/ProductServices";
// import cartService from "../../Services/CartServices";
// import { toast } from "react-toastify";
// import useState from "react-usestateref";
// import { useParams, useHistory } from "react-router-dom";
// import CommentsDisplay from "../../Components/PopUps/CommentsDisplay";
// import reviewService from "../../Services/ReviewService";
// import favoriteService from "../../Services/FavoritesService";
// import SellerMismatch from "../../Components/PopUps/SellerMismatch";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import ScheduleOrder from "../../Components/PopUps/ScheduleOrder";
// import { FlexBox } from "../../Styles/StyledBox";
// import { NameBar } from "../../Styles/NameBar";
// import LoadingScreen from "../../Components/LoadingScreen";
// import buyerService from "../../Services/BuyerService";

// const useStyles = makeStyles({
//   name: {
//     fontSize: "15px",
//   },
//   price: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#ba6a62",
//   },
//   images: {
//     width: "60px",
//     height: "60px",
//     marginRight: "10px",
//     objectFit: "contain",
//     //backgroundSize: "cover",
//   },
//   image: {
//     objectFit: "contain",
//     //backgroundSize: "contain",
//   },

//   headingText: { fontSize: "15px", fontWeight: "bold", color: "#ba6a62" },
//   subText: { color: "secondary" },
//   description: { height: "auto", width: "auto" },
//   cardHeadingText: { color: "text.secondary" },
//   cardSubText: {
//     fontSize: "15px",
//     fontWeight: "bold",
//     color: "#ba6a62",
//     marginBottom: 5,
//   },
// });

// export default function ProductDetail(props) {
//   const history = useHistory();
//   const classes = useStyles();
//   const product = useParams();
//   const [productDetails, SetProductDetails] = useState("");
//   const [quantity, SetQuantity] = useState();
//   const [stock, SetStock] = useState();
//   const [minusButtonCheck, setMinusButton] = useState(true);
//   const [plusButtonCheck, setPlusButton] = useState(false);
//   const [imageIndex, setImageIndex] = useState(0);
//   const [reviews, setreviews] = useState([]);
//   const [favoriteChecked, setFavoriteChecked] = React.useState(false);
//   const [bool, setbool] = useState(false);
//   const [schedulebool, setschedulebool] = useState(false);
//   const [overallRating, setoverallRating] = useState();
//   const [totalRating, settotalRating] = useState("");
//   const [type, settype] = useState();
//   const [disable, setDisable] = useState(true);
//   const [AocBool, setAoCBool] = useState(false);
//   const [loading, setloading] = useState(false);

//   const favoriteHandleChange = (event) => {
//     if (event.target.checked === true) {
//       setloading(true);
//       favoriteService
//         .AddtoFavorite({ product: product.id })
//         .then((data) => {
//           setloading(false);
//           setFavoriteChecked(true);
//         })
//         .catch((error) => {
//           setloading(false);
//           toast.error(error.response.data, {
//             position: toast.POSITION.BOTTOM_LEFT,
//           });
//         });
//     }
//     if (event.target.checked === false) {
//       setloading(true);
//       favoriteService
//         .DeletefromFavorite(product.id)
//         .then((data) => {
//           setloading(false);
//           setFavoriteChecked(false);
//         })
//         .catch((error) => {
//           setloading(false);
//           toast.error(error.response.data, {
//             position: toast.POSITION.BOTTOM_LEFT,
//           });
//         });
//     }
//   };
//   const getDetails = () => {
//     setloading(true);
//     productService.getProductDetails(product.id).then((data) => {
//       setloading(false);
//       SetProductDetails(data);
//       SetStock(data.stock);
//       SetQuantity(data.minOrder);
//       setFavoriteChecked(data.favourite);
//     });
//   };
//   useEffect(getDetails, []);

//   const addToCart = (Type) => {
//     setloading(true);
//     cartService
//       .addToCart({ product: product.id, quantity, type: Type })
//       .then((data) => {
//         props.stateChanged(data);
//         toast.success(data.data, {
//           position: toast.POSITION.BOTTOM_LEFT,
//         });
//         setloading(false);
//         setbool(false);
//       })
//       .catch((error) => {
//         setloading(false);
//         if (error.response.data === "Seller Mismatch") {
//           setbool(true);
//           console.log(error.response.data);
//         } else {
//           toast.error(error.response.data, {
//             position: toast.POSITION.BOTTOM_LEFT,
//           });
//         }
//       });
//   };
//   const minusButton = () => {
//     if (quantity <= productDetails.minOrder) {
//       setMinusButton(false);
//       setPlusButton(false);
//     } else {
//       SetQuantity(quantity - 1);
//       setPlusButton(false);
//     }
//   };

//   const plusButton = () => {
//     if (quantity >= productDetails.stock) {
//       setPlusButton(true);
//       setMinusButton(false);
//     } else {
//       setMinusButton(false);
//       SetQuantity(quantity + 1);
//     }
//   };

//   const getReviews = () => {
//     reviewService
//       .ReviewGet(product.id)
//       .then((data) => {
//         setreviews(data.reviews);
//         setoverallRating(data.rating);
//         settotalRating(data.total);
//       })
//       .catch((err) => {
//         console.log(err.response);
//       });
//   };
//   useEffect(getReviews, []);

//   const sellerMismatch = () => {
//     cartService
//       .clearCart()
//       .then((data) => {
//         addToCart(type);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const stockCheck = () => {
//     if (stock > quantity) {
//       setAoCBool(false);
//     } else setAoCBool(true);
//   };
//   useEffect(stockCheck, []);

//   return (
//     <>
//       <LoadingScreen bool={loading} />
//       <SellerMismatch
//         bool={bool}
//         setbool={setbool}
//         sellerMismatch={sellerMismatch}
//       />

//       {productDetails ? (
//         <Box sx={{}}>
//           <ScheduleOrder
//             product={product.id}
//             bool={schedulebool}
//             setbool={setschedulebool}
//             minOrder={productDetails.minOrder}
//           />

//           <FlexBox sx={{ alignItems: "center" }}>
//             <Box sx={{ width: "30%" }}>
//               <Card sx={{}}>
//                 <Box
//                   sx={{
//                     display: "flex ",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       cursor: "poinnter",
//                       width: "400px",
//                       height: "300px",
//                     }}
//                   >
//                     <img
//                       className={classes.image}
//                       width="100%"
//                       height="100%"
//                       src={productDetails.images[imageIndex].link}
//                       alt="main Image"
//                     />
//                   </Box>
//                 </Box>
//               </Card>
//               <Box m={1}>
//                 <Card sx={{}}>
//                   <CardContent>
//                     {productDetails.images.map((images, index) => (
//                       <img
//                         className={classes.images}
//                         key={index}
//                         src={images.link}
//                         alt="images"
//                         onClick={(e) => {
//                           setImageIndex(index);
//                         }}
//                         loading="lazy"
//                       />
//                     ))}
//                   </CardContent>
//                 </Card>
//               </Box>
//             </Box>
//             <Box m={4} sx={{ width: "50%" }}>
//               <Card>
//                 <CardContent>
//                   <Box>
//                     <Box>
//                       <Typography className={classes.name}>
//                         {productDetails.name}
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItem: "center" }}>
//                         <Typography>
//                           <Rating
//                             value={overallRating}
//                             size="small"
//                             precision={0.25}
//                             readOnly
//                           />
//                         </Typography>
//                         <Typography>({totalRating})</Typography>
//                       </Box>
//                       <Box sx={{ display: "flex " }}>
//                         <Typography className={classes.headingText}>
//                           Brand
//                         </Typography>
//                         <Typography ml={1} className={classes.subText}>
//                           {productDetails.brand}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box
//                       sx={{
//                         display: "flex ",
//                         alignItems: "center",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Box>
//                         <Typography className={classes.name}>
//                           <Checkbox
//                             checked={favoriteChecked}
//                             onChange={favoriteHandleChange}
//                             icon={<FavoriteBorder />}
//                             checkedIcon={<Favorite />}
//                           />
//                         </Typography>
//                       </Box>
//                       <Box>
//                         <Tooltip title="schedule Item">
//                           <ScheduleIcon
//                             sx={{
//                               color: "#ba6a62",
//                             }}
//                             onClick={(e) => {
//                               if (buyerService.isLoggedIn()) {
//                                 setschedulebool(true);
//                               } else {
//                                 history.push("/login");
//                               }
//                             }}
//                           />
//                         </Tooltip>
//                       </Box>
//                     </Box>
//                   </Box>
//                   <Divider />
//                   <Box>
//                     <Typography
//                       m={1}
//                       sx={{
//                         fontSize: "30px",
//                         fontWeight: "bold",
//                         color: "#ba6a62",
//                       }}
//                     >
//                       PKR. {productDetails.price}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex ", alignItems: "center" }}>
//                     <IconButton
//                       disabled={minusButtonCheck}
//                       onClick={minusButton}
//                     >
//                       <Remove />
//                     </IconButton>
//                     <Box sx={{ width: "20%" }}>
//                       <TextField
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => {
//                           SetQuantity(e.target.value);
//                         }}
//                       />
//                     </Box>
//                     <IconButton disabled={plusButtonCheck} onClick={plusButton}>
//                       <Add />
//                     </IconButton>
//                   </Box>
//                   <Box sx={{ display: "flex" }}>
//                     <Box m={1}>
//                       <Button
//                         variant="contained"
//                         onClick={(e) => {
//                           settype("DEFAULT");
//                           addToCart("DEFAULT");
//                         }}
//                       >
//                         Add to cart
//                       </Button>
//                     </Box>

//                     {productDetails.sampleOrder ? (
//                       <Box m={1}>
//                         <Button
//                           variant="contained"
//                           onClick={(e) => {
//                             settype("SAMPLE");
//                             addToCart("SAMPLE");
//                           }}
//                         >
//                           Sample Order
//                         </Button>
//                       </Box>
//                     ) : (
//                       <></>
//                     )}
//                     <Box m={1}>
//                       <Button variant="contained" disabled={disable}>
//                         Bargain
//                       </Button>
//                     </Box>
//                     {/* <Box m={1}>
//                       <Button variant="contained" disabled={disable}>
//                         Custom Order
//                       </Button>
//                     </Box> */}
//                   </Box>
//                   <Box className={classes.description}>
//                     <Typography mt={2} mb={2}>
//                       {productDetails.description}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>

//             <Box sx={{ width: "20%" }}>
//               <Box>
//                 <Box mb={1}>
//                   <Card>
//                     <CardContent>
//                       <Typography className={classes.cardHeadingText}>
//                         Shop Name
//                       </Typography>
//                       <Typography className={classes.cardSubText}>
//                         {productDetails.seller.storeName}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Box>
//                 <Box mb={1}>
//                   <Card>
//                     <CardContent>
//                       <Typography className={classes.cardHeadingText}>
//                         Shop Address
//                       </Typography>
//                       <Typography className={classes.cardSubText}>
//                         {productDetails.seller.address}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Box>
//                 <Box mb={1}>
//                   <Card>
//                     <CardContent>
//                       <Typography className={classes.headingText}>
//                         Warranty Period
//                       </Typography>
//                       <Typography className={classes.subText}>
//                         {productDetails.warrantyPeriod} Days
//                       </Typography>

//                       <Typography className={classes.headingText}>
//                         Available Stock
//                       </Typography>
//                       <Typography className={classes.subText}>
//                         {stock > productDetails.minOrder ? (
//                           <Typography
//                             sx={{ fontWeight: "bold", color: "green" }}
//                           >
//                             In Stock
//                           </Typography>
//                         ) : (
//                           <Typography sx={{ fontWeight: "bold", color: "red" }}>
//                             Out of Stock
//                           </Typography>
//                         )}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Box>
//                 <Box mb={1}>
//                   <Card>
//                     <CardContent>
//                       <Typography className={classes.cardHeadingText}>
//                         Phone No
//                       </Typography>
//                       <Typography className={classes.cardSubText}>
//                         {productDetails.seller.phone}
//                       </Typography>
//                       <Typography className={classes.cardHeadingText}>
//                         Email
//                       </Typography>
//                       <Typography className={classes.cardSubText}>
//                         {productDetails.seller.email}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Box>
//               </Box>
//             </Box>
//           </FlexBox>
//           <Box>
//             <Box>
//               {reviews ? (
//                 <>
//                   <NameBar name={"Reviews"} />
//                   <Box sx={{ marginLeft: "7%" }}>
//                     {reviews.map((review) => (
//                       <CommentsDisplay review={review} key={review._id} />
//                     ))}
//                   </Box>
//                 </>
//               ) : (
//                 <></>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }
