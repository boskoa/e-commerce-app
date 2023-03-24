import styled from "styled-components";

const Select = styled.select`
  background-color: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

const Option = styled.option``;

function SelectComponent({ defaultValue, setValue }) {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={(e) => setValue(e.target.value)}
    >
      <Option value={defaultValue} disabled>
        {defaultValue}
      </Option>
      <Option value="pants">Pants</Option>
      <Option value="sweaters">Sweaters</Option>
      <Option value="hats">Hats</Option>
    </Select>
  );
}

export default SelectComponent;
