import React, { useEffect, useState } from "react";

import { Grid, Typography, Box } from "@mui/material";
import productService from "../../Services/ProductServices";

import ProductComponent from "../../Pages/Product/ProductComponent";
import { NameBar } from "../../Styles/NameBar";
import LoadingScreen from "../../Components/LoadingScreen";
import { Containers } from "../../Styles/StyledBox";
import { MidPager } from "../../Styles/MidPager";
import { useParams } from "react-router-dom";

const ProductsBySearch = (props) => {
  const search = useParams();

  console.log(search);
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    productService.getBySearch(search.id).then((data) => {
      setProducts(data);
      setloading(false);
    });
  }, [search.id]);

  return (
    <Box sx={{ marginBottom: "50px" }}>
      <LoadingScreen bool={loading} />

      <NameBar name={"Results for " + search.id} />
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
          <MidPager name={"No Items Found"} />
        </>
      )}
    </Box>
  );
};

export default ProductsBySearch;
