import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from ".";

const Slide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100vw;
  min-width: 320px;
  background-color: ${({ i, theme }) => theme.slider[i]};

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
  height: 80vh;
  max-width: 100%;
  object-fit: cover;
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

function SlideComponent({ p, i }) {
  return (
    <Slide i={i}>
      <ImgContainer>
        <Image
          src={`/data/uploads/products/${p.id}.webp`}
          alt={`product image ${p.id}`}
        />
      </ImgContainer>
      <InfoContainer>
        <Title>{p.title}</Title>
        <Description>{p.description}</Description>
        <Link to={`/products/${p.id}`}>
          <Button>Show now</Button>
        </Link>
      </InfoContainer>
    </Slide>
  );
}

export default SlideComponent;
