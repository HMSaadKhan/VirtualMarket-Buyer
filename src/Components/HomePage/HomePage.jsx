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
    </Container>
  );
};

export default HomePage;
