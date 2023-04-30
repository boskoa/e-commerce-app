import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIntersectionObserver from "../../../../customHooks/useIntersectionObserver";
import styled from "styled-components";
import SelectComponent from "../../../../features/products/ProductList/SelectComponent";
import Spinner from "../../../Spinner";
import {
  emptyUsers,
  getAllUsers,
  selectAllUsers,
  selectUsersLoading,
} from "../../../../features/users/usersSlice";
import {
  Filter,
  FilterContainer,
  FilterText,
  SpinnerContainer,
  Container,
} from "../../AdminProducts/ProductsAdmin";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import SingleUserComponent from "./SingleUserComponent";

const UserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: all 0.3s;
`;

function UsersAdmin() {
  const admin = useSelector(selectLoggedUser);
  const [offset, setOffset] = useState(0);
  const [stopLoading, setStopLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectUsersLoading);
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const limit = 20;
  const sorts = useMemo(
    () => ({
      newest: ["createdAt,DESC"],
      oldest: ["createdAt,ASC"],
    }),
    []
  );
  const [sort, setSort] = useState("");

  useEffect(() => {
    setOffset(0);
    dispatch(emptyUsers());
  }, [sort, dispatch]);

  useEffect(() => {
    if (intersecting && !stopLoading) {
      setOffset((prev) => prev + limit);
    }
  }, [intersecting, stopLoading]);

  useEffect(() => {
    if (offset - limit > users.length) {
      setStopLoading(true);
    } else {
      setStopLoading(false);
    }
  }, [offset, users.length]);

  useEffect(() => {
    if (offset === users.length) {
      dispatch(
        getAllUsers({
          token: admin.token,
          query: `?pagination=${offset},${limit}
            ${sort ? `&order=${sorts[sort]}` : ""}`,
        })
      );
    }
  }, [offset, users.length, sort, sorts, admin, dispatch]);

  return (
    <Container>
      <FilterContainer>
        <Filter>
          <FilterText>Sort by</FilterText>
          <SelectComponent
            defaultValue="criterium"
            setValue={setSort}
            values={Object.keys(sorts)}
          />
        </Filter>
      </FilterContainer>
      <UserContainer>
        {users.map((u) => (
          <SingleUserComponent user={u} key={u.id} />
        ))}
      </UserContainer>
      <SpinnerContainer ref={endRef}>{loading && <Spinner />}</SpinnerContainer>
    </Container>
  );
}

export default UsersAdmin;
