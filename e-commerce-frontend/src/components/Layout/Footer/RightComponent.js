import { Mail, Phone, Room } from "@mui/icons-material";
import styled from "styled-components";
import { Title } from ".";

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

const ContactItem = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Payment = styled.img`
  max-height: 30px;
  max-width: 50%;

  @media only screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

function RightComponent() {
  return (
    <Right>
      <ContactData>
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
      </ContactData>
      <Payment alt="payment methods" src="/public/data/defaults/cards.svg" />
    </Right>
  );
}

export default RightComponent;
