import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../../tempData";

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ side }) => side === "left" && "10px"};
  right: ${({ side }) => side === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  transform: translateX(${({ currentSlide }) => currentSlide * -100}vw);
  transition: all 1s;
`;

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
  padding: 30px;
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

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 0 grey;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    box-shadow: none;
    transform: translate(1px, 1px);
  }
`;

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Container>
      <Arrow
        side="left"
        onClick={() =>
          setCurrentSlide((prev) =>
            prev < 1 ? sliderItems.length - 1 : prev - 1
          )
        }
      >
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper currentSlide={currentSlide}>
        {sliderItems.map((i) => (
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
        ))}
      </Wrapper>
      <Arrow
        side="right"
        onClick={() =>
          setCurrentSlide((prev) =>
            prev > sliderItems.length - 2 ? 0 : prev + 1
          )
        }
      >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
}

export default Slider;
