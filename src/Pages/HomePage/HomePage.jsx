import React, { useState, useEffect } from "react";
import Products from "../../Pages/Product/Products";
import { makeStyles } from "@mui/styles";
import categoryService from "../../Services/CategoryService";
import LandingComponent from "../../Components/LandingComponent/LandingComponent";
import ChatBox from "../../Components/Message/Chatbox";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "50px" },
}));
const HomePage = (props) => {
  const [chatbool, setchatbool] = React.useState(false);
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
      <Box>
        <ChatBox bool={chatbool} setbool={setchatbool} />
      </Box>

      <LandingComponent />
      {categories.map((product) => (
        <Products _id={product._id} name={product.name} key={product._id} />
      ))}
    </div>
  );
};

export default HomePage;
