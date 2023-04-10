import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const Option = styled.button`
  color: ${({ selected, theme }) => (selected ? "#59eb68" : theme.color)};
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: inherit;
  text-shadow: ${({ selected }) => selected && "0px 0px 3px #59eb68"};
`;

function Filter({ setFilter, filter }) {
  function handleFilter(e) {
    if (e.target.value === filter) {
      setFilter(null);
    } else {
      setFilter(e.target.value);
    }
    console.log("FOO", filter, e.target.value);
  }

  return (
    <FilterContainer>
      <Option
        value={"processed"}
        selected={filter === "processed"}
        onClick={(e) => handleFilter(e)}
      >
        processed
      </Option>
      <Option value={null} selected={!filter} onClick={(e) => handleFilter(e)}>
        all
      </Option>
      <Option
        value="pending"
        selected={filter === "pending"}
        onClick={(e) => handleFilter(e)}
      >
        pending
      </Option>
    </FilterContainer>
  );
}

export default Filter;
