import styled from "styled-components";
import { Button } from ".";

const Slide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100vw;
  min-width: 320px;
  background-color: ${({ bg }) => bg};

  @media only screen and (max-width: 560px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-height: 80vh;
  max-width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 40px 30px;
`;

const Title = styled.h2`
  font-size: 60px;
`;

const Description = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

function SlideComponent({ i }) {
  return (
    <Slide bg={i.bg} key={i.id}>
      <ImgContainer>
        <Image src={i.img} alt={`product image ${i.id}`} />
      </ImgContainer>
      <InfoContainer>
        <Title>{i.title}</Title>
        <Description>{i.desc}</Description>
        <Button>Show now</Button>
      </InfoContainer>
    </Slide>
  );
}

export default SlideComponent;
