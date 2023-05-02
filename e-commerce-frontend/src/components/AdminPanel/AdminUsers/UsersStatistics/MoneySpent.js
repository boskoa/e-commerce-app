import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import {
  Container,
  DataItem,
  Line,
} from "../../AdminProducts/ProductsStatistics/Bestsellers";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function MoneySpent({ moneySpent }) {
  const user = useSelector(selectLoggedUser);

  return (
    <Container>
      <h4>Money spent</h4>
      {moneySpent.map((b) => (
        <DataItem key={b.id}>
          <Link
            to={`/${user.id}/admin-panel/users/single-stats/${b.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <p>{b.name}</p>
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
              moneySpent.reduce((p, c) => p + Number(c.total_amount), 0)
            )}
          </strong>
        </p>
      </DataItem>
    </Container>
  );
}

export default MoneySpent;
