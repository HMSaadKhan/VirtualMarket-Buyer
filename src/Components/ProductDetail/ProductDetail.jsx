import { flexbox } from "@material-ui/system";
import { Add, Remove } from "@mui/icons-material";
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import productService from "../../Services/ProductServices";
import { ArrowForwardIos, Home } from "@mui/icons-material";
import { TextField } from "@material-ui/core";
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
        <div>
          <div className="DetailPage">
            <div className="navigationBar">
              <nav className="navigation">
                <label className="labelIcon">
                  <Home />
                  Home
                </label>

                <label className="arrowIcon">
                  <ArrowForwardIos />
                </label>

                <label className="labelIcon">
                  <a className="title" href="#">
                    {productDetails.name}
                  </a>
                </label>
              </nav>
            </div>
            <div className="mainContainer">
              <div className="productPreview">
                <img
                  src={productDetails.images[0].link}
                  alt="Product Preview"
                />
                {productDetails.images.map((image, index) => {
                  return (
                    <div key={image}>
                      <img src={image} alt="" className="sellerUpdateImg" />
                    </div>
                  );
                })}
              </div>
              <div className="productData">
                <h1 className="productTitle">Samsung S21 Ultra</h1>
                <p className="productPrice">Rs {productDetails.price}</p>
                <p className="productDescription">
                  {productDetails.description}
                  <p className="productDescription">
                    Processor Samsung Exynos 2100
                  </p>
                  <p className="productDescription">Front Camera 40MP</p>
                  <p className="productDescription">
                    Rear Camera 108MP + 12MP + 10MP + 10MP
                  </p>
                  <p className="productDescription">
                    RAM 12GB Storage 128GB
                    <p className="productDescription">
                      Battery Capacity 5000mAh OS Android 11
                    </p>
                  </p>
                </p>

                <h3 className="sectionHeading">Select Quantity</h3>
                <div>
                  <TextField
                    id="outlined-number"
                    label="Quantity"
                    type="number"
                    required
                    min={productDetails.minOrder}
                    placeholder="e.g. 1"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />

                  <h3 className="sectionHeading"></h3>
                  <div>
                    <button className="featureItem">Add To Cart</button>
                    <button className="featureItem2">Bargain</button>

                    {productDetails.sampleOrder ? (
                      <>
                        <button className="featureItem2">Sample Order</button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="sellerInfo">
                  <p>Sold By:</p>
                  <h3>{productDetails.seller.storeName}</h3>
                </div>
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
