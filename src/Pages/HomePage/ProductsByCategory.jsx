import React, { useEffect, useState, useContext } from "react";
import { Grid, Box } from "@mui/material";
import productService from "../../Services/ProductServices";
import ProductComponent from "../../Pages/Product/ProductComponent";
import { NameBar } from "../../Styles/NameBar";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";
import { useParams } from "react-router-dom";

const ProductsByCategory = (props) => {
  const categoryName = useParams();

  const [products, setProducts] = useState([]);
  const categories = useContext(CategoriesContext);
  const [loading, setloading] = useState(false);

  const [category, setCategory] = useState(
    categories.filter((item) => item._id === categoryName.id)
  );

  useEffect(() => {
    setloading(true);
    productService.getByCategory(categoryName.id).then((data) => {
      setProducts(data);
      setloading(false);
    });
  }, [categoryName.id]);
  useEffect(() => {
    setCategory(categories.filter((item) => item._id === categoryName.id));
  }, [categoryName.id]);

  return (
    <Box sx={{ marginBottom: "50px" }}>
      <LoadingScreen bool={loading} />

      {category.length > 0 ? <NameBar name={category[0].name} /> : <></>}

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
          <MidPager name={"No Product Found"} />
        </>
      )}
    </Box>
  );
};

export default ProductsByCategory;
