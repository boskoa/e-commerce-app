import styled from "styled-components";

const Select = styled.select`
  background-color: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

const Option = styled.option``;

function SizesComponent({ product, setSize }) {
  return (
    <Select defaultValue="size">
      <Option value="size" disabled>
        Size
      </Option>
      {product.sizes.map((s) => (
        <Option key={s} value={s} onClick={(e) => setSize(e.target.value)}>
          {s}
        </Option>
      ))}
    </Select>
  );
}

export default SizesComponent;
