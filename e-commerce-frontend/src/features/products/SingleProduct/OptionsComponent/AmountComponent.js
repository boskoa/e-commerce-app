import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Quantity = styled.p`
  border: 1px solid ${({ theme }) => theme.color};
  padding: 2px;
  text-align: center;
  width: 30px;
`;

function AmountComponent({ quantity, setQuantity }) {
  return (
    <AmountContainer>
      <Remove
        style={{ cursor: "pointer" }}
        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
      />
      <Quantity>{quantity}</Quantity>
      <Add
        style={{ cursor: "pointer" }}
        onClick={() => setQuantity((prev) => prev + 1)}
      />
    </AmountContainer>
  );
}

export default AmountComponent;
