import styled from "styled-components";
import Products from "../../features/popular/PopularProducts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
  padding: 20px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 36px;
`;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const FilterText = styled.p`
  font-size: 18px;
`;

export const Select = styled.select`
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

export const Option = styled.option``;

function ProductList() {
  return (
    <Container>
      <Title>Cats</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <Select defaultValue="color">
            <Option value="color" disabled>
              Color
            </Option>
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
          <Select defaultValue="size">
            <Option value="size" disabled>
              Size
            </Option>
            <Option>Small</Option>
            <Option>Medium</Option>
            <Option>Large</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort by</FilterText>
          <Select>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
    </Container>
  );
}

export default ProductList;
