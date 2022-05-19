import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import favoriteService from "../../Services/FavoritesService";
import ProductComponent from "../../Pages/Product/ProductComponent";
import Auth from "../../AuthWrapper/Auth";
import { NameBar } from "../../Styles/NameBar";
const ProductsByCategory = (props) => {
  const [products, setProducts] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    favoriteService
      .GetFavorites()
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  }, []);

  return (
    <Auth>
      <Box>
        <NameBar name={"Favourties"} />
        {products ? (
          <>
            <Grid container justifyContent="center" spacing={2}>
              {products.map((product, index) => (
                <ProductComponent key={index} product={product} />
              ))}
            </Grid>
          </>
        ) : (
          <>{message ? <Typography>{message}</Typography> : <></>}</>
        )}
      </Box>
    </Auth>
  );
};

export default ProductsByCategory;
