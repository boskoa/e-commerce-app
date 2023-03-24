import styled from "styled-components";

const ImageContainer = styled.div`
  flex: 1;
  min-width: 200px;
  align-self: stretch;
`;

const Image = styled.img`
  width: 100%;
  height: ${({ height }) => height};
  object-fit: cover;
`;

function ImageComponent({ product, height }) {
  return (
    <ImageContainer>
      <Image
        height={height}
        alt="product image"
        src={`/data/uploads/products/${product.id}.webp`}
      />
    </ImageContainer>
  );
}

export default ImageComponent;
