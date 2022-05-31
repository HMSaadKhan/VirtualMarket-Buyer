import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import productService from "../../Services/ProductServices";
import { NameBar } from "../../Styles/NameBar";
import ProductComponent from "./ProductComponent";
import LoadingScreen from "../../Components/LoadingScreen";

const Products = (props) => {
  const { name } = props;

  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  const getProductsbyCategory = (_id) => {
    setloading(true);
    productService
      .getFiveByCategory(props._id)
      .then((data) => {
        setProducts(data);
        setloading(false);
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
      });
  };
  useEffect(getProductsbyCategory, [props._id]);

  return (
    <div>
      <LoadingScreen bool={loading} />

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
