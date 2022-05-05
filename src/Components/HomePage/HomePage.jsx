import React, { useState, useEffect } from "react";
import Categories from "../Categories/Categories";
import Products from "../Product/Products";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
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
        console.log(error);
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
