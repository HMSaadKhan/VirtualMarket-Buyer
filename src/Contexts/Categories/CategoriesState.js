/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, createContext } from "react";
import LoadingScreen from "../../Components/LoadingScreen";
import categoryService from "../../Services/CategoryService";
export const CategoriesContext = createContext({});

const CategoriesState = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);
  // const [categories, setCategories] = useState(true);

  const getCategory = () => {
    setloading(true);
    categoryService
      .GetCategories()
      .then((data) => {
        setCategories(data);

        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };
  useEffect(getCategory, []);
  return (
    <>
      <LoadingScreen bool={loading} />
      <CategoriesContext.Provider value={categories}>
        {props.children}
      </CategoriesContext.Provider>
    </>
  );
};
export default CategoriesState;
