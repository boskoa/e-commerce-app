import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Colors from "./Colors";
import Sizes from "./Sizes";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../login/loginSlice";
import {
  deleteOrderedProduct,
  updateOrderedProduct,
} from "../../orderedProductsSlice";
import Spinner from "../../../../components/Spinner";

const Product = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  border-bottom: ${({ last }) => !last && "1px solid rgba(0, 0, 0, 0.1)"};
  padding-bottom: 20px;
  padding-right: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  gap: 20px;
`;

const Image = styled.img`
  width: 160px;
  height: auto;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 15px;
`;

const ProductName = styled.span`
  width: 120px;
  font-weight: 800;
  flex: 1;
`;

const ProductId = styled.span`
  flex: 1;
`;

const ProductSize = styled.span`
  flex: 1;
`;

const BuyDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-right: 40px;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
`;

const Button = styled.button`
  padding: 5px;
  background-color: ${({ changed, theme }) =>
    changed ? "#de2c1f" : theme.primary};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #8a0c03;
  }

  &:active {
    background-color: #eb4034;
  }
`;

function InfoComponent({ p, last, checked, setChecked }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [changed, setChanged] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(deleteOrderedProduct({ id: p.id, token: loggedUser.token }));
  }

  function handleUpdate() {
    dispatch(
      updateOrderedProduct({
        newData: { color, size, quantity },
        id: p.id,
        token: loggedUser.token,
      })
    );
    setChanged(false);
  }

  useEffect(() => {
    setColor(p.color);
    setSize(p.size);
    setQuantity(p.quantity);
  }, [p]);

  function handleChecked() {
    if (checked.includes(p.id)) {
      setChecked((prev) => prev.filter((c) => c !== p.id));
    } else {
      setChecked((prev) => [...prev, p.id]);
    }
  }

  useEffect(() => {
    if (color.length && size.length && quantity > 0) {
      if (p.color !== color || p.size !== size || p.quantity !== quantity) {
        setChanged(true);
        console.log(p.color, color);
      }
    }
  }, [color, size, quantity, p]);

  if (!p.product) {
    return <Spinner />;
  }

  return (
    <Product last={last}>
      <ProductDetails>
        <Image
          src={`/data/uploads/products/${p.product.id}.webp`}
          alt={`product image ${p.product.id}`}
        />
        <Details>
          <ProductName>
            <Link
              to={`/products/${p.product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {p.product.title}
            </Link>
          </ProductName>
          <ProductId>ID: {p.product.id}</ProductId>
          <Colors
            selected={p.id}
            product={p.product}
            color={color}
            setColor={setColor}
          />
          <ProductSize>
            Size: <Sizes product={p.product} size={size} setSize={setSize} />
          </ProductSize>
        </Details>
      </ProductDetails>
      <BuyDetails>
        <Button changed={changed} onClick={handleUpdate}>
          Update
        </Button>
        <AmountContainer>
          <Add
            style={{ cursor: "pointer" }}
            onClick={() => setQuantity((prev) => prev + 1)}
          />
          <Amount>{quantity}</Amount>
          <Remove
            style={{ cursor: "pointer" }}
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          />
        </AmountContainer>
        <Price>${p.product.price}</Price>
        <Button changed={checked.includes(p.id)} onClick={handleChecked}>
          {checked.includes(p.id) ? "Remove" : "Add"}
        </Button>
      </BuyDetails>
      <DeleteIcon
        style={{
          position: "absolute",
          right: "10px",
          bottom: "10px",
          cursor: "pointer",
          fontSize: "large",
        }}
        sx={{ transition: "all 0.3s", "&:hover": { color: "#eb4034" } }}
        onClick={handleRemove}
      />
    </Product>
  );
}

export default InfoComponent;
