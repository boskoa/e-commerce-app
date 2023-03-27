import styled from "styled-components";

const Select = styled.select`
  background-color: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

const Option = styled.option``;

function SizesComponent({ product, setSize, size }) {
  return (
    <Select value={size} onChange={(e) => setSize(e.target.value)}>
      <Option value="" disabled />
      {product.sizes.map((s) => (
        <Option key={s} value={s}>
          {s}
        </Option>
      ))}
    </Select>
  );
}

export default SizesComponent;
