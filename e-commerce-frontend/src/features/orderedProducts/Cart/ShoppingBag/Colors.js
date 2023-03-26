import styled from "styled-components";

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Color = styled.input`
  appearance: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 2px solid ${({ value }) => value};
  transition: 0.2s all linear;

  &:checked {
    background-color: ${({ value }) => value};
  }
`;

function Colors({ selected, product, setColor, color }) {
  return (
    <ColorContainer>
      {product.colors.map((c) => (
        <Color
          key={c}
          type="radio"
          id={c}
          name={selected}
          value={c}
          checked={c === color}
          onChange={(e) => setColor(e.target.value)}
        />
      ))}
    </ColorContainer>
  );
}

export default Colors;
