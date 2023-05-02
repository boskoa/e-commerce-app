import { Input } from "../styledElements";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { NewContainer } from "../AdminAnnouncements/NewAnnouncement";
import { createCategory } from "../../../features/categories/categoriesSlice";

function NewCategory() {
  const [name, setName] = useState("");
  const admin = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  function handleCreate() {
    if (name) {
      dispatch(
        createCategory({
          token: admin.token,
          newData: { name },
        })
      );
      setName("");
    }
  }

  return (
    <NewContainer>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <TopButton onClick={handleCreate}>create</TopButton>
    </NewContainer>
  );
}

export default NewCategory;
