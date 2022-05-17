import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import favoriteService from "../../Services/FavoritesService";
import ProductComponent from "../../Pages/Product/ProductComponent";
import Auth from "../../AuthWrapper/Auth";

const ProductsByCategory = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    favoriteService.GetFavorites().then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <Auth>
      <Box>
        <Box sx={{ backgroundColor: "#ba6a62", color: "white" }}>
          <Typography
            sx={{
              marginLeft: "20%",
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Favorites
          </Typography>
        </Box>
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
      </Box>
    </Auth>
  );
};

export default ProductsByCategory;
