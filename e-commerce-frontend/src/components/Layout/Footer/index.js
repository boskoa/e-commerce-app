import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 610px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  @media (max-width: 610px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  min-width: 250px;
`;

const Right = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h4``;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  font-size: 14px;
  width: 50%;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const Desc = styled.p`
  font-size: 12px;
  max-width: 150px;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ContactItem = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Payment = styled.img`
  height: 30px;
  width: 100%;
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>Rags!</Logo>
        <Desc>
          Hide your shame! Protect yourself from the elements!{" "}
          <b>We've got you covered!</b>
        </Desc>
        <Social>
          <SocialIcon color="#3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="#E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="#E60023">
            <Pinterest />
          </SocialIcon>
        </Social>
      </Left>
      <Center>
        <Title>Useful links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men fashion</ListItem>
          <ListItem>Women fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My account</ListItem>
          <ListItem>Order tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room />
          Some Street no. 5, Someville
        </ContactItem>
        <ContactItem>
          <Phone />
          +123 45 678 910
        </ContactItem>
        <ContactItem>
          <Mail />
          info@example.com
        </ContactItem>
        <Payment
          alt="payment methods"
          src="https://resources.cimaware.com/img/visa-mastercard-amex.svg"
        />
      </Right>
    </Container>
  );
}

export default Footer;
