import { useState } from "react";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import SelectComponent from "../../../features/products/ProductList/SelectComponent";
import {
  Filter,
  FilterContainer,
  FilterText,
} from "../AdminProducts/ProductsAdmin";
import { InputContainer } from "../AdminProducts/SingleProductAdmin";
import { Input } from "../styledElements";

function Filters({ setSearch, setSort, sorts }) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <FilterContainer>
      <Filter>
        <InputContainer>
          <Input
            placeholder="Search announcements"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <TopButton
            type="checkout"
            onClick={() => setSearch(searchInput.split(" "))}
          >
            Search
          </TopButton>
        </InputContainer>
      </Filter>
      <Filter>
        <FilterText>Sort by</FilterText>
        <SelectComponent
          defaultValue="criterium"
          setValue={setSort}
          values={Object.keys(sorts)}
        />
      </Filter>
    </FilterContainer>
  );
}

export default Filters;
