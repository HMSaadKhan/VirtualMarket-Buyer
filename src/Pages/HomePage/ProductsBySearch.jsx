import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";
import productService from "../../Services/ProductServices";

import ProductComponent from "../../Pages/Product/ProductComponent";
import { NameBar } from "../../Styles/NameBar";

const ProductsBySearch = (props) => {
  console.log(props);
  const key = props.match.params.id;
  console.log(props.match.params.id);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getBySearch(key).then((data) => {
      setProducts(data);
      console.log(data);
    });
  }, [key]);

  return (
    <div>
      <NameBar name={key} />
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
