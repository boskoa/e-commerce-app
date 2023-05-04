import {
  Image,
  Info,
} from "../AdminProducts/ProductsAdmin/SingleProductComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { useEffect, useState } from "react";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { ButtonsContainer } from "../AdminProducts";
import styled from "styled-components";
import { Input } from "../styledElements";
import {
  deleteCategory,
  updateCategory,
} from "../../../features/categories/categoriesSlice";
import axios from "axios";
import {
  PseudoButton,
  Button,
  Form,
} from "../../../features/users/UserSettings/Avatar";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 5px;
  height: 300px;
  width: 240px;
  overflow: hidden;
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;
`;

const CategoryButtonsContainer = styled(ButtonsContainer)`
  justify-content: space-between;
  margin-top: auto;
  width: 100%;
`;

const CategoryForm = styled(Form)`
  position: absolute;
  bottom: 2px;
  padding: 3px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 190px;
  align-self: stretch;
  position: relative;
`;

const Description = styled.p`
  font-size: 14px;
  align-self: center;
  margin: 5px;
`;

function CategoryComponent({ c }) {
  const admin = useSelector(selectLoggedUser);
  const [cName, setCName] = useState("");
  const [name, setName] = useState("Choose image");
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (c) {
      setCName(c.name);
    }
  }, [c]);

  function handleUpdate() {
    dispatch(
      updateCategory({
        token: admin.token,
        newData: { cName },
        id: c.id,
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (name === "Choose image") {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    await axios.post(
      `http://localhost:3003/api/categories/category-image/${c.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${admin.token}`,
        },
      }
    );

    window.location.reload();
  }

  function handleDelete() {
    dispatch(
      deleteCategory({
        token: admin.token,
        id: c.id,
      })
    );
  }

  return (
    <Container>
      <ImageContainer>
        {!file ? (
          <Image
            alt="category image"
            src={`/public/data/defaults/categories/${c.id}.webp`}
          />
        ) : (
          <Image
            alt="chosen product image"
            src={file && URL.createObjectURL(file)}
          />
        )}
        <CategoryForm id="category-form" encType="multipart/form-data">
          <label htmlFor={`category${c.id}`} style={{ maxWidth: "70%" }}>
            <input
              style={{
                display: "none",
              }}
              id={`category${c.id}`}
              type="file"
              name={`category${c.id}`}
              onChange={(e) => {
                console.log(c);
                setName(c.id);
                setFile(e.target.files[0]);
              }}
            />
            <PseudoButton style={{ fontSize: 12 }}>{name}</PseudoButton>
          </label>
          <Button style={{ fontSize: 12 }} onClick={(e) => handleSubmit(e)}>
            Set
          </Button>
        </CategoryForm>
      </ImageContainer>
      <Info style={{ width: "100%" }}>
        <Input
          style={{ alignSelf: "center" }}
          placeholder="Enter category name"
          value={cName}
          onChange={(e) => setCName(e.target.value)}
        />
        <Description>Number od products: {c.products_count}</Description>
        <CategoryButtonsContainer>
          <TopButton type="checkout" onClick={handleDelete}>
            delete
          </TopButton>
          <TopButton onClick={handleUpdate}>update</TopButton>
        </CategoryButtonsContainer>
      </Info>
    </Container>
  );
}

export default CategoryComponent;
