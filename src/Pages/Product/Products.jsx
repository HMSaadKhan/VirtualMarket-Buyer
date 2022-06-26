import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import productService from "../../Services/ProductServices";
import { NameBar } from "../../Styles/NameBar";
import ProductComponent from "./ProductComponent";

const Products = (props) => {
  const { name } = props;

  const [products, setProducts] = useState([]);

  const getProductsbyCategory = (_id) => {
    productService
      .getFiveByCategory(props._id)
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(getProductsbyCategory, [props._id]);

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
