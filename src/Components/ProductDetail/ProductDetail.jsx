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
import { useEffect, useState } from "react";
import styled from "styled-components";
import productService from "../../Services/ProductServices";
import cartService from "../../Services/CartServices";
import { ArrowForwardIos, Home, NavigateNext } from "@mui/icons-material";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = (props) => {
  const product = props.match.params.id;
  console.log(product);
  const [productDetails, SetProductDetails] = useState("");
  const [quantity, SetQuantity] = useState();
  const [minButton, setminButton] = useState(true);
  const [type, setType] = useState("DEFAULT");

  const getDetails = () => {
    productService
      .getProductDetails(product)
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
      .addToCart({ product, quantity, type })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const minusButton = () => {
    SetQuantity(quantity - 1);
    // if (quantity <= productDetails.minOrder) minButton = true;
  };
  const plusButton = () => {
    SetQuantity(quantity + 1);
    // if (minButton) {
    //   if (quantity > productDetails.minOrder) minButton = false;
    // }
  };

  return (
    <div>
      {productDetails ? (
        <div className="DetailPage">
          <div className="navigationBar">
            {/* <nav className="navigation">
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
                className="labelIcon"
              >
                <Link underline="hover" to="/">
                  Home
                </Link>
                <Typography color="text.primary">
                  {productDetails.name}
                </Typography>
              </Breadcrumbs>
            </nav> */}
          </div>
          <div className="mainContainer">
            <div className="productPreview">
              <>
                <img
                  className="mainImage"
                  src={productDetails.images[0].link}
                  alt="Product Preview"
                ></img>
              </>
              <div className="subimages">
                {productDetails.images.map((images, index) => (
                  <img
                    className="images"
                    key={index}
                    src={images.link}
                    alt="images"
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
                    <IconButton>
                      <Remove onClick={minusButton} />
                    </IconButton>
                    <input value={quantity} />
                    <IconButton>
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
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProductDetail;
