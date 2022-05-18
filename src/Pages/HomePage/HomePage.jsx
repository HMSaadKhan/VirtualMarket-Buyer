import React, { useState, useEffect } from "react";
import Products from "../../Pages/Product/Products";
import { makeStyles } from "@mui/styles";
import categoryService from "../../Services/CategoryService";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fafafa",
  },
}));
const HomePage = () => {
  const [categories, setCategories] = useState([]);

  const getCategory = () => {
    categoryService
      .GetCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(getCategory, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories.map((product) => (
        <Products _id={product._id} name={product.name} key={product._id} />
      ))}
    </div>
  );
};

export default HomePage;
