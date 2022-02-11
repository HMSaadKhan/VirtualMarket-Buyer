import styled from "styled-components";
import { popularProducts } from "../../data";
import Product from "./Product";

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
  return (
    <Container>
      <Text> Products for You</Text>
      <Wrapper>
        {popularProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Products;
