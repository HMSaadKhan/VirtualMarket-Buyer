import React, { useEffect, useState, useParams } from "react";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import productService from "../../Services/ProductServices";

import ProductComponent from "../Product/ProductComponent";

const ProductsBySearch = (props) => {
  const key = props.match.params.id;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getBySearch(key).then((data) => {
      setProducts(data);
      console.log(data);
    });
  }, [key]);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Grid container justifyContent="center" spacing={2}>
            {products.map((product, index) => (
              <ProductComponent key={index} product={product} />
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography>No Item</Typography>
        </>
      )}
    </div>
  );
};

export default ProductsBySearch;
