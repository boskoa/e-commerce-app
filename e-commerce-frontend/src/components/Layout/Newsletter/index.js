import { Send } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  height: 40vh;
  background-color: ${({ theme }) => theme.newsletter};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 300;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 40px;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid lightgrey;
`;

const Input = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  font-size: 100%;
  padding-left: 5px;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  margin: 0 5px;
  transition: all 0.3s;
  color: ${({ theme }) => theme.color};

  &:active {
    transform: scale(0.9);
  }
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get updates about your favorite products</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
