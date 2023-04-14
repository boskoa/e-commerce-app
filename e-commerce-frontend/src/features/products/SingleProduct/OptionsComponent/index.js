import AmountComponent from "./AmountComponent";
import ColorsComponent from "./ColorsComponent";
import SizesComponent from "./SizesComponent";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../login/loginSlice";
import { useNavigate } from "react-router-dom";
import {
  createOrderedProduct,
  selectOrderedProductsError,
} from "../../../orderedProducts/orderedProductsSlice";

const OptionsContainer = styled.div`
  margin: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FilterText = styled.p`
  font-size: 18px;
`;

const Button = styled.button`
  padding: 5px;
  background-color: inherit;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.color};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Error = styled.div`
  background-color: inherit;
  color: red;
  height: 16px;
  width: 120px;
  text-align: center;
  transition: all 0.3s;
`;

function OptionsComponent({ product }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const loggedUser = useSelector(selectLoggedUser);
  const orderedProductError = useSelector(selectOrderedProductsError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let index;

    if (message.length > 0) {
      index = setTimeout(() => setMessage(""), 4000);
    }

    return () => clearTimeout(index);
  }, [message]);

  useEffect(() => {
    if (orderedProductError !== null) {
      setMessage("Action failed");
    }
  }, [orderedProductError]);

  function handleOrder() {
    if (!loggedUser) {
      navigate("/login");
    }

    if (color.length === 0 || size.length === 0) {
      return setMessage("Select options");
    } else {
      setMessage("");
    }

    const orderedProduct = {
      userId: loggedUser.id,
      productId: product.id,
      quantity,
      color,
      size,
      price: product.price,
    };

    dispatch(
      createOrderedProduct({ orderedProduct, token: loggedUser.token })
    ).then((r) => r.payload.id && setMessage("Product added"));
    setQuantity(1);
    setColor("");
    setSize("");
  }

  return (
    <OptionsContainer>
      <Filter style={{ marginRight: "5px" }}>
        <FilterText>Color</FilterText>
        <ColorsComponent product={product} setColor={setColor} color={color} />
      </Filter>
      <Filter>
        <FilterText>Size</FilterText>
        <SizesComponent product={product} setSize={setSize} size={size} />
      </Filter>
      <AmountComponent quantity={quantity} setQuantity={setQuantity} />
      <Button onClick={handleOrder}>Add to cart</Button>
      <Error>{message}</Error>
    </OptionsContainer>
  );
}

export default OptionsComponent;
