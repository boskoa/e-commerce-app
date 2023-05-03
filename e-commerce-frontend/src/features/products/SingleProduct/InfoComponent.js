import styled from "styled-components";

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
  margin: 3px;
  min-width: 260px;
  height: 100%;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 30px;
`;

const Description = styled.p`
  font-size: 16px;
  max-height: 75px;
  overflow: hidden;
`;

const Price = styled.p`
  font-size: 28px;
  font-weight: 800;
  margin-top: auto;
`;

function InfoComponent({ product }) {
  return (
    <Info>
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>${product.price}</Price>
    </Info>
  );
}

export default InfoComponent;
