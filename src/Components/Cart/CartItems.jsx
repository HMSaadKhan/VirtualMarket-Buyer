import { Add, Remove, Delete } from "@mui/icons-material";
import styled from "styled-components";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  padding: 0px 30px;
`;

const Image = styled.img`
  padding: 40px 0px;
  width: 50px;
  height: 50px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.span`
  font-size: 24px;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: "bold";
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 0px 20px;
`;
const DeleteStyle = styled.span`
  padding: 50px;
`;

const Cart = ({ item }) => {
  return (
    <>
      <Product>
        <ProductDetail>
          <Image src={item.img} />
          <Details>
            <ProductName>
              <b>Product:</b> {item.title}
            </ProductName>
            <ProductId>
              <b>ID:</b> {item.id}
            </ProductId>
            <ProductPrice>
              <b>Price : </b>
              {item.price}
            </ProductPrice>
          </Details>
        </ProductDetail>
        <PriceDetail>
          <ProductAmountContainer>
            <Remove />
            <ProductAmount>2</ProductAmount>
            <Add />
          </ProductAmountContainer>
        </PriceDetail>
        <DeleteStyle>
          <Delete />
        </DeleteStyle>
      </Product>
      <Hr />
    </>
  );
};

export default Cart;
