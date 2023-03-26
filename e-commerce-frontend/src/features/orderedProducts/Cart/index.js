import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopComponent from "./TopComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  width: 100%;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 36px;
  text-align: center;
`;

function Cart() {
  return (
    <Container>
      <Title>Your cart</Title>
      <TopComponent />
      <Outlet />
    </Container>
  );
}

export default Cart;
