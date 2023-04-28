import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectLoggedUser } from "../../../../features/login/loginSlice";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  flex: 1;
  background-color: ${({ theme }) => theme.newsletter};
  border-radius: 3px;
  box-shadow: 0 0 5px 0 black;
`;

export const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

function Bestsellers({ bestsellers }) {
  const user = useSelector(selectLoggedUser);

  return (
    <Container>
      <h4>Best sellers</h4>
      {bestsellers.map((b) => (
        <DataItem key={b.id}>
          <Link
            to={`/${user.id}/admin-panel/products/statistics/${b.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <p>{b.product.title}</p>
          </Link>
          <p>{b.count_products} pcs.</p>
        </DataItem>
      ))}
    </Container>
  );
}

export default Bestsellers;
