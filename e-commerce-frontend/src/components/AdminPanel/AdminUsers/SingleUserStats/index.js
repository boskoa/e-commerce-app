import { Input } from "../../styledElements";
import { TopButton } from "../../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  InputContainer,
} from "../../AdminProducts/SingleProductStats";

function SingleUserStats() {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setUserId(id);
    } else {
      setUserId("");
    }
  }, [id]);

  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="Enter user ID"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TopButton type="checkout" onClick={() => navigate(userId)}>
          Fetch
        </TopButton>
      </InputContainer>
      <Outlet />
    </Container>
  );
}

export default SingleUserStats;
