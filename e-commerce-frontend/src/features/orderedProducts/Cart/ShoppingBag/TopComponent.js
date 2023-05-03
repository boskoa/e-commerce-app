import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createOrder, selectCreatedOrderId } from "../../../orders/ordersSlice";
import { selectLoggedUser } from "../../../login/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

export const TopButton = styled.button`
  padding: 5px;
  background-color: ${({ theme, type }) =>
    type === "checkout" ? theme.primary : theme.secondary};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: black;
  }

  &:active {
    background-color: ${({ theme, type }) =>
      type === "checkout" ? theme.primary : theme.secondary};
  }
`;

function TopComponent({ setChecked, checkedProducts }) {
  const token = useSelector(selectLoggedUser).token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId = useSelector(selectCreatedOrderId);

  useEffect(() => {
    if (orderId) {
      setChecked([]);
      navigate(`/orders/${orderId}`);
    }
  }, [orderId, navigate, setChecked]);

  function handleCheckout() {
    if (checkedProducts.length < 1) return;
    const orderedProducts = checkedProducts.map((cp) => cp.id);
    const amount = Number(
      checkedProducts.reduce((p, c) => c.price * c.quantity + p, 0).toFixed(2)
    );
    dispatch(createOrder({ token, orderedProducts, amount }));
  }

  return (
    <Top>
      <TopButton onClick={() => navigate("/products")}>
        Continue shopping
      </TopButton>
      <TopButton onClick={handleCheckout} type="checkout">
        Checkout now
      </TopButton>
    </Top>
  );
}

export default TopComponent;
