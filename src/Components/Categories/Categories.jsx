import styled from "styled-components";
//import CategoryItem from "./CategoryItem";
//import { category } from "../../data";

const Container = styled.div``;
const Text = styled.div`
  font-size: 30px;
  padding-left: 20px;
`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  height: 100%;
  justify-content: space-between;
`;

const Categories = ({ item }) => {
  return (
    <Container>
      <Text>Categories</Text>
      <Wrapper>
        {/* {category.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))} */}
      </Wrapper>
    </Container>
  );
};

export default Categories;
