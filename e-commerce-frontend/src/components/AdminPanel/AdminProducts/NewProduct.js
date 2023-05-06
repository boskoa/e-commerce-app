import {
  ProductInfo,
  InputContainer,
  Label,
} from "./SingleProductAdmin/ProductData";
import { Input, Textarea } from "../styledElements";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import {
  createProduct,
  resetSuccess,
  selectCreatedProduct,
  selectProductsError,
  selectProductsLoading,
} from "../../../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Error = styled.div`
  flex: 1
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  height: 30px;
`;

function NewProduct() {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const admin = useSelector(selectLoggedUser);
  const loading = useSelector(selectProductsLoading);
  const creationError = useSelector(selectProductsError);
  const creationSuccess = useSelector(selectCreatedProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (creationError) {
        setError("Product creation failed");
        const index = setTimeout(() => setError(""), 5000);
        return () => clearTimeout(index);
      }
      if (creationSuccess) {
        dispatch(resetSuccess());
        navigate(`/${admin.id}/admin-panel/products/all`);
      }
    }
  }, [loading, creationError, creationSuccess, navigate, dispatch, admin]);

  function handleProductCreate() {
    if (title && price) {
      let newData = { title, price };
      if (categories.length) {
        newData.categories = categories.split(", ");
      }
      if (colors.length) {
        newData.colors = colors.split(", ");
      }
      if (sizes.length) {
        newData.sizes = sizes.split(", ");
      }
      if (inStock) {
        newData.inStock = inStock === "true" ? true : false;
      }
      if (description) {
        newData.description = description;
      }
      dispatch(
        createProduct({
          token: admin.token,
          newData,
        })
      );
    }
  }

  return (
    <Container>
      <TopContainer>
        <TopButton type="checkout" onClick={handleProductCreate}>
          Create
        </TopButton>
        <Error>{error}</Error>
      </TopContainer>
      <ProductInfo>
        <InputContainer>
          <Label htmlFor="title">Product name</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="categories">Categories</Label>
          <Input
            type="text"
            id="categories"
            placeholder="e.g: hats, skirts, shirts"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="colors">Colors</Label>
          <Input
            type="text"
            id="colors"
            placeholder="e.g: red, blue, white"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="sizes">Sizes</Label>
          <Input
            type="text"
            id="sizes"
            placeholder="e.g: S, M, L, XL"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="price">Price</Label>
          <Input
            type="text"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="inStock">In stock</Label>
          <Input
            type="text"
            id="inStock"
            placeholder="true or false"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="description">Description</Label>
          <Textarea
            type="text"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
      </ProductInfo>
    </Container>
  );
}

export default NewProduct;
