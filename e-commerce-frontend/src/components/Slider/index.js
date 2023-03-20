import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../../tempData";
import SlideComponent from "./SlideComponent";

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

export const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  border: none;
  box-shadow: 2px 2px 5px 0 grey;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    box-shadow: none;
    transform: translate(1px, 1px);
  }
`;

const SeeAllButton = styled(Button)`
  background-color: red;
  color: white;
  position: absolute;
  top: 5px;
  right: 10px;
  box-shadow: 4px 4px 5px 0 black;
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
          <SlideComponent bg={i.bg} key={i.id} i={i} />
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
      <SeeAllButton>All products</SeeAllButton>
    </Container>
  );
}

export default Slider;
