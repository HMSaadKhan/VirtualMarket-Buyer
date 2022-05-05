import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Grid, Box } from "@mui/material";
import productService from "../../Services/ProductServices";

import ProductComponent from "./ProductComponent";

const Products = (props) => {
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
              {name}
            </Typography>
          </Box>
          <Grid container justifyContent="center" spacing={2}>
            {products.map((product, index) => (
              <ProductComponent key={index} product={product} />
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
