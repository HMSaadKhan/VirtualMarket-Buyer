import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { category } from "../../data";

const Container = styled.div`
`;
const Text = styled.div`
 font-size: 30px;
 padding-left: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
const Categories = ({ item }) => {
  return (
    <Container>
     <Text>Categories</Text>
      <Wrapper>
        {category.map((item) => (
          <CategoryItem item={item} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Categories;
