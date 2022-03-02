import styled from "styled-components";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
//import React, { useState } from "react";
//import { useHistory } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// const Image = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #f8b500;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Info>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default CategoryItem;
