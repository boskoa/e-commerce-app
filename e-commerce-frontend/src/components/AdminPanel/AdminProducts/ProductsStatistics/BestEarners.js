import { Link } from "react-router-dom";
import { Container, DataItem } from "./Bestsellers";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";

function BestEarners({ bestEarners }) {
  const user = useSelector(selectLoggedUser);

  return (
    <Container>
      <h4>Best earners</h4>
      {bestEarners.map((b) => (
        <DataItem key={b.id}>
          <Link
            to={`/${user.id}/admin-panel/products/statistics/${b.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <p>{b.title}</p>
          </Link>
          <p>${b.total_amount}</p>
        </DataItem>
      ))}
    </Container>
  );
}

export default BestEarners;
