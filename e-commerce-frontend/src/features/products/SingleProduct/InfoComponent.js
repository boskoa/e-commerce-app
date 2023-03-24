import styled from "styled-components";

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
  padding-top: 10px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 36px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const Price = styled.p`
  font-size: 30px;
  font-weight: 800;
  margin-top: 40px;
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
