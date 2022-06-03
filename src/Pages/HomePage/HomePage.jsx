import React, { useState, useEffect } from "react";
import Products from "../../Pages/Product/Products";
import { makeStyles } from "@mui/styles";
import categoryService from "../../Services/CategoryService";
import LandingComponent from "../../Components/LandingComponent/LandingComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fafafa",
  },
}));
const HomePage = (props) => {
  console.log(props);

  const [categories, setCategories] = useState([]);

  const getCategory = () => {
    props.setUrl("/");
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
      <LandingComponent />
      {categories.map((product) => (
        <Products _id={product._id} name={product.name} key={product._id} />
      ))}
    </div>
  );
};

export default HomePage;
