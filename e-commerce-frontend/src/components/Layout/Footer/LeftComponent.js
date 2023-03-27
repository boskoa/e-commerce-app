import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
import styled from "styled-components";

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;

  @media only screen and (max-width: 610px) {
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
  }
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
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

function LeftComponent() {
  return (
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
  );
}

export default LeftComponent;
