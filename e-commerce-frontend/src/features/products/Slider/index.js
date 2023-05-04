import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../../components/Spinner";
import { selectLatestProducts, selectProductsLoading } from "../productsSlice";
import SlideComponent from "./SlideComponent";

const Container = styled.div`
  width: 100%;
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
  box-shadow: 2px 2px 4px 0 black;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    box-shadow: none;
    transform: translate(1px, 1px);
  }
`;

export const SeeAllButton = styled(Button)`
  background-color: red;
  color: white;
  position: absolute;
  top: 5px;
  right: 10px;
`;

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const latestProducts = useSelector(selectLatestProducts);
  const productsLoading = useSelector(selectProductsLoading);

  if (productsLoading) {
    return <Spinner />;
  }

  if (!latestProducts) {
    return <p style={{ margin: "10px auto" }}>There are no products.</p>;
  }

  return (
    <Container>
      <Arrow
        side="left"
        onClick={() =>
          setCurrentSlide((prev) =>
            prev < 1 ? latestProducts.length - 1 : prev - 1
          )
        }
      >
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper currentSlide={currentSlide}>
        {latestProducts.map((p, i) => (
          <SlideComponent i={i} key={p.id} p={p} />
        ))}
      </Wrapper>
      <Arrow
        side="right"
        onClick={() =>
          setCurrentSlide((prev) =>
            prev > latestProducts.length - 2 ? 0 : prev + 1
          )
        }
      >
        <ArrowRightOutlined />
      </Arrow>
      <Link to="/products">
        <SeeAllButton>All products</SeeAllButton>
      </Link>
    </Container>
  );
}

export default Slider;
