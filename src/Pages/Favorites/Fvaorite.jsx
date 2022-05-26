import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import favoriteService from "../../Services/FavoritesService";
import ProductComponent from "../../Pages/Product/ProductComponent";
import Auth from "../../AuthWrapper/IsLoginFalse";
import { NameBar } from "../../Styles/NameBar";
import { MidPager } from "../../Styles/MidPager";
import LoadingScreen from "../../Components/LoadingScreen";

const ProductsByCategory = (props) => {
  const [products, setProducts] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    favoriteService
      .GetFavorites()
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setMessage(error.response.data);
      });
  }, []);

  return (
    <Auth>
      <LoadingScreen bool={loading} />

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
          <>{message ? <MidPager name={message} /> : <></>}</>
        )}
      </Box>
    </Auth>
  );
};

export default ProductsByCategory;
