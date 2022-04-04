import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import productService from "../../Services/ProductServices";
import Product from "./Product";
import ProductTest from "./ProductTest";

const Wrapper = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div``;
const Text = styled.div`
  font-size: 30px;
  padding-left: 20px;
`;
const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    productService
      .getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(getProducts, []);
  const electronics = products.filter((electronics) => {
    return electronics.price >= 1000;
  });
  return (
    <Container>
      <Text> Products for You</Text>
      <Wrapper>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <ProductTest key={index} product={product} />
          ))}
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Products;
