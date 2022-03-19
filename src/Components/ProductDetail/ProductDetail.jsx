import { flexbox } from "@material-ui/system";
import { Add, Remove } from "@mui/icons-material";
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import productService from "../../Services/ProductServices";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const useStyles = makeStyles({
  root: {
    display: "flex",
    maxWidth: 500,
    margin: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
  imageBox: {
    width: 500,
    height: 500,
  },
});
const ProductDetail = (props) => {
  const classes = useStyles();
  const [productDetails, SetProductDetails] = useState("");
  const _id = props.match.params.id;
  console.log(_id);
  const getDetails = () => {
    productService
      .getProductDetails(_id)
      .then((data) => {
        SetProductDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getDetails, []);
  console.log(productDetails);
  return (
    <Container>
      <Wrapper className={classes.root}>
        {productDetails ? (
          <>
            <Card>
              <Image
                className={classes.imageBox}
                src={productDetails.images[0].link}
              />
            </Card>
          </>
        ) : (
          <></>
        )}
        <InfoContainer>
          <Title></Title>
          <Desc>{productDetails.description}</Desc>
          <Price>${productDetails.price}</Price>
          <FilterContainer></FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductDetail;
