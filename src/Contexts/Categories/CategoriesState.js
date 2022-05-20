import React, { useState, useEffect, createContext } from "react";
import categoryService from "../../Services/CategoryService";
export const CategoriesContext = createContext({});

const CategoriesState = (props) => {
  const [categories, setCategories] = useState([]);
  // const [categories, setCategories] = useState(true);

  const getCategory = () => {
    categoryService
      .GetCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getCategory, []);
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <CategoriesContext.Provider value={categories}>
      {props.children}
    </CategoriesContext.Provider>
  );
};
export default CategoriesState;
