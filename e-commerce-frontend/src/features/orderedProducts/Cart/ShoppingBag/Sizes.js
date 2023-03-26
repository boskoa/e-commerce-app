import styled from "styled-components";

const Select = styled.select`
  background-color: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

const Option = styled.option``;

function Sizes({ product, size, setSize }) {
  return (
    <Select value={size} onChange={(e) => setSize(e.target.value)}>
      <Option value="size" disabled>
        Size
      </Option>
      {product.sizes.map((s) => (
        <Option key={s} value={s}>
          {s}
        </Option>
      ))}
    </Select>
  );
}

export default Sizes;
