import styled from "styled-components";
import InputComponent from "./InputComponent";

const Container = styled.div`
  height: 40vh;
  background-color: ${({ theme }) => theme.newsletter};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 300;
  text-align: center;
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get updates about your favorite products</Description>
      <InputComponent />
    </Container>
  );
}

export default Newsletter;
