import styled from "styled-components";
import CenterComponent from "./CenterComponent";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: 610px) {
    flex-direction: column;
  }
`;

export const Title = styled.h4``;

function Footer() {
  return (
    <Container>
      <LeftComponent />
      <CenterComponent />
      <RightComponent />
    </Container>
  );
}

export default Footer;
