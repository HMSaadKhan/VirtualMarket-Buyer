import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
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
        <Box>
          <Typography>No Item</Typography>
        </Box>
      )}
    </div>
  );
};

export default ProductsByCategory;
