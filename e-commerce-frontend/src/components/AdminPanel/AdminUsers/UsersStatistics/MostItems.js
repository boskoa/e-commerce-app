import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import {
  Container,
  DataItem,
  Line,
} from "../../AdminProducts/ProductsStatistics/Bestsellers";

function MostItems({ mostItems }) {
  const user = useSelector(selectLoggedUser);

  return (
    <Container>
      <h4>Items bought</h4>
      {mostItems.map((b) => (
        <DataItem key={b.id}>
          <Link
            to={`/${user.id}/admin-panel/users/single-stats/${b.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <p>{b.user.name}</p>
          </Link>
          <p>{b.count_products} pcs.</p>
        </DataItem>
      ))}
      <Line />
      <DataItem>
        <p>
          <strong>Total</strong>
        </p>
        <p>
          <strong>
            {mostItems.reduce((p, c) => p + Number(c.count_products), 0)} pcs.
          </strong>
        </p>
      </DataItem>
    </Container>
  );
}

export default MostItems;
