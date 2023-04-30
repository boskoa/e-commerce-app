import { Link } from "react-router-dom";
import { Container, DataItem, Line } from "./Bestsellers";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function BestEarners({ bestEarners }) {
  const user = useSelector(selectLoggedUser);

  return (
    <Container>
      <h4>Best earners</h4>
      {bestEarners.map((b) => (
        <DataItem key={b.id}>
          <Link
            to={`/${user.id}/admin-panel/products/single-stats/${b.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <p>{b.title}</p>
          </Link>
          <p>{formatter.format(b.total_amount)}</p>
        </DataItem>
      ))}
      <Line />
      <DataItem>
        <p>
          <strong>Total</strong>
        </p>
        <p>
          <strong>
            {formatter.format(
              bestEarners.reduce((p, c) => p + Number(c.total_amount), 0)
            )}
          </strong>
        </p>
      </DataItem>
    </Container>
  );
}

export default BestEarners;
