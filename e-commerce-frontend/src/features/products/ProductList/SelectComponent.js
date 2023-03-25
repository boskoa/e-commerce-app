import styled from "styled-components";

const Select = styled.select`
  background-color: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

const Option = styled.option``;

function SelectComponent({ defaultValue, setValue, values }) {
  return (
    <Select onChange={(e) => setValue(e.target.value)}>
      <Option value="">{defaultValue}</Option>
      {values.map((v) => (
        <Option key={v} value={v}>
          {v}
        </Option>
      ))}
    </Select>
  );
}

export default SelectComponent;
