import styled from "styled-components";

const Container = styled.div``;
const Text = styled.div`
  font-size: 30px;
  text-align: center;
`;

const NotFound = () => {
  return (
    <Container>
      <Text>Page Not Found</Text>
    </Container>
  );
};

export default NotFound;