import React, { useEffect, useState, useParams } from "react";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import productService from "../../Services/ProductServices";

import ProductComponent from "../../Pages/Product/ProductComponent";

const ProductsByCategory = (props) => {
  const id = props.match.params.id;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getByCategory(id).then((data) => {
      setProducts(data);
    });
  }, [id]);

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

export default ProductsByCategory;
