import styled from "styled-components";
import { MidPager } from "../../Styles/MidPager";

const Container = styled.div``;
const NotFound = () => {
  return (
    <Container>
      <MidPager name={"Page Not Found"} />
    </Container>
  );
};

export default NotFound;
