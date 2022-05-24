import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import productService from "../../Services/ProductServices";
import ProductComponent from "../../Pages/Product/ProductComponent";
import { NameBar } from "../../Styles/NameBar";
import { CategoriesContext } from "../../Contexts/Categories/CategoriesState";
import LoadingScreen from "../../Components/LoadingScreen";
import { MidPager } from "../../Styles/MidPager";

const ProductsByCategory = (props) => {
  const id = props.match.params.id;
  const [products, setProducts] = useState([]);
  const categories = useContext(CategoriesContext);
  const [loading, setloading] = useState(false);

  const [category, setCategory] = useState(
    categories.filter((item) => item._id === id)
  );

  useEffect(() => {
    setloading(true);
    productService.getByCategory(id).then((data) => {
      setProducts(data);
      setloading(false);
    });
  }, [id]);
  useEffect(() => {
    setCategory(categories.filter((item) => item._id === id));
  }, [id]);

  return (
    <div>
      <LoadingScreen bool={loading} />

      {console.log(category)}
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
    </div>
  );
};

export default ProductsByCategory;
