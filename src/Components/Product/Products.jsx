import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import productService from "../../Services/ProductServices";
import Product from "./Product";
import ProductTest from "./ProductTest";
import { Typography } from "@material-ui/core";

const Products = (props) => {
  console.log(props);
  const { _id, name } = props;

  const [products, setProducts] = useState([]);

  // const getProducts = () => {
  //   productService
  //     .getProducts()
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  // useEffect(getProducts, []);
  const getProductsbyCategory = async (_id) => {
    await productService
      .getFiveByCategory(props._id)
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(getProductsbyCategory, []);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Typography sx={{ textAlign: "center", m: 1, fontSize: 50 }}>
            {name}
          </Typography>

          <Grid container justifyContent="center" spacing={3}>
            {products.map((product, index) => (
              <ProductTest key={index} product={product} />
            ))}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Products;
