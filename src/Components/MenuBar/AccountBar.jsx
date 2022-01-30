import * as React from "react";
import styled from "styled-components";
import { AccountCircle, Notifications } from "@mui/icons-material";

const Container = styled.div`
  height: 30px;
  background-color: grey;
`;
const Wrapper = styled.div`
  padding: 4px 7px;
  display: flex;
  align-item: right;
  margin-right: 60px;
`;
const Right = styled.div`
  display: flex;
  margin-left: auto;
`;
const RightIn = styled.div`
  margin-left: 10px;
`;

const AccountBar = () => {
  return (
    <Container>
      <Wrapper>
        <Right>
          <RightIn>
            <Notifications />
          </RightIn>
          <RightIn>
            <AccountCircle />
          </RightIn>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default AccountBar;
