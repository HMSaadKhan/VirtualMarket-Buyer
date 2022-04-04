import * as React from "react";
import Categories from "../Categories/Categories";
import Products from "../Product/Products";
import styled from "styled-components";

const Container = styled.div``;
const HomePage = () => {
  return (
    <Container>
      <Categories />
      <Products />
      <Products />
      <Products />
      <Products />
      <Products />
      <Products />
      <Products />
      <Products />
    </Container>
  );
};

export default HomePage;
