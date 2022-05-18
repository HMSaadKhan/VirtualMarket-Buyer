import React, { useEffect, useState } from "react";

import { Typography, Grid, Box } from "@mui/material";
import productService from "../../Services/ProductServices";
import { NameBar } from "../../Styles/NameBar";
import ProductComponent from "./ProductComponent";

const Products = (props) => {
  const { _id, name } = props;

  const [products, setProducts] = useState([]);

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
          <NameBar name={name} />
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
