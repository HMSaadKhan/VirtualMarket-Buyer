import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { category } from "../../data";

const Container = styled.div`
  display: flex;
  flex: 33%;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = ({ item }) => {
  return (
    <Container>
      {category.map((item) => (
        <CategoryItem item={item} />
      ))}
    </Container>
  );
};

export default Categories;
