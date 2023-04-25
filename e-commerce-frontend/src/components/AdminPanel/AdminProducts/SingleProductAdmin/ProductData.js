import styled from "styled-components";
import { Input, Textarea } from "../../styledElements";
import { TopButton } from "../../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../../features/products/productsSlice";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../features/products/productsSlice";

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 200px;
`;

const Label = styled.label`
  font-size: 12px;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 5px -1px black;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  width: 100%;
`;

function ProductData() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const admin = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleProductFetch() {
      if (!id) {
        setError("ID missing");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        setError("");
        setProduct(response.data);
      } catch {
        setError("No such product");
      }
    }

    handleProductFetch();
  }, [id]);

  useEffect(() => {
    if (product.id) {
      setTitle(product.title);
      setCategories(product.categories.map((c) => c.name).join(", "));
      setColors(product.colors.join(", "));
      setSizes(product.sizes.join(", "));
      setPrice(product.price);
      setInStock(product.inStock);
      setDescription(product.description);
    }
  }, [product]);

  function handleTitleUpdate() {
    dispatch(
      updateProduct({ id: product.id, token: admin.token, newData: { title } })
    );
  }

  function handleCategoriesUpdate() {
    dispatch(
      updateProduct({
        id: product.id,
        token: admin.token,
        newData: { categories: categories.split(", ") },
      })
    );
  }

  function handleColorsUpdate() {
    dispatch(
      updateProduct({
        id: product.id,
        token: admin.token,
        newData: { colors: colors.split(", ") },
      })
    );
  }

  function handleSizesUpdate() {
    dispatch(
      updateProduct({
        id: product.id,
        token: admin.token,
        newData: { sizes: sizes.split(", ") },
      })
    );
  }

  function handlePriceUpdate() {
    dispatch(
      updateProduct({
        id: product.id,
        token: admin.token,
        newData: { price: Number(price) },
      })
    );
  }

  function handleInStockUpdate() {
    dispatch(
      updateProduct({
        id: product.id,
        token: admin.token,
        newData: { inStock: inStock === "true" ? true : false },
      })
    );
  }

  function handleDescriptionUpdate() {
    dispatch(
      updateProduct({
        id: product.id,
        token: admin.token,
        newData: { description },
      })
    );
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <Image
        alt="product image"
        src={`/data/uploads/products/${product.id}.webp`}
      />
      <ProductInfo>
        <InputContainer>
          <Label htmlFor="title">Product name</Label>
          <Input
            type="text"
            id="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleTitleUpdate}>
            Update
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="categories">Categories</Label>
          <Input
            type="text"
            id="categories"
            placeholder="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleCategoriesUpdate}>
            Update
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="colors">Colors</Label>
          <Input
            type="text"
            id="colors"
            placeholder="colors"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleColorsUpdate}>
            Update
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="sizes">Sizes</Label>
          <Input
            type="text"
            id="sizes"
            placeholder="sizes"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleSizesUpdate}>
            Update
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="price">Price</Label>
          <Input
            type="text"
            id="price"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TopButton type="checkout" onClick={handlePriceUpdate}>
            Update
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="inStock">In stock</Label>
          <Input
            type="text"
            id="inStock"
            placeholder="inStock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleInStockUpdate}>
            Update
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="description">Description</Label>
          <Textarea
            type="text"
            id="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleDescriptionUpdate}>
            Update
          </TopButton>
        </InputContainer>
      </ProductInfo>
    </Container>
  );
}

export default ProductData;
