import { flexbox } from "@material-ui/system";
import { Add, Remove } from "@mui/icons-material";
import { Card, Breadcrumbs, Typography, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import productService from "../../Services/ProductServices";
import { ArrowForwardIos, Home, NavigateNext } from "@mui/icons-material";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = (props) => {
  const [productDetails, SetProductDetails] = useState("");
  const _id = props.match.params.id;
  console.log(_id);
  const getDetails = () => {
    productService
      .getProductDetails(_id)
      .then((data) => {
        SetProductDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getDetails, []);
  console.log(productDetails.images);
  return (
    <div>
      {productDetails ? (
        <div className="DetailPage">
          <div className="navigationBar">
            <nav className="navigation">
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
            </nav>
          </div>
          <div className="mainContainer">
            <>
              <div className="productPreview">
                <img
                  src={productDetails.images[0].link}
                  alt="Product Preview"
                ></img>
                <div className="subimages">
                  {productDetails.images.map((images, index) => {
                    return (
                      <div key={images} className="image">
                        {console.log()}
                        <img src={images.link} alt="images" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
            <>
              <div className="productData">
                <h1 className="productTitle">Samsung S21 Ultra</h1>
                <p className="productPrice">Rs 195,000</p>
                <p className="productPrice">Product Description</p>
                <ul>
                  <li>6.80-inch (1440x3220)</li>
                  <li>Processor Samsung Exynos 2100</li>
                  <li>Front Camera 40MP</li>
                  <li>6 Rear Camera 108MP + 12MP + 10MP + 10MP</li>
                  <li>RAM 12GB Storage 128GB</li>
                  <li>Battery Capacity 5000mAh OS Android 11</li>
                </ul>
                {/* <p className="productDescription">
              <p className="productDescription">
                Battery Capacity 5000mAh OS Android 11
              </p>
            </p> */}

                <p className="sectionHeading">Select Quantity</p>

                <div>
                  <TextField
                    id="outlined-number"
                    label="Quantity"
                    type="number"
                    required
                    // value={1}
                    placeholder="e.g. 1"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />

                  <p className="productPrice">Warranty Period</p>
                  <p className="productDescription">
                    1 year manufacturer warranty for device
                  </p>

                  <p className="productPrice">Stock Available</p>
                  <p className="productDescription">20 Items</p>

                  <h3 className="sectionHeading"></h3>
                  <div>
                    <button className="featureItem">Add To Cart</button>
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
                      AM Traders
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
                      Shop.no.24 Shah Alam Market Lahore
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
                      03024576453
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
