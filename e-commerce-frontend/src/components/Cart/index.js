import styled from "styled-components";
import BottomComponent from "./BottomComponent";
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
      <BottomComponent />
    </Container>
  );
}

export default Cart;
