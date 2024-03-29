import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import { Link } from "react-router-dom";
import {
  getUsersOrderedProducts,
  selectOrderedProductIds,
} from "../../../../features/orderedProducts/orderedProductsSlice";
import { useEffect } from "react";
import UserButton, { ImageContainer } from "./UserButton";
import { getUsersLikes } from "../../../../features/likedProducts/likedProductsSlice";

function LoggedInItems({ id }) {
  const cartItems = useSelector(selectOrderedProductIds).length;
  const currentUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUsersOrderedProducts({ id: currentUser.id, token: currentUser.token })
    );
    dispatch(getUsersLikes(currentUser.token));
  }, [currentUser, dispatch]);

  return (
    <>
      <ImageContainer
        style={{
          position: "absolute",
          right: "60px",
          marginTop: "5px",
          fontSize: "24px",
        }}
      >
        <Link to={`/cart/${id}`}>
          <Badge
            max={99}
            badgeContent={<p style={{ fontSize: 10 }}>{cartItems}</p>}
            color="info"
          >
            <ShoppingCartOutlined
              style={{ color: "grey", fontSize: "22px" }}
              color="action"
            />
          </Badge>
        </Link>
      </ImageContainer>
      <UserButton currentUser={currentUser} />
    </>
  );
}

export default LoggedInItems;
