import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";
import productService from "../../Services/ProductServices";

import ProductComponent from "../../Pages/Product/ProductComponent";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";

const ProductsBySearch = (props) => {
  console.log(props);

  const key = props.match.params.id;
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    productService.getBySearch(key).then((data) => {
      setProducts(data);
      setloading(false);
    });
  }, [key]);

  return (
    <div>
      <LoadingScreen bool={loading} />

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
          <Typography></Typography>
        </>
      )}
    </div>
  );
};

export default ProductsBySearch;
