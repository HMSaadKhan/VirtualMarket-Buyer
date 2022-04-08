import { flexbox } from "@material-ui/system";
import { Add, Remove } from "@mui/icons-material";
import {
  Card,
  Breadcrumbs,
  Typography,
  CardContent,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import styled from "styled-components";
import productService from "../../Services/ProductServices";
import cartService from "../../Services/CartServices";
import { ArrowForwardIos, Home, NavigateNext } from "@mui/icons-material";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useState from "react-usestateref";
import { useParams } from "react-router-dom";
import CommentsDisplay from "../Comments/CommentsDisplay";
const ProductDetail = (props) => {
  console.log(props);
  const product = useParams();
  console.log(product.id);
  const [productDetails, SetProductDetails, productDetailsRef] = useState("");
  const [quantity, SetQuantity, quantityRef] = useState();
  const [minusButtonCheck, setMinusButton, minRef] = useState(true);
  const [plusButtonCheck, setPlusButton, plusRef] = useState(false);
  const [imageIndex, setImageIndex, imageIndexRef] = useState(0);

  const [type, setType] = useState("DEFAULT");

  const getDetails = () => {
    productService
      .getProductDetails(product.id)
      .then((data) => {
        console.log(data);
        SetProductDetails(data);
        SetQuantity(data.minOrder);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getDetails, []);

  const addToCart = () => {
    cartService
      .addToCart({ product: product.id, quantity, type })
      .then((data) => {
        console.log(data);
        props.stateChanged(data);

        // toast.error(data.response.data, {
        //   position: toast.POSITION.BOTTOM_LEFT,
        // });
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data, {
        //   position: toast.POSITION.BOTTOM_LEFT,
        // });
      });
  };
  const minusButton = () => {
    if (quantity <= productDetails.minOrder) {
      setMinusButton(false);
      setPlusButton(false);
      console.log(`minusif${quantity}`);
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

  return (
    <div>
      {productDetails ? (
        <div className="DetailPage">
          <div className="mainContainer">
            <div className="productPreview">
              <div className="mainImage">
                <img
                  className="mainImage"
                  src={productDetails.images[imageIndex].link}
                  alt="Product Preview"
                />
              </div>
              <div className="subimages">
                {productDetails.images.map((images, index) => (
                  <img
                    className="images"
                    key={index}
                    src={images.link}
                    alt="images"
                    onClick={(e) => {
                      setImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>

            <>
              <div className="productData">
                <h1 className="productTitle">{productDetails.name}</h1>
                <p className="productPrice">Rs {productDetails.price}</p>
                <p className="productPrice">{productDetails.description}</p>

                <p className="sectionHeading">Select Quantity</p>

                <div>
                  <div className="quantityInput">
                    <IconButton disabled={minusButtonCheck}>
                      <Remove onClick={minusButton} />
                    </IconButton>
                    <input value={quantity} />
                    <IconButton disabled={plusButtonCheck}>
                      <Add className="btn-quantity" onClick={plusButton} />
                    </IconButton>
                  </div>

                  <p className="productPrice">Warranty Period</p>
                  <p className="productDescription">
                    {productDetails.warrantyPeriod} Days
                  </p>

                  <p className="productPrice">Stock Available</p>
                  <p className="productDescription">
                    {productDetails.stock} Items
                  </p>

                  <h3 className="sectionHeading"></h3>
                  <div>
                    <button className="featureItem" onClick={addToCart}>
                      Add To Cart
                    </button>
                    <button className="featureItem2">Bargain</button>
                    <button className="featureItem2">Custom Order </button>
                  </div>
                </div>
              </div>
            </>
            <div className="sellerDetails">
              <div className="card1">
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Shop Name
                    </Typography>
                    <Typography variant="h8" component="div">
                      {productDetails.seller.storeName}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className="card1">
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Shop Address
                    </Typography>
                    <Typography variant="h8" component="div">
                      {productDetails.seller.address}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className="card1">
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Phone No
                    </Typography>
                    <Typography variant="h8" component="div">
                      {productDetails.seller.phone}
                    </Typography>
                    <Typography
                      mt={1}
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Email
                    </Typography>
                    <Typography variant="h8" component="div">
                      {productDetails.seller.email}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <CommentsDisplay />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProductDetail;
