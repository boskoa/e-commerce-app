import styled from "styled-components";
import { Title } from ".";

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  min-width: 250px;
`;

const Links = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 100px;
`;

const LinkItem = styled.p`
  font-size: 14px;
`;

function CenterComponent() {
  return (
    <Center>
      <Title>Useful links</Title>
      <Links>
        <LinkItem>Home</LinkItem>
        <LinkItem>Cart</LinkItem>
        <LinkItem>Men fashion</LinkItem>
        <LinkItem>Women fashion</LinkItem>
        <LinkItem>Accessories</LinkItem>
        <LinkItem>My account</LinkItem>
        <LinkItem>Order tracking</LinkItem>
        <LinkItem>Wishlist</LinkItem>
        <LinkItem>Terms</LinkItem>
      </Links>
    </Center>
  );
}

export default CenterComponent;
